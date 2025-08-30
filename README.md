# OKX Platform - P2P Cryptocurrency Trading Platform

A comprehensive P2P cryptocurrency trading platform built with modern technologies, featuring real-time trading, multi-currency support, and advanced security features.

## 🚀 Features

### Core Trading Features
- **P2P Trading**: Direct peer-to-peer cryptocurrency trading
- **Multi-Currency Support**: USDT, BTC, ETH, IQD, USD
- **Escrow System**: Secure escrow for trade protection
- **Payment Methods**: Bank transfer, cash deposit, mobile money, PayPal
- **Real-time Chat**: Built-in communication between traders

### User Management
- **KYC Verification**: Know Your Customer verification system
- **Referral Program**: Multi-level referral system with rewards
- **Membership Tiers**: Free, Premium, and VIP membership levels
- **Rating System**: User rating and review system

### Security & Compliance
- **Firebase Authentication**: Secure user authentication
- **Two-Factor Authentication**: Enhanced security
- **Admin Dashboard**: Comprehensive admin controls
- **Dispute Resolution**: Built-in dispute handling system

## 🏗️ Architecture

### Technology Stack
- **Backend**: Node.js + Firebase + Sequelize ORM
- **Database**: Firestore (NoSQL) + MySQL (SQL)
- **Authentication**: Firebase Auth
- **Real-time**: Firebase Realtime Database
- **Mobile**: React Native
- **Web**: React.js
- **Admin**: React.js Dashboard

### Database Design
- **Hybrid Approach**: Firebase for real-time + MySQL for complex queries
- **Firestore Collections**: Users, Trades, Transactions, Chats, Support
- **MySQL Tables**: Users, Wallets, Trades with advanced relationships

## 📱 Platforms

- **Mobile App**: iOS & Android (React Native)
- **Web App**: Responsive web application
- **Admin Dashboard**: Comprehensive admin interface
- **API**: RESTful API for third-party integrations

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- Firebase CLI
- React Native CLI
- XAMPP (for local development)

### Quick Start
   ```bash
# Clone the repository
git clone https://github.com/your-username/okx-platform.git
cd okx-platform

# Install dependencies
   npm install

# Setup environment
   cp .env.example .env
   # Edit .env with your configuration

# Setup Firebase
npm run setup:firebase

# Setup Database
npm run setup:database

# Start development
   npm run dev
   ```

### Environment Variables
```env
# Firebase Configuration
FIREBASE_API_KEY=your_api_key
FIREBASE_PROJECT_ID=your_project_id

# Database Configuration
DB_HOST=localhost
DB_USERNAME=root
DB_PASSWORD=your_password
DB_NAME=okx_platform_dev

# Platform Configuration
PLATFORM_NAME=OKX Platform
PLATFORM_URL=https://your-domain.com
```

## 📁 Project Structure

```
okx-platform/
├── mobile-app/          # React Native mobile app
├── web-app/            # React web application
├── admin-dashboard/    # Admin dashboard
├── api/                # Backend API
├── firebase-functions/ # Firebase Cloud Functions
├── models/             # Sequelize models
├── database/           # Database migrations & seeds
├── docs/               # Documentation
└── scripts/            # Setup & utility scripts
```

## 🔄 Git Workflow

### Branch Strategy
- **main**: Production-ready code
- **develop**: Development integration branch
- **feature/***: Feature development branches
- **hotfix/***: Critical production fixes

### Commit Convention
```
feat: add new trading feature
fix: resolve escrow issue
docs: update API documentation
style: format code according to guidelines
refactor: restructure user authentication
test: add unit tests for wallet operations
chore: update dependencies
```

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm run start
```

### Docker
```bash
docker-compose up -d
```

## 📊 Monitoring & Analytics

- **Firebase Analytics**: User behavior tracking
- **Performance Monitoring**: App performance metrics
