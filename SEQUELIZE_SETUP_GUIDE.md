# Sequelize ORM Setup Guide for OKX Platform

This guide will walk you through setting up Sequelize ORM alongside Firebase for your OKX P2P cryptocurrency trading platform.

## Overview

The OKX platform now uses both Firebase and Sequelize ORM:
- **Firebase**: Real-time features, authentication, and document storage
- **Sequelize**: Traditional SQL database for complex queries, relationships, and transactions

## Prerequisites

- Node.js 18+ installed
- MySQL 8.0+ server running
- XAMPP or similar local development environment
- Firebase project configured

## Step 1: Database Setup

### 1.1 Create MySQL Database

1. **Start MySQL Server**:
   ```bash
   # If using XAMPP, start MySQL from XAMPP Control Panel
   # Or start MySQL service directly
   ```

2. **Create Database**:
   ```sql
   CREATE DATABASE okx_platform_dev CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE DATABASE okx_platform_test CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

3. **Create User** (optional):
   ```sql
   CREATE USER 'okx_user'@'localhost' IDENTIFIED BY 'your_password';
   GRANT ALL PRIVILEGES ON okx_platform_dev.* TO 'okx_user'@'localhost';
   GRANT ALL PRIVILEGES ON okx_platform_test.* TO 'okx_user'@'localhost';
   FLUSH PRIVILEGES;
   ```

### 1.2 Environment Configuration

1. **Copy Environment File**:
   ```bash
   cp .env.example .env
   ```

2. **Update Database Settings**:
   ```env
   # Sequelize Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USERNAME=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=okx_platform_dev
   ```

## Step 2: Install Dependencies

The required packages are already installed:
- `sequelize`: ORM library
- `mysql2`: MySQL driver
- `sequelize-cli`: Command-line tools
- `dotenv`: Environment variable management

## Step 3: Test Setup

### 3.1 Test Database Connection

```bash
# Test Sequelize setup
node test-sequelize.js
```

This will:
- Test database connection
- Verify model definitions
- Check model associations
- Test database sync

### 3.2 Expected Output

```
🧪 Testing Sequelize Setup...
=====================================
1. Testing database connection...
✅ Database connection successful

2. Testing model associations...
✅ Model associations initialized

3. Testing model definitions...
   - Testing User model...
     ✅ User model has 35 attributes
   - Testing Wallet model...
     ✅ Wallet model has 25 attributes
   - Testing Trade model...
     ✅ Trade model has 35 attributes

4. Testing model methods...
   - Testing User methods...
     ✅ User model has 8 instance methods
   - Testing Wallet methods...
     ✅ Wallet model has 7 instance methods
   - Testing Trade methods...
     ✅ Trade model has 10 instance methods

5. Testing database sync...
✅ Database sync successful

=====================================
🎉 All Sequelize tests passed successfully!
```

## Step 4: Run Migrations

### 4.1 Run All Migrations

```bash
# Run migrations to create tables
node database/runMigrations.js
```

### 4.2 Individual Migrations

```bash
# Using Sequelize CLI
npx sequelize-cli db:migrate

# Or run specific migration
npx sequelize-cli db:migrate --to 003_create_trades_table.js
```

### 4.3 Verify Tables

```sql
USE okx_platform_dev;
SHOW TABLES;

-- Check table structure
DESCRIBE users;
DESCRIBE wallets;
DESCRIBE trades;
```

## Step 5: Model Usage

### 5.1 Basic Operations

```javascript
const { User, Wallet, Trade } = require('./models');

// Create user
const user = await User.create({
  firebase_uid: 'firebase_uid_here',
  email: 'user@example.com',
  display_name: 'John Doe',
  referral_code: 'ABC123'
});

// Create wallet
const wallet = await Wallet.create({
  user_id: user.id,
  daily_withdrawal_limit: 1000,
  monthly_withdrawal_limit: 10000
});

// Create trade
const trade = await Trade.create({
  user_id: user.id,
  type: 'sell',
  currency: 'USDT',
  amount: 100,
  price: 1.0,
  payment_currency: 'USD',
  payment_methods: ['bank_transfer', 'paypal']
});
```

### 5.2 Advanced Queries

```javascript
// Find active trades with user information
const activeTrades = await Trade.findAll({
  where: { status: 'active' },
  include: [{
    model: User,
    as: 'seller',
    attributes: ['display_name', 'rating', 'total_trades']
  }],
  order: [['created_at', 'DESC']]
});

// Find users with pending KYC
const pendingKYCUsers = await User.findAll({
  where: { kyc_status: 'pending' },
  include: [{
    model: Wallet,
    as: 'wallet',
    attributes: ['usdt_total', 'iqd_total']
  }]
});

