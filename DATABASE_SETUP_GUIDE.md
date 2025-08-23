# Database Setup Guide for OKX Platform

This guide will walk you through setting up the Firestore database for your OKX P2P cryptocurrency trading platform.

## Overview

The OKX platform uses Firebase Firestore as its primary database, with the following structure:
- **Collections**: users, wallets, trades, transactions, chats, support-tickets, referrals, system-settings
- **Security**: Comprehensive Firestore security rules with role-based access control
- **Indexes**: Optimized composite indexes for efficient querying
- **Real-time**: Live data synchronization across all platforms

## Prerequisites

- Firebase project created and configured
- Firebase CLI installed (`npm install -g firebase-tools`)
- Node.js 18+ installed
- Access to Firebase Console

## Step 1: Database Structure Setup

### 1.1 Deploy Firestore Security Rules

1. **Update Security Rules**:
   - Copy the content from `firestore.rules` to your Firebase Console
   - Go to Firestore Database → Rules
   - Replace existing rules with the new ones
   - Click "Publish"

2. **Verify Rules**:
   - Test rules in the Firebase Console Rules Playground
   - Ensure proper access control for all collections

### 1.2 Deploy Database Indexes

1. **Update Indexes**:
   - Copy the content from `firestore.indexes.json` to your Firebase Console
   - Go to Firestore Database → Indexes
   - Add all required composite indexes
   - Wait for indexes to build (may take several minutes)

2. **Required Indexes**:
   - Trades: status + createdAt, currency + status + createdAt
   - Users: kycStatus + createdAt, membershipStatus + lastActive
   - Transactions: userId + timestamp, type + status + createdAt
   - Chats: participants + lastMessageTime
   - Support tickets: status + createdAt, priority + status + createdAt

## Step 2: Initialize Database

### 2.1 Install Dependencies

```bash
# Install Firebase dependencies
npm install firebase firebase-admin

# Install additional dependencies if needed
npm install @firebase/firestore
```

### 2.2 Update Configuration

1. **Update Firebase Config**:
   - Replace placeholder values in `firebase-config.js`
   - Update API keys, project ID, and other settings
   - Ensure proper environment variables are set

2. **Environment Variables**:
   ```env
   FIREBASE_API_KEY=your_api_key
   FIREBASE_PROJECT_ID=your_project_id
   FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   FIREBASE_APP_ID=your_app_id
   ```

### 2.3 Run Database Initialization

```bash
# Run the initialization script
node init-database.js
```

This will create:
- System settings for trading, KYC, wallet limits
- Payment methods (Bank Transfer, Cash Deposit, Mobile Money)
- Supported currencies (USDT, IQD, USD)
- Trading locations (Baghdad, Basra, Erbil, Mosul)
- Trade categories and notification templates

## Step 3: Collection Structure

### 3.1 Users Collection

```typescript
{
  uid: string,                    // Firebase Auth UID
  email: string,                  // User email
  displayName: string,            // Display name
  phoneNumber: string,            // Phone number
  kycStatus: 'pending' | 'approved' | 'rejected',
  membershipStatus: 'free' | 'premium' | 'vip',
  walletId: string,               // Reference to wallet
  referralCode: string,           // Unique referral code
  totalTrades: number,            // Total trades count
  rating: number,                 // User rating (1-5)
  createdAt: timestamp,           // Account creation time
  lastActive: timestamp           // Last activity time
}
```

### 3.2 Wallets Collection

```typescript
{
  walletId: string,               // Unique wallet ID
  userId: string,                 // Reference to user
  balances: {                     // Currency balances
    USDT: { available: number, locked: number, total: number },
    IQD: { available: number, locked: number, total: number },
    USD: { available: number, locked: number, total: number }
  },
  addresses: {                    // Wallet addresses
    USDT: { trc20: string, erc20: string }
  },
  limits: {                       // Transaction limits
    dailyWithdrawal: number,
    monthlyWithdrawal: number,
    maxTradeAmount: number
  },
  isActive: boolean,              // Wallet status
  createdAt: timestamp            // Creation time
}
```

### 3.3 Trades Collection

```typescript
{
  tradeId: string,                // Unique trade ID
  userId: string,                 // Seller user ID
  counterpartyId: string,         // Buyer user ID
  type: 'buy' | 'sell',          // Trade type
  currency: 'USDT' | 'BTC' | 'ETH', // Cryptocurrency
  amount: number,                 // Trade amount
  price: number,                  // Price per unit
  paymentCurrency: 'IQD' | 'USD', // Payment currency
  paymentMethods: string[],       // Accepted payment methods
  status: 'active' | 'pending' | 'completed' | 'cancelled',
  isEscrowLocked: boolean,        // Funds locked status
  platformFee: number,            // Platform commission
  createdAt: timestamp,           // Creation time
  updatedAt: timestamp            // Last update time
}
```

### 3.4 Transactions Collection

```typescript
{
  transactionId: string,          // Unique transaction ID
  userId: string,                 // User ID
  tradeId: string,                // Reference to trade
  type: 'deposit' | 'withdrawal' | 'trade' | 'fee',
  amount: number,                 // Transaction amount
  currency: string,               // Transaction currency
  fee: number,                    // Transaction fee
  status: 'pending' | 'processing' | 'completed' | 'failed',
  blockchain: {                   // Blockchain details
    network: string,
    txHash: string,
    confirmations: number
  },
  createdAt: timestamp,           // Creation time
  confirmedAt: timestamp          // Confirmation time
}
```

