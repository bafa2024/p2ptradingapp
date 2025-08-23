// Firebase Configuration for OKX Platform
// This file contains the Firebase configuration for all platforms

const firebaseConfig = {
  // Replace these values with your actual Firebase project configuration
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID" // Optional, for Analytics
};

// Initialize Firebase services
let auth, firestore, messaging, analytics;

// Check if we're in a browser environment
if (typeof window !== 'undefined') {
  // Browser environment
  const { initializeApp } = require('firebase/app');
  const { getAuth } = require('firebase/auth');
  const { getFirestore } = require('firebase/firestore');
  const { getMessaging, isSupported } = require('firebase/messaging');
  const { getAnalytics } = require('firebase/analytics');

  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  firestore = getFirestore(app);
  
  // Initialize messaging if supported
  isSupported().then((supported) => {
    if (supported) {
      messaging = getMessaging(app);
    }
  });
  
  // Initialize analytics if supported
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    analytics = getAnalytics(app);
  }
}

// Export configuration and services
module.exports = {
  firebaseConfig,
  auth,
  firestore,
  messaging,
  analytics
};
