// Firebase Cloud Functions for OKX Platform
// This file contains serverless functions for backend operations

const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Initialize Firebase Admin
admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// Function to process trade completion
exports.processTradeCompletion = functions.firestore
  .document('trades/{tradeId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    
    // Check if trade status changed to completed
    if (newData.status === 'completed' && previousData.status !== 'completed') {
      try {
        // Update user balances
        const buyerRef = db.collection('users').doc(newData.buyerId);
        const sellerRef = db.collection('users').doc(newData.sellerId);
        
        // Calculate commission
        const commission = newData.amount * 0.01; // 1% commission
        const finalAmount = newData.amount - commission;
        
        // Update balances in a transaction
        await db.runTransaction(async (transaction) => {
          const buyerDoc = await transaction.get(buyerRef);
          const sellerDoc = await transaction.get(sellerRef);
          
          if (!buyerDoc.exists || !sellerDoc.exists) {
            throw new Error('User documents not found');
          }
          
          const buyerData = buyerDoc.data();
          const sellerData = sellerDoc.data();
          
          // Update buyer balance (they receive the crypto)
          transaction.update(buyerRef, {
            walletBalance: {
              ...buyerData.walletBalance,
              [newData.currency]: (buyerData.walletBalance[newData.currency] || 0) + newData.amount
            }
          });
          
          // Update seller balance (they receive the payment minus commission)
          transaction.update(sellerRef, {
            walletBalance: {
              ...sellerData.walletBalance,
              [newData.paymentCurrency]: (sellerData.walletBalance[newData.paymentCurrency] || 0) + finalAmount
            }
          });
        });
        
        // Create transaction records
        await db.collection('transactions').add({
          tradeId: context.params.tradeId,
          type: 'trade_completion',
          buyerId: newData.buyerId,
          sellerId: newData.sellerId,
          amount: newData.amount,
          currency: newData.currency,
          commission: commission,
          timestamp: admin.firestore.FieldValue.serverTimestamp()
        });
        
        // Send notifications
        await sendTradeCompletionNotifications(newData.buyerId, newData.sellerId, newData);
        
      } catch (error) {
        console.error('Error processing trade completion:', error);
        throw error;
      }
    }
  });

// Function to handle user registration
exports.onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    // Create user profile in Firestore
    await db.collection('users').doc(user.uid).set({
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      isVerified: false,
      kycStatus: 'pending',
      membershipStatus: 'free',
      referralCode: generateReferralCode(),
      walletBalance: {
        USDT: 0,
        IQD: 0,
        USD: 0
      },
      lastActive: admin.firestore.FieldValue.serverTimestamp()
    });
    
    // Send welcome notification
    await sendWelcomeNotification(user.uid);
    
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
});

// Function to send push notifications
exports.sendNotification = functions.https.onCall(async (data, context) => {
  // Check if user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  try {
    const { userId, title, body, data: notificationData } = data;
    
    // Get user's FCM token
    const userDoc = await db.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new functions.https.HttpsError('not-found', 'User not found');
    }
    
    const userData = userDoc.data();
    if (!userData.fcmToken) {
      throw new functions.https.HttpsError('failed-precondition', 'User has no FCM token');
    }
    
    // Send notification
    const message = {
      token: userData.fcmToken,
      notification: {
        title,
        body
      },
      data: notificationData || {},
      android: {
        notification: {
          sound: 'default',
          priority: 'high'
        }
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
            badge: 1
          }
        }
      }
    };
    
    const response = await admin.messaging().send(message);
    
    // Log notification
    await db.collection('notifications').add({
      userId,
      title,
      body,
      data: notificationData,
      sentAt: admin.firestore.FieldValue.serverTimestamp(),
      messageId: response
    });
    
    return { success: true, messageId: response };
    
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send notification');
  }
});

// Function to process KYC verification
exports.processKYCVerification = functions.https.onCall(async (data, context) => {
  // Check if user is admin
  if (!context.auth || !context.auth.token.admin) {
    throw new functions.https.HttpsError('permission-denied', 'Admin access required');
  }
  
  try {
    const { userId, status, notes } = data;
    
    // Update user KYC status
    await db.collection('users').doc(userId).update({
      kycStatus: status,
      kycVerifiedAt: admin.firestore.FieldValue.serverTimestamp(),
      kycNotes: notes || ''
    });
    
    // Send notification to user
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData.fcmToken) {
      const title = status === 'approved' ? 'KYC Verification Approved' : 'KYC Verification Rejected';
      const body = status === 'approved' 
        ? 'Your identity verification has been approved. You can now access all features.'
        : 'Your identity verification was rejected. Please check the requirements and try again.';
      
      await admin.messaging().send({
        token: userData.fcmToken,
        notification: { title, body },
        data: { type: 'kyc_verification', status }
      });
    }
    
    return { success: true };
    
  } catch (error) {
    console.error('Error processing KYC verification:', error);
    throw new functions.https.HttpsError('internal', 'Failed to process KYC verification');
  }
});

// Helper functions
async function sendTradeCompletionNotifications(buyerId, sellerId, tradeData) {
  try {
    // Send notification to buyer
    const buyerDoc = await db.collection('users').doc(buyerId).get();
    if (buyerDoc.exists && buyerDoc.data().fcmToken) {
      await admin.messaging().send({
        token: buyerDoc.data().fcmToken,
        notification: {
          title: 'Trade Completed',
          body: `Your trade for ${tradeData.amount} ${tradeData.currency} has been completed successfully.`
        },
        data: { type: 'trade_completion', tradeId: tradeData.id }
      });
    }
    
    // Send notification to seller
    const sellerDoc = await db.collection('users').doc(sellerId).get();
    if (sellerDoc.exists && sellerDoc.data().fcmToken) {
      await admin.messaging().send({
        token: sellerDoc.data().fcmToken,
        notification: {
          title: 'Trade Completed',
          body: `Your trade for ${tradeData.amount} ${tradeData.currency} has been completed successfully.`
        },
        data: { type: 'trade_completion', tradeId: tradeData.id }
      });
    }
  } catch (error) {
    console.error('Error sending trade completion notifications:', error);
  }
}

async function sendWelcomeNotification(userId) {
  try {
    const userDoc = await db.collection('users').doc(userId).get();
    if (userDoc.exists && userDoc.data().fcmToken) {
      await admin.messaging().send({
        token: userDoc.data().fcmToken,
        notification: {
          title: 'Welcome to OKX Platform',
          body: 'Thank you for joining our P2P trading platform!'
        },
        data: { type: 'welcome' }
      });
    }
  } catch (error) {
    console.error('Error sending welcome notification:', error);
  }
}

function generateReferralCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
