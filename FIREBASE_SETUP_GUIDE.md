# Firebase Setup Guide for OKX Platform

This guide will walk you through setting up Firebase for your OKX P2P cryptocurrency trading platform.

## Prerequisites

- Google account
- Node.js 18+ installed
- Firebase CLI installed (`npm install -g firebase-tools`)

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Enter project name: `okx-platform` (or your preferred name)
4. Enable Google Analytics (recommended)
5. Choose Analytics account or create new one
6. Click "Create project"

## Step 2: Enable Authentication

1. In Firebase Console, go to "Authentication" → "Sign-in method"
2. Enable the following providers:
   - **Email/Password**: Enable, allow new users
   - **Phone**: Enable for SMS verification
   - **Google**: Optional, for social login
3. Configure authorized domains:
   - Add your web app domain
   - Add `localhost` for development

## Step 3: Set Up Firestore Database

1. Go to "Firestore Database" → "Create database"
2. Choose "Start in test mode" (we'll add security rules later)
3. Select location closest to your users
4. Click "Done"

### Firestore Collections Structure

The following collections will be automatically created:

```
users/
├── {userId}/
│   ├── email
│   ├── displayName
│   ├── kycStatus
│   ├── membershipStatus
│   ├── walletBalance
│   ├── referralCode
│   └── fcmToken

trades/
├── {tradeId}/
│   ├── userId
│   ├── type (buy/sell)
│   ├── currency
│   ├── amount
│   ├── price
│   ├── paymentMethod
│   ├── status
│   └── isEscrowLocked

chats/
├── {chatId}/
│   ├── tradeId
│   ├── participants
│   ├── lastMessage
│   └── messages/
│       └── {messageId}/
│           ├── text
│           ├── senderId
│           └── timestamp

transactions/
├── {transactionId}/
│   ├── tradeId
│   ├── type
│   ├── amount
│   ├── currency
│   ├── commission
│   └── timestamp

support-tickets/
├── {ticketId}/
│   ├── userId
│   ├── subject
│   ├── message
│   ├── status
│   └── createdAt
```

## Step 4: Enable Cloud Messaging (FCM)

1. Go to "Project settings" → "Cloud Messaging"
2. Copy the **Server key** (you'll need this for backend)
3. Generate **Web Push certificates**:
   - Click "Generate key pair"
   - Copy the **VAPID key** (you'll need this for web apps)

## Step 5: Set Up Cloud Functions

1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize functions in your project:
   ```bash
   cd firebase-functions
   firebase init functions
   ```
4. Choose TypeScript
5. Install dependencies: `npm install`
6. Deploy functions: `firebase deploy --only functions`

## Step 6: Configure Security Rules

1. Go to "Firestore Database" → "Rules"
2. Replace the default rules with the content from `firestore.rules`
3. Click "Publish"

## Step 7: Update Configuration Files

Replace the placeholder values in all Firebase config files:

### Root Configuration
- `firebase-config.js`
- `firebase-services.js`

### Mobile App
- `mobile-app/firebase-config.js`

### Web App
- `web-app/firebase-config.js`

### Admin Dashboard
- `admin-dashboard/firebase-config.js`

### Firebase Functions
- `firebase-functions/index.js` (replace VAPID key)

## Step 8: Install Dependencies

### Mobile App (React Native)
```bash
cd mobile-app
npm install firebase @react-native-async-storage/async-storage
```

### Web App
```bash
cd web-app
npm install firebase
```

### Admin Dashboard
```bash
cd admin-dashboard
npm install firebase
```

### Backend API
```bash
cd api
npm install firebase-admin
```

## Step 9: Environment Variables

Create `.env` files in each project directory:

### Mobile App
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_MESSAGING_SENDER_ID=your_sender_id
FIREBASE_APP_ID=your_app_id
```

### Web App
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### Admin Dashboard
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Step 10: Test Setup

### Test Authentication
1. Try creating a test user
2. Verify user document is created in Firestore
3. Test login/logout functionality

### Test Firestore
1. Create a test trade offer
2. Verify it appears in the trades collection
3. Test real-time updates

### Test FCM
1. Get FCM token from mobile app
2. Send test notification using Firebase Console
3. Verify notification is received

## Step 11: Production Deployment

### Update Security Rules
1. Review and update Firestore security rules
2. Test rules thoroughly before production

### Configure Domains
1. Add production domains to authorized domains
2. Update CORS settings if needed

### Monitor Usage
1. Set up billing alerts
2. Monitor Firestore usage and costs
3. Set up error reporting

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check API key configuration
   - Verify authorized domains
   - Check browser console for errors

2. **Firestore permission denied**
   - Verify security rules
   - Check user authentication status
   - Test rules in Firebase Console

3. **FCM not working**
   - Verify VAPID key
   - Check service worker registration
   - Test with Firebase Console

4. **Functions deployment failed**
   - Check Node.js version (must be 18+)
   - Verify billing is enabled
   - Check function logs

### Support Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)

## Security Best Practices

1. **Never expose API keys in client-side code**
2. **Use environment variables for sensitive data**
3. **Implement proper Firestore security rules**
4. **Enable Firebase App Check for production**
5. **Regularly review and update security rules**
6. **Monitor authentication attempts and suspicious activity**

## Next Steps

After completing Firebase setup:

1. Integrate Firebase services into your application code
2. Implement user authentication flows
3. Set up real-time data synchronization
4. Configure push notifications
5. Test all functionality thoroughly
6. Deploy to production environment

---

**Note**: This setup provides a solid foundation for your OKX platform. Make sure to customize the security rules and functions according to your specific business requirements and security needs.
