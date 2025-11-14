# IQX P2P Trading Platform - Architecture Diagram

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         IQX P2P Trading Platform                            │
│                              Monorepo Structure                              │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │  Mobile App      │  │   Web App        │  │  Admin Dashboard │          │
│  │  (React Native)  │  │   (React)        │  │  (React + Vite)  │          │
│  │                  │  │                  │  │                  │          │
│  │  - iOS/Android   │  │  - Browser       │  │  - Admin UI      │          │
│  │  - Expo          │  │  - Responsive    │  │  - Analytics     │          │
│  │  - Firebase      │  │  - PWA Ready     │  │  - User Mgmt     │          │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘          │
│           │                     │                     │                      │
│           └─────────────────────┼─────────────────────┘                      │
│                                 │                                            │
│                    ┌────────────▼────────────┐                              │
│                    │   REST API + WebSocket   │                              │
│                    │   (HTTP/HTTPS + WS)      │                              │
│                    └────────────┬────────────┘                              │
└─────────────────────────────────┼──────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼──────────────────────────────────────────┐
│                    ┌────────────▼────────────┐                             │
│                    │   API Gateway Layer      │                             │
│                    │   (Express + Socket.IO)  │                             │
│                    └────────────┬────────────┘                             │
│                                 │                                            │
├─────────────────────────────────┼──────────────────────────────────────────┤
│                         BACKEND API LAYER                                   │
│                    packages/api/src/                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    Express Server (server.ts)                         │   │
│  │  ┌───────────────────────────────────────────────────────────────┐   │   │
│  │  │  HTTP Server + Socket.IO Server                                │   │   │
│  │  │  - Port: 3000/8080                                              │   │   │
│  │  │  - CORS, Helmet, Morgan                                         │   │   │
│  │  └───────────────────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        ROUTING LAYER                                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  /api/health          → Health Check                                 │   │
│  │  /api/auth/*          → Authentication                               │   │
│  │  /api/v1/auth/*       → Auth (v1)                                     │   │
│  │  /api/v1/orders/*     → Order Management                             │   │
│  │  /api/v1/wallet/*     → Wallet Operations                             │   │
│  │  /api/v1/transactions → Transaction History                          │   │
│  │  /api/admin/*         → Admin APIs (Protected)                       │   │
│  │  /api/monitor/*       → System Monitoring                            │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      CONTROLLER LAYER                                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐   │   │
│  │  │  Auth Controller │  │ Order Controller │  │ Wallet Controller│   │   │
│  │  │  - Register      │  │  - Create Buy    │  │  - Balance       │   │   │
│  │  │  - Login         │  │  - Create Sell   │  │  - Deposit       │   │   │
│  │  │  - Logout        │  │  - Cancel        │  │  - Withdraw      │   │   │
│  │  │  - JWT Token     │  │  - Match Engine  │  │  - Transactions  │   │   │
│  │  └──────────────────┘  └──────────────────┘  └──────────────────┘   │   │
│  │                                                                       │   │
│  │  ┌──────────────────┐  ┌──────────────────┐                         │   │
│  │  │ Admin Controller │  │ Monitor Controller│                         │   │
│  │  │  - User Mgmt     │  │  - System Info    │                         │   │
│  │  │  - Order Mgmt    │  │  - Metrics        │                         │   │
│  │  │  - Stats         │  │  - Health         │                         │   │
│  │  └──────────────────┘  └──────────────────┘                         │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                      MIDDLEWARE LAYER                                 │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  - authMiddleware    → JWT Token Verification                        │   │
│  │  - isAdmin           → Admin Role Check                               │   │
│  │  - validation        → Request Validation                             │   │
│  │  - errorHandler      → Error Handling                                 │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    WEBSOCKET LAYER (Socket.IO)                        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  socket/index.ts    → Socket.IO Initialization                       │   │
│  │  socket/events.ts   → Event Handlers                                  │   │
│  │                                                                       │   │
│  │  Events:                                                              │   │
│  │  - order_created     → Broadcast to market_updates                    │   │
│  │  - order_filled      → Broadcast trade completion                     │   │
│  │  - order_cancelled   → Notify user + market                           │   │
│  │                                                                       │   │
│  │  Rooms:                                                               │   │
│  │  - market_updates    → Public market data                             │   │
│  │  - user:{userId}     → User-specific notifications                    │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                        MODEL LAYER (Sequelize)                        │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐            │   │
│  │  │  User    │  │  Wallet  │  │  Order   │  │Transaction│            │   │
│  │  │          │  │          │  │          │  │          │            │   │
│  │  │ - id     │  │ - id     │  │ - id     │  │ - id     │            │   │
│  │  │ - email  │  │ - user_id│  │ - user_id│  │ - buyer  │            │   │
│  │  │ - role   │  │ - balance│  │ - type   │  │ - seller │            │   │
│  │  │ - KYC    │  │ - locked │  │ - amount │  │ - amount │            │   │
│  │  └──────────┘  └──────────┘  │ - price  │  │ - price  │            │   │
│  │                              │ - status│  └──────────┘            │   │
│  │                              └──────────┘                            │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────┼──────────────────────────────────────────┐
│                         DATA LAYER                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    DATABASE (MySQL/PostgreSQL)                       │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  Database: okx_platform                                              │   │
│  │                                                                       │   │
│  │  Tables:                                                              │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │   │
│  │  │   users     │  │   Wallets   │  │   Orders    │                 │   │
│  │  │             │  │             │  │             │                 │   │
│  │  │ - id (UUID) │  │ - id (UUID) │  │ - id (UUID) │                 │   │
│  │  │ - email     │  │ - user_id   │  │ - user_id   │                 │   │
│  │  │ - role      │  │ - available │  │ - type      │                 │   │
│  │  │ - password  │  │ - locked    │  │ - amount    │                 │   │
│  │  │ - KYC       │  └─────────────┘  │ - price     │                 │   │
│  │  └─────────────┘                   │ - status    │                 │   │
│  │                                    └─────────────┘                 │   │
│  │                                                                       │   │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐                 │   │
│  │  │Transactions│  │   Trades    │  │  Disputes   │                 │   │
│  │  │             │  │             │  │             │                 │   │
│  │  │ - buyer_id  │  │ - order_id  │  │ - trade_id  │                 │   │
│  │  │ - seller_id │  │ - amount    │  │ - status    │                 │   │
│  │  │ - amount    │  │ - price     │  │ - reason    │                 │   │
│  │  │ - price     │  └─────────────┘  └─────────────┘                 │   │
│  │  └─────────────┘                                                   │   │
│  │                                                                       │   │
│  │  ┌─────────────┐                                                    │   │
│  │  │SupportTickets│                                                   │   │
│  │  │             │                                                    │   │
│  │  │ - user_id   │                                                    │   │
│  │  │ - subject   │                                                    │   │
│  │  │ - status    │                                                    │   │
│  │  └─────────────┘                                                    │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    MIGRATIONS & SEEDERS                              │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  Migrations:                                                          │   │
│  │  - 20250121120000-create-users.js                                     │   │
│  │  - 20250121120001-create-wallets.js                                  │   │
│  │  - 20250121120006-create-orders.js                                   │   │
│  │  - 20250122000001-add-role-to-users.js                               │   │
│  │  - ... (7 total migrations)                                          │   │
│  │                                                                       │   │
│  │  Seeders:                                                             │   │
│  │  - 20250122000000-seed-demo-users-wallets.js                         │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         INFRASTRUCTURE LAYER                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   PM2 Process    │  │   Nginx          │  │   Docker          │          │
│  │   Manager        │  │   Reverse Proxy  │  │   (Optional)      │          │
│  │                  │  │                  │  │                  │          │
│  │  - Auto-restart  │  │  - SSL/HTTPS     │  │  - Containerized │          │
│  │  - Logging       │  │  - Load Balance  │  │  - Development    │          │
│  │  - Monitoring    │  │  - Health Check  │  │  - Production     │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                    CONFIGURATION FILES                                │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                       │   │
│  │  - ecosystem.config.js    → PM2 Configuration                        │   │
│  │  - server.js              → Root Entry Point (DO App Platform)       │   │
│  │  - .env / .env.production → Environment Variables                     │   │
│  │  - package.json           → Dependencies & Scripts                    │   │
│  │                                                                       │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         EXTERNAL SERVICES                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │   Firebase       │  │   DigitalOcean   │  │   Email/SMS      │          │
│  │   (Optional)     │  │   App Platform   │  │   Services      │          │
│  │                  │  │                  │  │                  │          │
│  │  - Auth          │  │  - Hosting       │  │  - Twilio        │          │
│  │  - Analytics     │  │  - Auto-deploy   │  │  - Nodemailer    │          │
│  │  - Messaging     │  │  - Scaling       │  │  - Notifications │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Package Structure

```
IQX platform/
├── packages/
│   ├── api/                          # Backend API (Node.js + TypeScript)
│   │   ├── src/
│   │   │   ├── server.ts             # Main Express server
│   │   │   ├── routes/               # API routes
│   │   │   │   ├── v1/
│   │   │   │   │   ├── auth.ts       # Authentication routes
│   │   │   │   │   ├── order.ts      # Order management
│   │   │   │   │   ├── wallet.ts    # Wallet operations
│   │   │   │   │   └── health.ts    # Health check
│   │   │   │   ├── admin.ts          # Admin APIs
│   │   │   │   └── monitor.ts        # Monitoring APIs
│   │   │   ├── controllers/          # Business logic
│   │   │   │   ├── auth/
│   │   │   │   ├── order/
│   │   │   │   ├── wallet/
│   │   │   │   ├── admin/
│   │   │   │   └── monitor/
│   │   │   ├── models/               # Sequelize models
│   │   │   │   ├── User.ts
│   │   │   │   ├── Wallet.ts
│   │   │   │   ├── Order.ts
│   │   │   │   └── Transaction.ts
│   │   │   ├── middleware/           # Express middleware
│   │   │   │   ├── auth.ts
│   │   │   │   └── admin.ts
│   │   │   ├── socket/               # WebSocket handlers
│   │   │   │   ├── index.ts
│   │   │   │   └── events.ts
│   │   │   ├── database/
│   │   │   │   ├── migrations/       # DB migrations
│   │   │   │   ├── seeds/            # Seed data
│   │   │   │   └── connection.ts
│   │   │   └── config/               # Configuration
│   │   └── package.json
│   │
│   ├── admin/                        # Admin Dashboard (React + TypeScript)
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   ├── components/
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   └── Layout.tsx
│   │   │   └── resources/
│   │   │       ├── Users.tsx
│   │   │       ├── Orders.tsx
│   │   │       └── Analytics.tsx
│   │   └── package.json
│   │
│   ├── mobile-app/                   # Mobile App (React Native + Expo)
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   │   ├── LoginScreen.js
│   │   │   │   ├── HomeScreen.js
│   │   │   │   ├── WalletScreen.js
│   │   │   │   └── OrdersScreen.js
│   │   │   └── navigation/
│   │   └── package.json
│   │
│   └── web-app/                      # Web Application (React)
│       ├── src/
│       └── package.json
│
├── server.js                         # Root entry point (DO App Platform)
├── ecosystem.config.js               # PM2 configuration
├── package.json                      # Root package.json
├── .env.example                      # Environment template
└── .env.production                   # Production env template
```

## Data Flow

```
┌─────────────┐
│   Client    │
│  (Mobile/   │
│   Web/Admin)│
└──────┬──────┘
       │
       │ 1. HTTP Request / WebSocket Connection
       │
       ▼
┌─────────────────┐
│  Express Server │
│  (server.ts)    │
└──────┬──────────┘
       │
       │ 2. Route Matching
       │
       ▼
┌─────────────────┐
│   Middleware    │
│  - Auth Check   │
│  - Validation   │
└──────┬──────────┘
       │
       │ 3. Controller Logic
       │
       ▼
┌─────────────────┐
│   Controller    │
│  - Business     │
│    Logic        │
└──────┬──────────┘
       │
       │ 4. Model Operations
       │
       ▼
┌─────────────────┐
│  Sequelize ORM  │
└──────┬──────────┘
       │
       │ 5. SQL Queries
       │
       ▼
┌─────────────────┐
│   Database      │
│  (MySQL/Postgres)│
└─────────────────┘
       │
       │ 6. Data Response
       │
       ▼
┌─────────────────┐
│  Socket.IO      │
│  (Real-time)    │
└──────┬──────────┘
       │
       │ 7. Broadcast Events
       │
       ▼
┌─────────────┐
│   Client    │
│  (Updates)  │
└─────────────┘
```

## Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Sequelize
- **Database**: MySQL/PostgreSQL
- **WebSocket**: Socket.IO
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, CORS, bcryptjs

### Frontend
- **Mobile**: React Native + Expo
- **Web**: React
- **Admin**: React + Vite + Tailwind CSS

### Infrastructure
- **Process Manager**: PM2
- **Reverse Proxy**: Nginx
- **Deployment**: DigitalOcean App Platform
- **Containerization**: Docker (optional)

## Key Features

1. **Real-time Updates**: Socket.IO for live order book and trade updates
2. **Authentication**: JWT-based auth with role-based access control
3. **Order Matching**: Automatic order matching engine
4. **Wallet System**: USDT balance management with locked/available funds
5. **Admin Panel**: User management, order monitoring, system stats
6. **Monitoring**: System health, metrics, and performance tracking
7. **Scalability**: PM2 clustering, connection pooling, optimized queries

## API Versioning

- **v1**: `/api/v1/*` - Main API endpoints
- **Legacy**: `/api/auth/*` - Backward compatibility
- **Admin**: `/api/admin/*` - Administrative endpoints
- **Monitor**: `/api/monitor/*` - System monitoring

## Security Layers

1. **Helmet**: Security headers
2. **CORS**: Cross-origin resource sharing control
3. **JWT**: Token-based authentication
4. **Role-based**: Admin/user access control
5. **Input Validation**: Request validation middleware
6. **SQL Injection**: Sequelize ORM protection
7. **Rate Limiting**: (Can be added via express-rate-limit)

