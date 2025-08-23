# Environment Variables Setup Guide

This guide explains how to set up environment variables for the entire P2P Crypto Trading Platform monorepo.

## 📁 Environment Configuration Structure

```
p2p-crypto-platform/
├── env.example                           # Root environment template
├── .env                                  # Root environment (git-ignored)
├── .env.development                      # Development environment (git-ignored)
├── .env.staging                          # Staging environment (git-ignored)
├── .env.production                       # Production environment (git-ignored)
├── packages/
│   ├── api/
│   │   ├── src/config/index.ts          # API configuration manager
│   │   └── ENV_SETUP.md                 # API environment guide
│   ├── mobile-app/
│   │   ├── config.js                    # Mobile app configuration
│   │   └── ENV_SETUP.md                 # Mobile app environment guide
│   ├── web-app/
│   │   └── config/env.js                # Web app configuration
│   └── admin-dashboard/
│       └── config/env.js                # Admin dashboard configuration
└── ENV_SETUP_GUIDE.md                   # This file
```

## 🚀 Quick Start

### 1. Copy Environment Template
```bash
cp env.example .env
```

### 2. Configure Basic Settings
Edit `.env` with your local development settings:

```bash
# API Configuration
API_PORT=3000
DB_NAME=p2p_platform_dev
JWT_SECRET=your-development-jwt-secret

# Database (adjust for your local setup)
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password

# Optional: External services (for full functionality)
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
```

### 3. Start Development
```bash
npm run dev
```

## 📦 Package-Specific Configuration

### API Package
- **Configuration File**: `packages/api/src/config/index.ts`
- **Environment Loading**: Loads from root `.env` files and package-specific files
- **Key Features**: Database, Redis, JWT, external services
- **Documentation**: `packages/api/ENV_SETUP.md`

### Mobile App
- **Configuration File**: `packages/mobile-app/config.js`
- **Environment Detection**: Uses Expo constants or React Native environment
- **Key Features**: API endpoints, Firebase, feature flags, security settings
- **Documentation**: `packages/mobile-app/ENV_SETUP.md`

### Web App
- **Configuration File**: `packages/web-app/config/env.js`
- **Environment Loading**: Uses React environment variables (REACT_APP_ prefix)
- **Key Features**: API endpoints, WebView integration, theming, features
- **Usage**: For WebView content in mobile app and standalone web access

### Admin Dashboard
- **Configuration File**: `packages/admin-dashboard/config/env.js`
- **Environment Loading**: Uses React environment variables (REACT_APP_ prefix)
- **Key Features**: Admin features, permissions, security, monitoring
- **Usage**: Administrative interface for platform management

## 🌍 Environment Types

### Development Environment
- **Purpose**: Local development
- **Security**: Relaxed for easier development
- **Features**: Debug mode, detailed logging, dev tools enabled
- **Services**: Local database, mock external services

### Staging Environment
- **Purpose**: Pre-production testing
- **Security**: Production-like security settings
- **Features**: All features enabled for testing
- **Services**: Staging servers, real external services

### Production Environment
- **Purpose**: Live production deployment
- **Security**: Maximum security settings
- **Features**: Optimized for performance
- **Services**: Production servers, all services enabled

## 🔧 Configuration Management

### Environment Variable Loading Order

1. **System environment variables** (highest priority)
2. **Package-specific .env files**
3. **Root .env files**
4. **Default values in configuration** (lowest priority)

### API Package Loading Order
```
1. System environment
2. packages/api/.env.local
3. packages/api/.env
4. Root .env.local
5. Root .env.development (if NODE_ENV=development)
6. Root .env
7. Default values
```

### React Apps (Web/Admin) Loading Order
```
1. System environment
2. .env.local
3. .env.development/.env.staging/.env.production
4. .env
5. Default values in config files
```

### Mobile App Loading Order
```
1. Expo constants (expo.extra.environment)
2. React Native environment variables
3. Default values in config.js
```

## 🔐 Security Best Practices

### Environment File Security
- ✅ **Never commit** `.env`, `.env.local`, `.env.production` to git
- ✅ **Do commit** `.env.example` as a template
- ✅ **Use strong secrets** in production (JWT_SECRET, API keys)
- ✅ **Rotate secrets regularly** in production
- ✅ **Use environment-specific databases** and services

### Production Security
- ✅ **Enable HTTPS** for all web applications
- ✅ **Enable 2FA** for admin dashboard
- ✅ **Use certificate pinning** in mobile app
- ✅ **Enable audit logging** for admin actions
- ✅ **Set strong CSP headers** for web applications
- ✅ **Use IP whitelisting** for admin access (if needed)

### Development Security
- ⚠️ **Use weak passwords** and secrets (for convenience)
- ⚠️ **Disable security features** that hinder development
- ⚠️ **Use mock services** to avoid hitting real APIs

## 🎛️ Feature Flags

### API Package Features
- Database connections and migrations
- External service integrations (email, SMS, blockchain)
- WebSocket real-time features
- Caching and performance optimizations
- Monitoring and logging

### Mobile App Features
```javascript
FEATURES: {
  BIOMETRIC_AUTH: true,
  PUSH_NOTIFICATIONS: true,
  OFFLINE_MODE: true,
  ANALYTICS: true,
  CRASH_REPORTING: true,
  DEV_MENU: false, // Development only
  DEBUG_MODE: false,
}
```

