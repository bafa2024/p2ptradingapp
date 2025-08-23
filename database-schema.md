# OKX Platform Database Schema

This document defines the Firestore database schema for the OKX P2P cryptocurrency trading platform.

## Overview

The database uses Firestore collections with the following structure:
- **users**: User profiles and authentication data
- **wallets**: User wallet balances and transaction history
- **trades**: P2P trading offers and transactions
- **transactions**: All financial transactions and audit trail
- **chats**: In-app messaging between traders
- **support-tickets**: User support and admin communication
- **referrals**: Referral system tracking
- **system-settings**: Platform configuration and admin settings

## Collection: users

### Document Structure
```typescript
{
  uid: string,                    // Firebase Auth UID
  email: string,                  // User email address
  phoneNumber: string,            // User phone number
  displayName: string,            // User display name
  photoURL: string,               // Profile photo URL
  dateOfBirth: timestamp,         // Date of birth
  nationality: string,            // User nationality
  country: string,                // User country
  city: string,                   // User city
  address: string,                // User address
  
  // Verification & KYC
  isVerified: boolean,            // Email/phone verification status
  kycStatus: 'pending' | 'approved' | 'rejected' | 'not_required',
  kycDocuments: {
    idCard: string,               // ID card document URL
    passport: string,             // Passport document URL
    selfie: string,               // Selfie photo URL
    proofOfAddress: string        // Address proof document URL
  },
  kycVerifiedAt: timestamp,      // KYC verification timestamp
  kycNotes: string,              // Admin notes for KYC
  
  // Membership & Status
  membershipStatus: 'free' | 'premium' | 'vip',
  membershipExpiresAt: timestamp, // Membership expiration
  isActive: boolean,              // Account active status
  isBanned: boolean,             // Account ban status
  banReason: string,              // Reason for ban
  
  // Wallet & Financial
  walletId: string,              // Reference to wallet document
  referralCode: string,          // Unique referral code
  referredBy: string,            // Referrer's UID
  
  // Statistics
  totalTrades: number,           // Total completed trades
  successfulTrades: number,      // Successful trades count
  failedTrades: number,          // Failed trades count
  totalVolume: number,           // Total trading volume
  rating: number,                // User rating (1-5)
  reviewCount: number,           // Number of reviews received
  
  // Timestamps
  createdAt: timestamp,          // Account creation time
  updatedAt: timestamp,          // Last update time
  lastActive: timestamp,         // Last activity time
  lastLogin: timestamp           // Last login time
}
```

## Collection: wallets

### Document Structure
```typescript
{
  walletId: string,              // Unique wallet identifier
  userId: string,                // Reference to user document
  
  // Balances
  balances: {
    USDT: {
      available: number,          // Available balance
      locked: number,             // Locked in trades
      total: number               // Total balance
    },
    IQD: {
      available: number,
      locked: number,
      total: number
    },
    USD: {
      available: number,
      locked: number,
      total: number
    }
  },
  
  // Wallet Addresses
  addresses: {
    USDT: {
      trc20: string,             // TRC20 address
      erc20: string              // ERC20 address (optional)
    }
  },
  
  // Transaction Limits
  limits: {
    dailyWithdrawal: number,     // Daily withdrawal limit
    monthlyWithdrawal: number,   // Monthly withdrawal limit
    maxTradeAmount: number       // Maximum trade amount
  },
  
  // Status
  isActive: boolean,             // Wallet active status
  isSuspended: boolean,          // Wallet suspension status
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  lastTransactionAt: timestamp
}
```

## Collection: trades

