// Firebase Services for OKX Platform
// This file provides service methods for authentication, Firestore, and FCM

const { auth, firestore, messaging } = require('./firebase-config');
const { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  PhoneAuthProvider,
  signInWithCredential
} = require('firebase/auth');
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
  serverTimestamp
} = require('firebase/firestore');
const {
  getToken,
  onMessage,
  deleteToken
} = require('firebase/messaging');

class FirebaseService {
  constructor() {
    this.currentUser = null;
    this.authStateListener = null;
    this.setupAuthStateListener();
  }

  // Authentication Services
  async signUp(email, password, userData) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile
      await updateProfile(user, {
        displayName: userData.displayName || '',
        photoURL: userData.photoURL || ''
      });

      // Create user document in Firestore
      await this.createUserDocument(user.uid, {
        ...userData,
        email: user.email,
        createdAt: serverTimestamp(),
        isVerified: false,
        kycStatus: 'pending',
        membershipStatus: 'free',
        referralCode: this.generateReferralCode(),
        walletBalance: {
          USDT: 0,
          IQD: 0,
          USD: 0
        }
      });

      return { success: true, user };
    } catch (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  }

  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      throw new Error(`Sign in failed: ${error.message}`);
    }
  }

  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      throw new Error(`Sign out failed: ${error.message}`);
    }
  }

  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      throw new Error(`Password reset failed: ${error.message}`);
    }
  }

  // Firestore Services
  async createUserDocument(uid, userData) {
    try {
      await setDoc(doc(firestore, 'users', uid), userData);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to create user document: ${error.message}`);
    }
  }

  async getUserDocument(uid) {
    try {
      const userDoc = await getDoc(doc(firestore, 'users', uid));
      if (userDoc.exists()) {
        return { success: true, data: userDoc.data() };
      } else {
        throw new Error('User document not found');
      }
    } catch (error) {
      throw new Error(`Failed to get user document: ${error.message}`);
    }
  }

  async updateUserDocument(uid, updates) {
    try {
      await updateDoc(doc(firestore, 'users', uid), {
        ...updates,
        updatedAt: serverTimestamp()
      });
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to update user document: ${error.message}`);
    }
  }

  // Trading Services
  async createTradeOffer(offerData) {
    try {
      const tradeRef = await addDoc(collection(firestore, 'trades'), {
        ...offerData,
        createdAt: serverTimestamp(),
        status: 'active',
        isEscrowLocked: false
      });
      return { success: true, tradeId: tradeRef.id };
    } catch (error) {
      throw new Error(`Failed to create trade offer: ${error.message}`);
    }
  }

  async getTradeOffers(filters = {}) {
    try {
      let q = collection(firestore, 'trades');
      
      if (filters.currency) {
        q = query(q, where('currency', '==', filters.currency));
      }
      if (filters.paymentMethod) {
        q = query(q, where('paymentMethod', '==', filters.paymentMethod));
      }
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      
      q = query(q, where('status', '==', 'active'), orderBy('createdAt', 'desc'));
      
      const querySnapshot = await getDocs(q);
      const offers = [];
      querySnapshot.forEach((doc) => {
        offers.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, offers };
    } catch (error) {
      throw new Error(`Failed to get trade offers: ${error.message}`);
    }
  }

  // Chat Services
  async createChat(tradeId, participants) {
    try {
      const chatRef = await addDoc(collection(firestore, 'chats'), {
        tradeId,
        participants,
        createdAt: serverTimestamp(),
        lastMessage: null,
        lastMessageTime: null
      });
      return { success: true, chatId: chatRef.id };
    } catch (error) {
      throw new Error(`Failed to create chat: ${error.message}`);
    }
  }

  async sendMessage(chatId, messageData) {
    try {
      const messageRef = await addDoc(collection(firestore, 'chats', chatId, 'messages'), {
        ...messageData,
        createdAt: serverTimestamp()
      });
      
      // Update chat's last message
      await updateDoc(doc(firestore, 'chats', chatId), {
        lastMessage: messageData.text,
        lastMessageTime: serverTimestamp()
      });
      
      return { success: true, messageId: messageRef.id };
    } catch (error) {
      throw new Error(`Failed to send message: ${error.message}`);
    }
  }

  // FCM Services
  async getFCMToken() {
    try {
      if (!messaging) {
        throw new Error('Messaging not supported');
      }
      
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_VAPID_KEY' // Replace with your VAPID key
      });
      
      return { success: true, token };
    } catch (error) {
      throw new Error(`Failed to get FCM token: ${error.message}`);
    }
  }

  async deleteFCMToken() {
    try {
      if (!messaging) {
        throw new Error('Messaging not supported');
      }
      
      await deleteToken(messaging);
      return { success: true };
    } catch (error) {
      throw new Error(`Failed to delete FCM token: ${error.message}`);
    }
  }

  // Utility Methods
  generateReferralCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  setupAuthStateListener() {
    this.authStateListener = onAuthStateChanged(auth, (user) => {
      this.currentUser = user;
      // You can add custom logic here for auth state changes
    });
  }

  cleanup() {
    if (this.authStateListener) {
      this.authStateListener();
    }
  }
}

module.exports = FirebaseService;
