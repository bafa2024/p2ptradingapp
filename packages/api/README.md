# P2P Crypto Trading Platform API

A robust, scalable backend API for the P2P Crypto Trading Platform built with Express.js and TypeScript.

## 🚀 Features

- **Express.js with TypeScript** - Modern, type-safe backend development
- **RESTful API** - Clean, consistent API design
- **WebSocket Support** - Real-time communication with Socket.io
- **Authentication & Authorization** - JWT-based security with role-based access
- **Input Validation** - Request validation using express-validator
- **Error Handling** - Comprehensive error handling and logging
- **Rate Limiting** - API protection against abuse
- **Security Headers** - Helmet.js for security
- **Database Integration** - MySQL with Sequelize ORM
- **Testing** - Jest testing framework with coverage

## 📁 Project Structure

```
src/
├── config/           # Configuration files
├── controllers/      # Route controllers
├── database/         # Database models, migrations, seeds
├── middleware/       # Custom middleware
├── models/           # Sequelize models
├── routes/           # API route definitions
│   └── v1/          # API version 1 routes
├── services/         # Business logic
├── utils/            # Utility functions
├── validators/       # Input validation schemas
├── websocket/        # WebSocket handlers
├── __tests__/        # Test files
├── index.ts          # Application entry point
└── server.ts         # Main server class
```

## 🛠️ Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start development server
npm run dev

# Start production server
npm start
```

## 🔧 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run clean` - Clean build artifacts

## 🌐 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/verify-otp` - OTP verification
- `POST /api/v1/auth/forgot-password` - Password reset request
- `POST /api/v1/auth/reset-password` - Password reset
- `POST /api/v1/auth/change-password` - Change password
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user

### Users
- `GET /api/v1/users/profile` - Get user profile
- `PUT /api/v1/users/profile` - Update user profile
- `POST /api/v1/users/kyc` - Submit KYC documents
- `GET /api/v1/users/kyc/status` - Get KYC status
- `GET /api/v1/users/referrals` - Get user referrals
- `GET /api/v1/users/activity` - Get user activity

### Wallets
- `GET /api/v1/wallets/balance` - Get wallet balance
- `GET /api/v1/wallets/transactions` - Get transaction history
- `POST /api/v1/wallets/transfer` - Internal transfer
- `POST /api/v1/wallets/generate-address` - Generate Tron address

### Trading
- `GET /api/v1/trading/advertisements` - List advertisements
- `POST /api/v1/trading/advertisements` - Create advertisement
- `GET /api/v1/trading/advertisements/:id` - Get advertisement
- `PUT /api/v1/trading/advertisements/:id` - Update advertisement
- `DELETE /api/v1/trading/advertisements/:id` - Delete advertisement
- `POST /api/v1/trading/trades` - Create trade
- `GET /api/v1/trading/trades` - List user trades
- `GET /api/v1/trading/trades/:id` - Get trade
- `PATCH /api/v1/trading/trades/:id/status` - Update trade status

### Admin
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/users/:id` - Get user details
- `PUT /api/v1/admin/users/:id` - Update user
- `GET /api/v1/admin/statistics` - Get system statistics
- `GET /api/v1/admin/kyc-submissions` - List KYC submissions
- `POST /api/v1/admin/kyc-submissions/:id/review` - Review KYC

### Support
- `POST /api/v1/support/tickets` - Create support ticket
- `GET /api/v1/support/tickets` - List user tickets
- `GET /api/v1/support/tickets/:id` - Get ticket details
- `POST /api/v1/support/tickets/:id/reply` - Reply to ticket
- `PATCH /api/v1/support/tickets/:id/close` - Close ticket
- `GET /api/v1/support/faq/categories` - Get FAQ categories
- `GET /api/v1/support/faq/categories/:category` - Get FAQ by category

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## 📊 WebSocket Events

### Trading Events
- `join_trade_room` - Join a specific trade room
- `leave_trade_room` - Leave a trade room

### Chat Events
- `join_chat` - Join a chat room
- `leave_chat` - Leave a chat room

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🔧 Configuration

Create a `.env` file in the root directory:

```env
# Server Configuration
NODE_ENV=development
API_PORT=3000
API_HOST=localhost

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=okx_platform
DB_USER=root
DB_PASSWORD=

# JWT Configuration
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=24h

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# CORS Configuration
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run build
npm start
```

### Docker
```bash
docker build -t p2p-api .
docker run -p 3000:3000 p2p-api
```

## 📚 API Documentation

- **Health Check**: `GET /health`
- **API Info**: `GET /api`
- **Swagger Docs**: `GET /api/docs` (when implemented)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation
- Review the troubleshooting guide
