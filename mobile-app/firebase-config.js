// Firebase Configuration for OKX Platform Mobile App
// This file contains Firebase configuration for React Native

import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase configuration object
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Messaging (if supported)
let messaging = null;
try {
  messaging = getMessaging(app);
} catch (error) {
  console.log('Messaging not supported:', error.message);
}

export { app, auth, firestore, messaging };
export default app;
