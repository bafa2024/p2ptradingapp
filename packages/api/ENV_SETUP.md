# API Package Environment Configuration

This document describes the environment variables and configuration setup for the API package.

## Environment Variables

The API package loads environment variables from multiple sources in this order:

1. Root project `.env` files (in project root)
2. Package-specific `.env` files (in `packages/api/`)
3. System environment variables

### Required Environment Variables

#### Production Requirements
- `JWT_SECRET` - Must be a strong, unique secret key
- `DB_PASSWORD` - Database password (if required)
- `EMAIL_PASSWORD` - Email service password
- `TWILIO_AUTH_TOKEN` - Twilio authentication token

#### Development Defaults
Most variables have sensible defaults for development. You only need to set:
- Database credentials (if not using defaults)
- External service credentials (optional for basic development)

### Environment Variable Categories

#### Application Configuration
```bash
NODE_ENV=development|staging|production
APP_NAME=P2P Platform API
APP_VERSION=1.0.0
API_PORT=3000
API_HOST=localhost
```

#### Database Configuration
```bash
DB_HOST=localhost
DB_PORT=3306
DB_NAME=okx_platform
DB_USER=root
DB_PASSWORD=
DB_DIALECT=mysql
DB_POOL_MAX=10
DB_POOL_MIN=0
DB_POOL_ACQUIRE=30000
DB_POOL_IDLE=10000
```

#### Redis Configuration
```bash
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
REDIS_TTL=3600
```

#### JWT Configuration
```bash
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
JWT_ISSUER=p2p-platform
JWT_AUDIENCE=p2p-users
```

#### Security Configuration
```bash
BCRYPT_ROUNDS=12
CORS_ORIGIN=http://localhost:3000,http://localhost:3001
HELMET_ENABLED=true
COMPRESSION_ENABLED=true
```

#### Rate Limiting
```bash
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS=false
```

#### Blockchain Configuration
```bash
TRON_NETWORK=mainnet|shasta|nile
TRON_API_KEY=your-tron-api-key
TRON_API_URL=https://api.trongrid.io
USDT_CONTRACT_ADDRESS=TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t
TRON_PRIVATE_KEY=your-tron-private-key
```

#### Email Configuration
```bash
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=noreply@p2p-platform.com
EMAIL_FROM_NAME=P2P Platform
```

#### SMS Configuration
```bash
TWILIO_ACCOUNT_SID=your-twilio-account-sid
TWILIO_AUTH_TOKEN=your-twilio-auth-token
TWILIO_PHONE_NUMBER=+1234567890
TWILIO_VERIFY_SERVICE_SID=your-verify-service-sid
```

#### Firebase Configuration
```bash
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
```

#### File Upload Configuration
```bash
UPLOAD_MAX_SIZE=10485760
UPLOAD_ALLOWED_TYPES=image/jpeg,image/png,image/gif,application/pdf
UPLOAD_PATH=./uploads
UPLOAD_TEMP_PATH=./temp
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### External APIs
```bash
COINGECKO_API_URL=https://api.coingecko.com/api/v3
EXCHANGE_RATE_API_KEY=your-exchange-rate-api-key
EXCHANGE_RATE_API_URL=https://api.exchangerate-api.com/v4/latest
```

#### WebSocket Configuration
```bash
WS_PORT=3001
WS_PATH=/socket.io
WS_CORS_ORIGIN=http://localhost:3000,http://localhost:3001
```

#### Logging Configuration
```bash
LOG_LEVEL=info|debug|warn|error
LOG_FILE_PATH=./logs
LOG_MAX_SIZE=20m
LOG_MAX_FILES=14d
LOG_CONSOLE=true
```

#### Cache Configuration
```bash
CACHE_TTL=3600
CACHE_PREFIX=p2p:
CACHE_ENABLED=true
```

#### Debug Configuration
```bash
DEBUG=false
VERBOSE_LOGGING=false
ENABLE_SWAGGER=true
SWAGGER_UI_PATH=/api/docs
API_DOCUMENTATION_URL=/api
```

#### Health Check Configuration
```bash
HEALTH_CHECK_ENABLED=true
HEALTH_CHECK_PATH=/health
HEALTH_CHECK_INTERVAL=30000
```

#### Background Jobs Configuration
```bash
QUEUE_REDIS_URL=redis://localhost:6379
QUEUE_PREFIX=p2p_jobs
QUEUE_CONCURRENCY=5
```

#### Monitoring Configuration
```bash
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production
METRICS_ENABLED=false
METRICS_PORT=9090
```

## Environment Setup

### Development Setup

1. Copy the root `env.example` to `.env` in the project root:
   ```bash
   cp env.example .env
   ```

2. Modify the `.env` file with your local settings.

3. The API package will automatically load these settings.

### Production Setup

1. Set all required environment variables in your deployment environment.

2. Ensure sensitive variables are properly secured:
   - `JWT_SECRET` - Use a cryptographically secure random string
   - Database passwords
   - API keys and tokens

3. The configuration system will validate required variables in production.

### Docker Setup

If using Docker, you can:

1. Use environment variables in docker-compose.yml
2. Use .env files with Docker Compose
3. Set environment variables in your container orchestration system

### Configuration Usage

The configuration is available throughout the API application:

```typescript
import config from '../config';

// Access database configuration
const dbConfig = config.database;

// Access JWT secret
const jwtSecret = config.jwt.secret;

// Access app settings
const port = config.app.port;
```

### Environment-Specific Settings

#### Development
- Lower bcrypt rounds for faster password hashing
- Detailed logging enabled
- Swagger documentation enabled
- Relaxed rate limiting

#### Staging
- Production-like settings
- Moderate logging
- External service integration testing

#### Production
- Maximum security settings
- Optimized performance
- Comprehensive monitoring
- Strict validation

### Troubleshooting

#### Common Issues

1. **Missing JWT_SECRET in production**
   - Set a strong, unique JWT secret
   - Don't use the default fallback value

2. **Database connection failed**
   - Verify database credentials
   - Ensure database server is running
   - Check network connectivity

3. **Email/SMS not working**
   - Verify service credentials
   - Check API quotas and limits
   - Ensure proper configuration format

4. **CORS errors**
   - Add your frontend URLs to CORS_ORIGIN
   - Use comma-separated list for multiple origins

5. **Rate limiting issues**
   - Adjust rate limit settings for your use case
   - Consider different limits for development vs production

### Security Considerations

1. **Never commit sensitive data to version control**
2. **Use environment-specific secrets**
3. **Regularly rotate API keys and passwords**
4. **Monitor for unauthorized access**
5. **Use HTTPS in production**
6. **Keep dependencies updated**

### Performance Tuning

1. **Database Connection Pool**
   - Adjust pool size based on load
   - Monitor connection usage

2. **Redis Configuration**
   - Tune TTL values for your use case
   - Monitor memory usage

3. **Rate Limiting**
   - Balance security and usability
   - Consider different limits for different endpoints

4. **Logging**
   - Use appropriate log levels
   - Consider log rotation and retention