### Document Structure
```typescript
{
  tradeId: string,               // Unique trade identifier
  userId: string,                // Seller's user ID
  counterpartyId: string,        // Buyer's user ID (when trade starts)
  
  // Trade Details
  type: 'buy' | 'sell',         // Trade type
  currency: 'USDT' | 'BTC' | 'ETH', // Cryptocurrency
  amount: number,                // Trade amount
  price: number,                 // Price per unit
  totalValue: number,            // Total trade value
  paymentCurrency: 'IQD' | 'USD', // Payment currency
  
  // Payment Methods
  paymentMethods: string[],      // Accepted payment methods
  preferredPaymentMethod: string, // Preferred payment method
  
  // Trade Status
  status: 'active' | 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'disputed',
  isEscrowLocked: boolean,       // Funds locked in escrow
  
  // Trade Flow
  createdAt: timestamp,          // Trade creation time
  startedAt: timestamp,          // Trade start time
  paymentConfirmedAt: timestamp, // Payment confirmation time
  completedAt: timestamp,        // Trade completion time
  cancelledAt: timestamp,        // Trade cancellation time
  
  // Escrow & Security
  escrowId: string,              // Escrow transaction ID
  escrowAmount: number,          // Amount locked in escrow
  escrowLockedAt: timestamp,     // Escrow lock time
  escrowReleasedAt: timestamp,   // Escrow release time
  
  // Dispute & Resolution
  disputeId: string,             // Dispute reference
  disputeReason: string,         // Reason for dispute
  adminNotes: string,            // Admin notes
  
  // Commission & Fees
  platformFee: number,           // Platform commission
  networkFee: number,            // Blockchain network fee
  
  // Metadata
  description: string,            // Trade description
  terms: string,                 // Trade terms
  tags: string[],                // Trade tags
  location: string,              // Trade location
  timeLimit: number              // Time limit in hours
}
```

## Collection: transactions

### Document Structure
```typescript
{
  transactionId: string,         // Unique transaction identifier
  userId: string,                // User ID
  tradeId: string,               // Reference to trade (if applicable)
  
  // Transaction Details
  type: 'deposit' | 'withdrawal' | 'trade' | 'transfer' | 'fee' | 'refund' | 'commission',
  category: 'crypto' | 'fiat' | 'internal' | 'external',
  
  // Amount & Currency
  amount: number,                // Transaction amount
  currency: string,              // Transaction currency
  fee: number,                   // Transaction fee
  netAmount: number,             // Amount after fees
  
  // Status & Flow
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled',
  confirmedAt: timestamp,        // Confirmation time
  failedAt: timestamp,           // Failure time
  
  // Blockchain Details (for crypto)
  blockchain: {
    network: string,             // Blockchain network
    txHash: string,              // Transaction hash
    blockNumber: number,         // Block number
    confirmations: number        // Number of confirmations
  },
  
  // Bank Details (for fiat)
  bankDetails: {
    bankName: string,            // Bank name
    accountNumber: string,       // Account number
    accountName: string,         // Account holder name
    swiftCode: string            // SWIFT/BIC code
  },
  
  // Metadata
  description: string,            // Transaction description
  reference: string,             // External reference
  notes: string,                 // Additional notes
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  expiresAt: timestamp           // Expiration time for pending transactions
}
```

## Collection: chats

### Document Structure
```typescript
{
  chatId: string,                // Unique chat identifier
  tradeId: string,               // Reference to trade
  
  // Participants
  participants: string[],         // Array of user IDs
  lastMessage: string,           // Last message text
  lastMessageTime: timestamp,    // Last message timestamp
  lastMessageSender: string,     // Last message sender ID
  
  // Chat Status
  isActive: boolean,             // Chat active status
  isArchived: boolean,           // Chat archived status
  
  // Metadata
  createdAt: timestamp,
  updatedAt: timestamp,
  
  // Subcollection: messages
  messages: {
    messageId: string,           // Message identifier
    senderId: string,            // Sender user ID
    text: string,                // Message text
    messageType: 'text' | 'image' | 'file' | 'system',
    isRead: boolean,             // Message read status
    readAt: timestamp,           // Read timestamp
    createdAt: timestamp         // Message creation time
  }
}
```

## Collection: support-tickets

