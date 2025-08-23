// Database Service for OKX Platform
// This service handles all Firestore operations for the platform

const { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  collection, 
  addDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs, 
  onSnapshot, 
  serverTimestamp,
  runTransaction,
  writeBatch,
  arrayUnion,
  arrayRemove,
  increment
} = require('firebase/firestore');

const { firestore } = require('./firebase-config');

class DatabaseService {
  constructor() {
    this.db = firestore;
  }

  // ==================== USERS COLLECTION ====================
  
  async createUser(userId, userData) {
    try {
      const userRef = doc(this.db, 'users', userId);
      await setDoc(userRef, {
        uid: userId,
        ...userData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastActive: serverTimestamp(),
        lastLogin: serverTimestamp(),
        isActive: true,
        isBanned: false,
        kycStatus: 'pending',
        membershipStatus: 'free',
        totalTrades: 0,
        successfulTrades: 0,
        failedTrades: 0,
        totalVolume: 0,
        rating: 0,
        reviewCount: 0
      });
      
      return { success: true, userId };
    } catch (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }

  async getUser(userId) {
    try {
      const userRef = doc(this.db, 'users', userId);
      const userDoc = await getDoc(userRef);
      
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  async updateUser(userId, updates) {
    try {
      const userRef = doc(this.db, 'users', userId);
      await updateDoc(userRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }
  }

  async updateUserLastActive(userId) {
    try {
      const userRef = doc(this.db, 'users', userId);
      await updateDoc(userRef, {
        lastActive: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update user last active: ${error.message}`);
    }
  }

  async getUsersByKYCStatus(kycStatus, limit = 50) {
    try {
      const usersRef = collection(this.db, 'users');
      const q = query(
        usersRef,
        where('kycStatus', '==', kycStatus),
        orderBy('createdAt', 'asc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, users };
    } catch (error) {
      throw new Error(`Failed to get users by KYC status: ${error.message}`);
    }
  }

  // ==================== WALLETS COLLECTION ====================
  
  async createWallet(userId) {
    try {
      const walletRef = collection(this.db, 'wallets');
      const walletDoc = await addDoc(walletRef, {
        userId,
        balances: {
          USDT: { available: 0, locked: 0, total: 0 },
          IQD: { available: 0, locked: 0, total: 0 },
          USD: { available: 0, locked: 0, total: 0 }
        },
        addresses: {
          USDT: { trc20: '', erc20: '' }
        },
        limits: {
          dailyWithdrawal: 1000,
          monthlyWithdrawal: 10000,
          maxTradeAmount: 5000
        },
        isActive: true,
        isSuspended: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastTransactionAt: null
      });
      
      // Update user with wallet reference
      await this.updateUser(userId, { walletId: walletDoc.id });
      
      return { success: true, walletId: walletDoc.id };
    } catch (error) {
      throw new Error(`Failed to create wallet: ${error.message}`);
    }
  }

  async getWallet(walletId) {
    try {
      const walletRef = doc(this.db, 'wallets', walletId);
      const walletDoc = await getDoc(walletRef);
      
      if (walletDoc.exists()) {
        return { success: true, data: walletDoc.data() };
      } else {
        throw new Error('Wallet not found');
      }
    } catch (error) {
      throw new Error(`Failed to get wallet: ${error.message}`);
    }
  }

  async updateWalletBalance(walletId, currency, amount, operation = 'add') {
    try {
      const walletRef = doc(this.db, 'wallets', walletId);
      
      if (operation === 'add') {
        await updateDoc(walletRef, {
          [`balances.${currency}.available`]: increment(amount),
          [`balances.${currency}.total`]: increment(amount),
          updatedAt: serverTimestamp(),
          lastTransactionAt: serverTimestamp()
        });
      } else if (operation === 'subtract') {
        await updateDoc(walletRef, {
          [`balances.${currency}.available`]: increment(-amount),
          [`balances.${currency}.total`]: increment(-amount),
          updatedAt: serverTimestamp(),
          lastTransactionAt: serverTimestamp()
        });
      }
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update wallet balance: ${error.message}`);
    }
  }

  async lockFunds(walletId, currency, amount) {
    try {
      const walletRef = doc(this.db, 'wallets', walletId);
      
      await updateDoc(walletRef, {
        [`balances.${currency}.available`]: increment(-amount),
        [`balances.${currency}.locked`]: increment(amount),
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to lock funds: ${error.message}`);
    }
  }

  async releaseFunds(walletId, currency, amount) {
    try {
      const walletRef = doc(this.db, 'wallets', walletId);
      
      await updateDoc(walletRef, {
        [`balances.${currency}.locked`]: increment(-amount),
        [`balances.${currency}.available`]: increment(amount),
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to release funds: ${error.message}`);
    }
  }

  // ==================== TRADES COLLECTION ====================
  
  async createTrade(tradeData) {
    try {
      const tradesRef = collection(this.db, 'trades');
      const tradeDoc = await addDoc(tradesRef, {
        ...tradeData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        status: 'active',
        isEscrowLocked: false,
        startedAt: null,
        paymentConfirmedAt: null,
        completedAt: null,
        cancelledAt: null,
        escrowId: null,
        escrowAmount: 0,
        escrowLockedAt: null,
        escrowReleasedAt: null,
        disputeId: null,
        disputeReason: null,
        adminNotes: null,
        platformFee: tradeData.amount * 0.01, // 1% platform fee
        networkFee: 0
      });
      
      return { success: true, tradeId: tradeDoc.id };
    } catch (error) {
      throw new Error(`Failed to create trade: ${error.message}`);
    }
  }

  async getTrade(tradeId) {
    try {
      const tradeRef = doc(this.db, 'trades', tradeId);
      const tradeDoc = await getDoc(tradeRef);
      
      if (tradeDoc.exists()) {
        return { success: true, data: tradeDoc.data() };
      } else {
        throw new Error('Trade not found');
      }
    } catch (error) {
      throw new Error(`Failed to get trade: ${error.message}`);
    }
  }

  async updateTrade(tradeId, updates) {
    try {
      const tradeRef = doc(this.db, 'trades', tradeId);
      await updateDoc(tradeRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update trade: ${error.message}`);
    }
  }

  async getActiveTrades(filters = {}) {
    try {
      let q = collection(this.db, 'trades');
      
      // Apply filters
      if (filters.currency) {
        q = query(q, where('currency', '==', filters.currency));
      }
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      if (filters.paymentMethod) {
        q = query(q, where('paymentMethods', 'array-contains', filters.paymentMethod));
      }
      if (filters.location) {
        q = query(q, where('location', '==', filters.location));
      }
      
      // Always filter by active status and order by creation time
      q = query(q, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
      
      if (filters.limit) {
        q = query(q, limit(filters.limit));
      }
      
      const querySnapshot = await getDocs(q);
      const trades = [];
      querySnapshot.forEach((doc) => {
        trades.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, trades };
    } catch (error) {
      throw new Error(`Failed to get active trades: ${error.message}`);
    }
  }

  async getUserTrades(userId, status = null, limit = 50) {
    try {
      let q = collection(this.db, 'trades');
      
      if (status) {
        q = query(
          q,
          where('userId', '==', userId),
          where('status', '==', status),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      } else {
        q = query(
          q,
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      }
      
      const querySnapshot = await getDocs(q);
      const trades = [];
      querySnapshot.forEach((doc) => {
        trades.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, trades };
    } catch (error) {
      throw new Error(`Failed to get user trades: ${error.message}`);
    }
  }

  // ==================== TRANSACTIONS COLLECTION ====================
  
  async createTransaction(transactionData) {
    try {
      const transactionsRef = collection(this.db, 'transactions');
      const transactionDoc = await addDoc(transactionsRef, {
        ...transactionData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        confirmedAt: null,
        failedAt: null,
        expiresAt: transactionData.expiresAt || null
      });
      
      return { success: true, transactionId: transactionDoc.id };
    } catch (error) {
      throw new Error(`Failed to create transaction: ${error.message}`);
    }
  }

  async getTransaction(transactionId) {
    try {
      const transactionRef = doc(this.db, 'transactions', transactionId);
      const transactionDoc = await getDoc(transactionRef);
      
      if (transactionDoc.exists()) {
        return { success: true, data: transactionDoc.data() };
      } else {
        throw new Error('Transaction not found');
      }
    } catch (error) {
      throw new Error(`Failed to get transaction: ${error.message}`);
    }
  }

  async updateTransaction(transactionId, updates) {
    try {
      const transactionRef = doc(this.db, 'transactions', transactionId);
      await updateDoc(transactionRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update transaction: ${error.message}`);
    }
  }

  async getUserTransactions(userId, type = null, limit = 50) {
    try {
      let q = collection(this.db, 'transactions');
      
      if (type) {
        q = query(
          q,
          where('userId', '==', userId),
          where('type', '==', type),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      } else {
        q = query(
          q,
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      }
      
      const querySnapshot = await getDocs(q);
      const transactions = [];
      querySnapshot.forEach((doc) => {
        transactions.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, transactions };
    } catch (error) {
      throw new Error(`Failed to get user transactions: ${error.message}`);
    }
  }

  // ==================== CHATS COLLECTION ====================
  
  async createChat(tradeId, participants) {
    try {
      const chatsRef = collection(this.db, 'chats');
      const chatDoc = await addDoc(chatsRef, {
        tradeId,
        participants,
        lastMessage: null,
        lastMessageTime: null,
        lastMessageSender: null,
        isActive: true,
        isArchived: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return { success: true, chatId: chatDoc.id };
    } catch (error) {
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }

  async sendMessage(chatId, messageData) {
    try {
      const messagesRef = collection(this.db, 'chats', chatId, 'messages');
      const messageDoc = await addDoc(messagesRef, {
        ...messageData,
        isRead: false,
        readAt: null,
        createdAt: serverTimestamp()
      });
      
      // Update chat's last message
      const chatRef = doc(this.db, 'chats', chatId);
      await updateDoc(chatRef, {
        lastMessage: messageData.text,
        lastMessageTime: serverTimestamp(),
        lastMessageSender: messageData.senderId,
        updatedAt: serverTimestamp()
      });
      
      return { success: true, messageId: messageDoc.id };
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  async getUserChats(userId, limit = 50) {
    try {
      const chatsRef = collection(this.db, 'chats');
      const q = query(
        chatsRef,
        where('participants', 'array-contains', userId),
        where('isActive', '==', true),
        orderBy('lastMessageTime', 'desc'),
        limit(limit)
      );
      
      const querySnapshot = await getDocs(q);
      const chats = [];
      querySnapshot.forEach((doc) => {
        chats.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, chats };
    } catch (error) {
      throw new Error(`Failed to get user chats: ${error.message}`);
    }
  }

  // ==================== SUPPORT TICKETS COLLECTION ====================
  
  async createSupportTicket(ticketData) {
    try {
      const ticketsRef = collection(this.db, 'support-tickets');
      const ticketDoc = await addDoc(ticketsRef, {
        ...ticketData,
        status: 'open',
        assignedTo: null,
        resolution: null,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        resolvedAt: null,
        closedAt: null
      });
      
      return { success: true, ticketId: ticketDoc.id };
    } catch (error) {
      throw new Error(`Failed to create support ticket: ${error.message}`);
    }
  }

  async getSupportTicket(ticketId) {
    try {
      const ticketRef = doc(this.db, 'support-tickets', ticketId);
      const ticketDoc = await getDoc(ticketRef);
      
      if (ticketDoc.exists()) {
        return { success: true, data: ticketDoc.data() };
      } else {
        throw new Error('Support ticket not found');
      }
    } catch (error) {
      throw new Error(`Failed to get support ticket: ${error.message}`);
    }
  }

  async updateSupportTicket(ticketId, updates) {
    try {
      const ticketRef = doc(this.db, 'support-tickets', ticketId);
      await updateDoc(ticketRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update support ticket: ${error.message}`);
    }
  }

  async getUserSupportTickets(userId, status = null, limit = 50) {
    try {
      let q = collection(this.db, 'support-tickets');
      
      if (status) {
        q = query(
          q,
          where('userId', '==', userId),
          where('status', '==', status),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      } else {
        q = query(
          q,
          where('userId', '==', userId),
          orderBy('createdAt', 'desc'),
          limit(limit)
        );
      }
      
      const querySnapshot = await getDocs(q);
      const tickets = [];
      querySnapshot.forEach((doc) => {
        tickets.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, tickets };
    } catch (error) {
      throw new Error(`Failed to get user support tickets: ${error.message}`);
    }
  }

  // ==================== REFERRALS COLLECTION ====================
  
  async createReferral(referralData) {
    try {
      const referralsRef = collection(this.db, 'referrals');
      const referralDoc = await addDoc(referralsRef, {
        ...referralData,
        status: 'pending',
        isActive: false,
        completedTrades: 0,
        activatedAt: null,
        completedAt: null,
        expiresAt: null,
        createdAt: serverTimestamp()
      });
      
      return { success: true, referralId: referralDoc.id };
    } catch (error) {
      throw new Error(`Failed to create referral: ${error.message}`);
    }
  }

  async getReferral(referralId) {
    try {
      const referralRef = doc(this.db, 'referrals', referralId);
      const referralDoc = await getDoc(referralRef);
      
      if (referralDoc.exists()) {
        return { success: true, data: referralDoc.data() };
      } else {
        throw new Error('Referral not found');
      }
    } catch (error) {
      throw new Error(`Failed to get referral: ${error.message}`);
    }
  }

  async updateReferral(referralId, updates) {
    try {
      const referralRef = doc(this.db, 'referrals', referralId);
      await updateDoc(referralRef, updates);
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update referral: ${error.message}`);
    }
  }

  // ==================== SYSTEM SETTINGS COLLECTION ====================
  
  async getSystemSetting(category, key) {
    try {
      const settingsRef = collection(this.db, 'system-settings');
      const q = query(
        settingsRef,
        where('category', '==', category),
        where('key', '==', key),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return { success: true, data: doc.data() };
      } else {
        return { success: false, data: null };
      }
    } catch (error) {
      throw new Error(`Failed to get system setting: ${error.message}`);
    }
  }

  async setSystemSetting(category, key, value, description = '') {
    try {
      const settingsRef = collection(this.db, 'system-settings');
      const q = query(
        settingsRef,
        where('category', '==', category),
        where('key', '==', key),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Update existing setting
        const doc = querySnapshot.docs[0];
        await updateDoc(doc.ref, {
          value,
          description,
          updatedAt: serverTimestamp()
        });
      } else {
        // Create new setting
        await addDoc(settingsRef, {
          category,
          key,
          value,
          dataType: typeof value,
          description,
          isEditable: true,
          requiresRestart: false,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          updatedBy: null
        });
      }
      
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to set system setting: ${error.message}`);
    }
  }

  // ==================== UTILITY FUNCTIONS ====================
  
  async runTransaction(updateFunction) {
    try {
      const result = await runTransaction(this.db, updateFunction);
      return { success: true, result };
    } catch (error) {
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }

  async createBatch() {
    try {
      const batch = writeBatch(this.db);
      return { success: true, batch };
    } catch (error) {
      throw new Error(`Failed to create batch: ${error.message}`);
    }
  }

  async commitBatch(batch) {
    try {
      await batch.commit();
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to commit batch: ${error.message}`);
    }
  }

  // ==================== REAL-TIME LISTENERS ====================
  
  subscribeToUser(userId, callback) {
    try {
      const userRef = doc(this.db, 'users', userId);
      return onSnapshot(userRef, (doc) => {
        if (doc.exists()) {
          callback({ success: true, data: doc.data() });
        } else {
          callback({ success: false, error: 'User not found' });
        }
      });
    } catch (error) {
      throw new Error(`Failed to subscribe to user: ${error.message}`);
    }
  }

  subscribeToUserTrades(userId, callback) {
    try {
      const tradesRef = collection(this.db, 'trades');
      const q = query(
        tradesRef,
        where('userId', '==', userId),
        orderBy('createdAt', 'desc')
      );
      
      return onSnapshot(q, (querySnapshot) => {
        const trades = [];
        querySnapshot.forEach((doc) => {
          trades.push({ id: doc.id, ...doc.data() });
        });
        callback({ success: true, trades });
      });
    } catch (error) {
      throw new Error(`Failed to subscribe to user trades: ${error.message}`);
    }
  }

  subscribeToActiveTrades(callback, filters = {}) {
    try {
      let q = collection(this.db, 'trades');
      
      if (filters.currency) {
        q = query(q, where('currency', '==', filters.currency));
      }
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      
      q = query(q, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
      
      return onSnapshot(q, (querySnapshot) => {
        const trades = [];
        querySnapshot.forEach((doc) => {
          trades.push({ id: doc.id, ...doc.data() });
        });
        callback({ success: true, trades });
      });
    } catch (error) {
      throw new Error(`Failed to subscribe to active trades: ${error.message}`);
    }
  }
}

module.exports = DatabaseService;
