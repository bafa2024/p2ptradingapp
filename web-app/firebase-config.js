// Firebase Configuration for OKX Platform Web App
// This file contains Firebase configuration for the web application

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

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

// Initialize Auth
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app);

// Initialize Messaging (if supported)
let messaging = null;
isSupported().then((supported) => {
  if (supported) {
    messaging = getMessaging(app);
  }
});

// Initialize Analytics (only in production)
let analytics = null;
if (process.env.NODE_ENV === 'production') {
  analytics = getAnalytics(app);
}

export { app, auth, firestore, messaging, analytics };
export default app;