### Document Structure
```typescript
{
  ticketId: string,              // Unique ticket identifier
  userId: string,                // User ID
  
  // Ticket Details
  subject: string,               // Ticket subject
  message: string,               // Initial message
  priority: 'low' | 'medium' | 'high' | 'urgent',
  category: 'technical' | 'billing' | 'trading' | 'kyc' | 'general',
  
  // Status & Resolution
  status: 'open' | 'in_progress' | 'waiting_user' | 'resolved' | 'closed',
  assignedTo: string,            // Admin user ID
  resolution: string,            // Resolution details
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  resolvedAt: timestamp,
  closedAt: timestamp,
  
  // Subcollection: responses
  responses: {
    responseId: string,          // Response identifier
    senderId: string,            // Sender user ID
    message: string,             // Response message
    isAdmin: boolean,            // Is admin response
    createdAt: timestamp         // Response creation time
  }
}
```

## Collection: referrals

### Document Structure
```typescript
{
  referralId: string,            // Unique referral identifier
  referrerId: string,            // Referrer user ID
  referredId: string,            // Referred user ID
  
  // Referral Status
  status: 'pending' | 'active' | 'completed' | 'expired',
  isActive: boolean,             // Referral active status
  
  // Rewards
  rewardAmount: number,          // Reward amount
  rewardCurrency: string,        // Reward currency
  rewardType: 'trade_fee_waiver' | 'bonus_balance' | 'membership_upgrade',
  
  // Completion Criteria
  requiredTrades: number,        // Required trades to complete
  completedTrades: number,       // Completed trades count
  minimumTradeAmount: number,    // Minimum trade amount
  
  // Timestamps
  createdAt: timestamp,
  activatedAt: timestamp,        // When referral became active
  completedAt: timestamp,        // When referral was completed
  expiresAt: timestamp           // Referral expiration time
}
```

## Collection: system-settings

### Document Structure
```typescript
{
  settingId: string,             // Setting identifier
  category: 'trading' | 'fees' | 'limits' | 'kyc' | 'notifications' | 'maintenance',
  
  // Setting Details
  key: string,                   // Setting key
  value: any,                    // Setting value
  dataType: 'string' | 'number' | 'boolean' | 'object' | 'array',
  
  // Metadata
  description: string,            // Setting description
  isEditable: boolean,           // Can be edited by admin
  requiresRestart: boolean,      // Requires app restart
  
  // Timestamps
  createdAt: timestamp,
  updatedAt: timestamp,
  updatedBy: string              // Admin user ID who updated
}
```

## Indexes

### Required Composite Indexes
1. **trades**: status + createdAt (for listing active trades)
2. **trades**: currency + status + createdAt (for filtered trade listings)
3. **trades**: paymentMethod + status + createdAt (for payment method filtering)
4. **trades**: type + status + createdAt (for buy/sell filtering)
5. **users**: kycStatus + createdAt (for KYC management)
6. **users**: membershipStatus + lastActive (for membership tracking)
7. **transactions**: userId + timestamp (for user transaction history)
8. **chats**: participants + lastMessageTime (for user chat listings)
9. **support-tickets**: status + createdAt (for ticket management)
10. **support-tickets**: userId + createdAt (for user ticket history)

## Security Rules

### Access Control
- Users can only read/write their own data
- Trades are readable by all authenticated users
- Chat access restricted to participants
- Admin access for system management
- KYC documents protected with strict access control

### Data Validation
- Required fields validation
- Data type validation
- Business logic validation
- Rate limiting for operations

## Data Migration

### Initial Setup
1. Create collections with proper structure
2. Set up security rules
3. Create required indexes
4. Seed initial system settings
5. Set up admin users

### Future Migrations
- Schema versioning
- Data transformation scripts
- Rollback procedures
- Testing in staging environment

---

**Note**: This schema is designed for Firestore and follows NoSQL best practices. All timestamps use Firestore's serverTimestamp() for consistency and security.