// Complex aggregation
const tradeStats = await Trade.findAll({
  attributes: [
    'currency',
    'status',
    [sequelize.fn('COUNT', sequelize.col('id')), 'trade_count'],
    [sequelize.fn('SUM', sequelize.col('total_value')), 'total_volume']
  ],
  group: ['currency', 'status'],
  where: {
    created_at: {
      [sequelize.Op.gte]: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
    }
  }
});
```

### 5.3 Transactions

```javascript
const { sequelize } = require('./database/connection');

// Execute trade with wallet updates
await sequelize.transaction(async (t) => {
  // Lock funds in seller's wallet
  const sellerWallet = await Wallet.findByPk(sellerWalletId, { transaction: t, lock: true });
  await sellerWallet.lockFunds('USDT', tradeAmount);
  
  // Create trade record
  const trade = await Trade.create(tradeData, { transaction: t });
  
  // Update trade statistics
  await seller.updateLastActive();
  await seller.incrementTradeCount();
  
  return trade;
});
```

## Step 6: Integration with Firebase

### 6.1 Hybrid Approach

```javascript
// Use Firebase for real-time features
const firebaseService = require('./firebase-services');
const { User, Wallet } = require('./models');

// Create user in both systems
async function createUser(firebaseUser, userData) {
  try {
    // Create Firebase document
    await firebaseService.createUserDocument(firebaseUser.uid, userData);
    
    // Create Sequelize record
    const user = await User.create({
      firebase_uid: firebaseUser.uid,
      email: firebaseUser.email,
      display_name: userData.displayName,
      referral_code: generateReferralCode()
    });
    
    // Create wallet
    await Wallet.create({
      user_id: user.id,
      daily_withdrawal_limit: 1000,
      monthly_withdrawal_limit: 10000
    });
    
    return { success: true, user };
  } catch (error) {
    // Rollback if needed
    throw error;
  }
}
```

### 6.2 Data Synchronization

```javascript
// Sync data between Firebase and Sequelize
async function syncUserData(firebaseUid) {
  try {
    // Get Firebase data
    const firebaseUser = await firebaseService.getUserDocument(firebaseUid);
    
    // Update Sequelize record
    const user = await User.findByFirebaseUid(firebaseUid);
    if (user) {
      await user.update({
        last_active: new Date(),
        is_verified: firebaseUser.isVerified,
        kyc_status: firebaseUser.kycStatus
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Sync failed:', error);
    throw error;
  }
}
```

## Step 7: Testing

### 7.1 Unit Tests

```javascript
// Test user creation
describe('User Model', () => {
  it('should create user with valid data', async () => {
    const userData = {
      firebase_uid: 'test_uid',
      email: 'test@example.com',
      display_name: 'Test User',
      referral_code: 'TEST123'
    };
    
    const user = await User.create(userData);
    expect(user.email).toBe(userData.email);
    expect(user.kyc_status).toBe('pending');
  });
});
```

### 7.2 Integration Tests

```javascript
// Test complete user workflow
describe('User Workflow', () => {
  it('should create user with wallet', async () => {
    const user = await User.create(userData);
    const wallet = await Wallet.create({
      user_id: user.id,
      daily_withdrawal_limit: 1000
    });
    
    expect(wallet.user_id).toBe(user.id);
    expect(wallet.usdt_total).toBe(0);
  });
});
```

## Step 8: Production Deployment

### 8.1 Environment Variables

```env
# Production database
DB_HOST=your_production_host
DB_PORT=3306
DB_USERNAME=your_production_user
DB_PASSWORD=your_production_password
DB_NAME=okx_platform_prod
NODE_ENV=production
```

### 8.2 Database Optimization

```javascript
// Production Sequelize config
production: {
  // ... other config
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Connection Refused**:
   - Check MySQL server status
   - Verify port and host settings
   - Check firewall settings

2. **Authentication Failed**:
   - Verify username/password
   - Check user privileges
   - Ensure database exists

3. **Migration Errors**:
   - Check table dependencies
   - Verify migration order
   - Check for syntax errors

4. **Model Association Errors**:
   - Verify foreign key constraints
   - Check model import order
   - Ensure associations are initialized

### Debug Mode

```javascript
// Enable detailed logging
const sequelize = new Sequelize(config[env]);
sequelize.options.logging = console.log;

// Or disable logging in production
sequelize.options.logging = false;
```

## Next Steps

After completing Sequelize setup:

1. **Create Seeders**: Add sample data for development
2. **Implement Services**: Create business logic layer
3. **Add Validation**: Implement data validation rules
4. **Performance Testing**: Test with realistic data volumes
5. **Monitoring**: Set up database monitoring and alerts

## Support Resources

- [Sequelize Documentation](https://sequelize.org/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Note**: This Sequelize setup provides a robust SQL database foundation alongside Firebase, giving you the best of both worlds for your OKX platform.