### Web App Features
```javascript
REACT_APP_FEATURES: {
  TRADING: true,
  CHAT: true,
  KYC: true,
  WALLET: true,
  ANALYTICS: true,
  PWA: true,
  OFFLINE_MODE: true,
  NOTIFICATIONS: true,
  DARK_MODE: true,
  RTL_SUPPORT: true,
}
```

### Admin Dashboard Features
```javascript
REACT_APP_FEATURES: {
  USER_MANAGEMENT: true,
  TRADE_MANAGEMENT: true,
  KYC_REVIEW: true,
  DISPUTE_RESOLUTION: true,
  FINANCIAL_REPORTS: true,
  SYSTEM_SETTINGS: true,
  AUDIT_LOGS: true,
  REAL_TIME_MONITORING: true,
  BULK_OPERATIONS: true,
  DATA_EXPORT: true,
}
```

## 🐳 Docker Configuration

### Using Environment Files with Docker
```yaml
# docker-compose.yml
version: '3.8'
services:
  api:
    build: ./packages/api
    env_file:
      - .env
      - .env.production
    environment:
      - NODE_ENV=production
      
  web-app:
    build: ./packages/web-app
    env_file:
      - .env
    environment:
      - REACT_APP_API_URL=https://api.example.com/api/v1
```

### Container Environment Variables
```bash
# Set environment variables for containers
docker run -e NODE_ENV=production -e JWT_SECRET=secret api-image
```

## 🔧 Development Setup

### Local Development Requirements
1. **Node.js** 18+ and npm 9+
2. **MySQL/MariaDB** database server
3. **Redis** server (optional, for caching)
4. **Git** for version control

### Optional External Services
- **Twilio** for SMS/phone verification
- **Gmail/SMTP** for email notifications
- **Firebase** for push notifications
- **Cloudinary** for image uploads
- **Tron API** for blockchain integration

### Step-by-Step Setup

1. **Clone and install**:
   ```bash
   git clone <repository>
   cd p2p-crypto-platform
   npm install
   ```

2. **Setup environment**:
   ```bash
   cp env.example .env
   # Edit .env with your settings
   ```

3. **Setup database**:
   ```bash
   # Create database
   mysql -u root -p
   CREATE DATABASE p2p_platform_dev;
   
   # Run migrations (when implemented)
   npm run migrate
   ```

4. **Start development servers**:
   ```bash
   npm run dev
   ```

## 🚀 Deployment

### Environment-Specific Deployments

#### Staging Deployment
```bash
# Set staging environment
export NODE_ENV=staging

# Build and deploy
npm run build
npm run deploy:staging
```

#### Production Deployment
```bash
# Set production environment
export NODE_ENV=production

# Ensure all required environment variables are set
npm run validate:env

# Build and deploy
npm run build
npm run deploy:production
```

### CI/CD Integration

#### GitHub Actions Example
```yaml
name: Deploy
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup environment
        env:
          JWT_SECRET: ${{ secrets.JWT_SECRET }}
          DB_PASSWORD: ${{ secrets.DB_PASSWORD }}
        run: |
          echo "NODE_ENV=production" >> .env
          echo "JWT_SECRET=$JWT_SECRET" >> .env
          echo "DB_PASSWORD=$DB_PASSWORD" >> .env
          
      - name: Build and deploy
        run: |
          npm install
          npm run build
          npm run deploy
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading
- **Check loading order** and ensure variables are in the right file
- **Verify file names** (.env, not .env.txt)
- **Check file permissions** and location
- **Restart development server** after changes

#### 2. API Connection Issues
- **Check API_URL** configuration in client applications
- **Verify CORS settings** in API configuration
- **Ensure API server** is running on correct port
- **Check network connectivity** and firewall settings

#### 3. Database Connection Failed
- **Verify database credentials** in .env file
- **Check database server** is running
- **Ensure database exists** and user has permissions
- **Test connection** manually with mysql client

#### 4. External Service Issues
- **Check API credentials** for external services
- **Verify service quotas** and limits
- **Test service connectivity** independently
- **Check service status** pages

#### 5. Build/Runtime Errors
- **Check environment variable naming** (REACT_APP_ prefix for React apps)
- **Ensure required variables** are set
- **Validate environment** with npm run validate:env
- **Check console logs** for specific error messages

### Debug Commands

```bash
# Check environment loading
npm run debug:env

# Validate configuration
npm run validate:config

# Test API connectivity
npm run test:api

# Check service health
npm run health:check
```

## 📚 Additional Resources

- [API Environment Setup](packages/api/ENV_SETUP.md)
- [Mobile App Environment Setup](packages/mobile-app/ENV_SETUP.md)
- [Docker Documentation](docs/DOCKER.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Security Best Practices](docs/SECURITY.md)

## 💡 Tips and Best Practices

1. **Use descriptive variable names** that clearly indicate their purpose
2. **Group related variables** together in configuration files
3. **Provide sensible defaults** for development
4. **Validate critical variables** at application startup
5. **Document all environment variables** with examples
6. **Use different databases** for different environments
7. **Keep sensitive data** in environment variables, not code
8. **Regularly review and update** environment configurations
9. **Monitor environment variable usage** across all packages
10. **Test configuration changes** in staging before production