## Step 4: Security Rules Overview

### 4.1 Access Control

- **Users**: Can only read/write their own data
- **Trades**: Readable by all authenticated users, writable by owners
- **Wallets**: Users can only access their own wallets
- **Transactions**: Users can only see their own transactions
- **Chats**: Access restricted to participants
- **Admin**: Full access to all collections

### 4.2 Data Validation

- Required fields validation
- Data type validation
- Business logic validation
- Rate limiting for operations

### 4.3 Helper Functions

```javascript
function isAuthenticated() {
  return request.auth != null;
}

function isOwner(userId) {
  return request.auth.uid == userId;
}

function isAdmin() {
  return request.auth != null && request.auth.token.admin == true;
}

function isValidUserData(data) {
  return data.keys().hasAll(['email', 'displayName', 'createdAt']) &&
         data.email is string &&
         data.displayName is string;
}
```

## Step 5: Database Operations

### 5.1 Using Database Service

```javascript
const DatabaseService = require('./database-service');
const dbService = new DatabaseService();

// Create user
const user = await dbService.createUser(userId, userData);

// Get user
const userData = await dbService.getUser(userId);

// Create wallet
const wallet = await dbService.createWallet(userId);

// Update wallet balance
await dbService.updateWalletBalance(walletId, 'USDT', 100, 'add');

// Create trade
const trade = await dbService.createTrade(tradeData);

// Get active trades
const trades = await dbService.getActiveTrades({ currency: 'USDT' });
```

### 5.2 Real-time Listeners

```javascript
// Subscribe to user changes
const unsubscribe = dbService.subscribeToUser(userId, (data) => {
  if (data.success) {
    console.log('User updated:', data.data);
  }
});

// Subscribe to user trades
const unsubscribeTrades = dbService.subscribeToUserTrades(userId, (data) => {
  if (data.success) {
    console.log('Trades updated:', data.trades);
  }
});

// Clean up listeners
unsubscribe();
unsubscribeTrades();
```

### 5.3 Batch Operations

```javascript
// Create batch
const { batch } = await dbService.createBatch();

// Add operations to batch
batch.set(doc(db, 'users', userId), userData);
batch.set(doc(db, 'wallets', walletId), walletData);

// Commit batch
await dbService.commitBatch(batch);
```

## Step 6: Testing Database Setup

### 6.1 Test Security Rules

1. **Create Test User**:
   - Use Firebase Console to create a test user
   - Verify user document is created in Firestore
   - Test read/write permissions

2. **Test Trade Creation**:
   - Create a test trade offer
   - Verify it appears in the trades collection
   - Test trade updates and status changes

3. **Test Wallet Operations**:
   - Create user wallet
   - Test balance updates
   - Verify transaction limits

### 6.2 Test Indexes

1. **Query Performance**:
   - Test filtered queries (currency, status, location)
   - Verify indexes are being used
   - Check query execution time

2. **Real-time Updates**:
   - Test live data synchronization
   - Verify listeners are working
   - Test offline/online behavior

## Step 7: Production Considerations

### 7.1 Performance Optimization

- **Index Management**: Monitor index usage and remove unused indexes
- **Query Optimization**: Use compound queries efficiently
- **Data Pagination**: Implement proper pagination for large datasets
- **Caching**: Use client-side caching for frequently accessed data

### 7.2 Security Hardening

- **App Check**: Enable Firebase App Check for production
- **Rate Limiting**: Implement proper rate limiting
- **Audit Logging**: Log all database operations
- **Regular Reviews**: Review security rules regularly

### 7.3 Monitoring & Maintenance

- **Usage Monitoring**: Monitor Firestore usage and costs
- **Error Tracking**: Set up error reporting and monitoring
- **Backup Strategy**: Implement data backup procedures
- **Performance Metrics**: Track query performance and optimization

## Troubleshooting

### Common Issues

1. **Permission Denied Errors**:
   - Check security rules syntax
   - Verify user authentication status
   - Check user permissions and roles

2. **Index Build Failures**:
   - Verify index configuration
   - Check for conflicting indexes
   - Wait for indexes to complete building

3. **Query Performance Issues**:
   - Verify indexes are being used
   - Check query structure
   - Optimize complex queries

4. **Real-time Listener Issues**:
   - Check network connectivity
   - Verify listener cleanup
   - Check for memory leaks

### Support Resources

- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)
- [Firestore Indexes](https://firebase.google.com/docs/firestore/query-data/indexing)
- [Firebase Community](https://firebase.google.com/community)

## Next Steps

After completing database setup:

1. **Integrate with Application**: Connect database service to your app
2. **Implement Business Logic**: Add trade processing, KYC workflows
3. **Add Real-time Features**: Implement live updates and notifications
4. **Performance Testing**: Test with realistic data volumes
5. **Security Testing**: Penetration testing and security audits
6. **Production Deployment**: Deploy to production environment

---

**Note**: This database setup provides a solid foundation for your OKX platform. Make sure to customize the schema and rules according to your specific business requirements and security needs.
