import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from root .env files
const rootDir = path.resolve(__dirname, '../../../..');
dotenv.config({ path: path.join(rootDir, '.env') });
dotenv.config({ path: path.join(rootDir, '.env.local') });
dotenv.config({ path: path.join(rootDir, '.env.development') });

// Load package-specific environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb';
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  logging: boolean | ((sql: string) => void);
}

interface RedisConfig {
  host: string;
  port: number;
  password: string | undefined;
  db: number;
  ttl: number;
}

interface JWTConfig {
  secret: string;
  expiresIn: string;
  refreshExpiresIn: string;
  issuer: string;
  audience: string;
}

interface SecurityConfig {
  bcryptRounds: number;
  corsOrigin: string[];
  helmetEnabled: boolean;
  compressionEnabled: boolean;
}

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  skipSuccessfulRequests: boolean;
}

interface BlockchainConfig {
  tron: {
    network: 'mainnet' | 'shasta' | 'nile';
    apiKey: string | undefined;
    apiUrl: string;
    usdtContractAddress: string;
    privateKey: string | undefined;
  };
}

interface EmailConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  password: string;
  from: string;
  fromName: string;
}

interface SMSConfig {
  twilio: {
    accountSid: string;
    authToken: string;
    phoneNumber: string;
    verifyServiceSid: string | undefined;
  };
}

interface FirebaseConfig {
  projectId: string;
  privateKeyId: string;
  privateKey: string;
  clientEmail: string;
  clientId: string;
}

interface FileUploadConfig {
  maxSize: number;
  allowedTypes: string[];
  uploadPath: string;
  tempPath: string;
  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  } | undefined;
}

interface ExternalAPIsConfig {
  coingecko: {
    baseUrl: string;
  };
  exchangeRate: {
    apiKey: string | undefined;
    baseUrl: string;
  };
}

interface WebSocketConfig {
  port: number;
  path: string;
  corsOrigin: string[];
}

interface LoggingConfig {
  level: 'error' | 'warn' | 'info' | 'debug';
  filePath: string;
  maxSize: string;
  maxFiles: string;
  console: boolean;
}

interface CacheConfig {
  ttl: number;
  prefix: string;
  enabled: boolean;
}

interface HealthCheckConfig {
  enabled: boolean;
  path: string;
  interval: number;
}

interface QueueConfig {
  redisUrl: string;
  prefix: string;
  concurrency: number;
}

interface MonitoringConfig {
  sentry: {
    dsn: string;
    environment: string;
  } | undefined;
  metrics: {
    enabled: boolean;
    port: number;
  };
}

export interface AppConfig {
  app: {
    name: string;
    version: string;
    port: number;
    host: string;
    environment: 'development' | 'staging' | 'production' | 'test';
  };
  database: DatabaseConfig;
  redis: RedisConfig;
  jwt: JWTConfig;
  security: SecurityConfig;
  rateLimit: RateLimitConfig;
  blockchain: BlockchainConfig;
  email: EmailConfig;
  sms: SMSConfig;
  firebase: FirebaseConfig;
  fileUpload: FileUploadConfig;
  externalAPIs: ExternalAPIsConfig;
  websocket: WebSocketConfig;
  logging: LoggingConfig;
  cache: CacheConfig;
  healthCheck: HealthCheckConfig;
  queue: QueueConfig;
  monitoring: MonitoringConfig;
  debug: {
    enabled: boolean;
    verboseLogging: boolean;
    enableSwagger: boolean;
    swaggerPath: string;
    apiDocsPath: string;
  };
}

// Helper function to parse boolean environment variables
const parseBoolean = (value: string | undefined, defaultValue: boolean = false): boolean => {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Helper function to parse number environment variables
const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Helper function to parse array environment variables
const parseArray = (value: string | undefined, defaultValue: string[] = []): string[] => {
  if (!value) return defaultValue;
  return value.split(',').map(item => item.trim()).filter(Boolean);
};

// Get environment first
const nodeEnv = (process.env['NODE_ENV'] as any) || 'development';

// Create configuration object
const config: AppConfig = {
  app: {
    name: process.env['APP_NAME'] || 'P2P Platform API',
    version: process.env['APP_VERSION'] || '1.0.0',
    port: parseNumber(process.env['API_PORT'], 3000),
    host: process.env['API_HOST'] || 'localhost',
    environment: nodeEnv,
  },

  database: {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseNumber(process.env['DB_PORT'], 3306),
    username: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || '',
    database: process.env['DB_NAME'] || 'p2p_platform',
    dialect: (process.env['DB_DIALECT'] as any) || 'mysql',
    pool: {
      max: parseNumber(process.env['DB_POOL_MAX'], 10),
      min: parseNumber(process.env['DB_POOL_MIN'], 0),
      acquire: parseNumber(process.env['DB_POOL_ACQUIRE'], 30000),
      idle: parseNumber(process.env['DB_POOL_IDLE'], 10000),
    },
    logging: nodeEnv === 'development' ? console.log : false,
  },

  redis: {
    host: process.env['REDIS_HOST'] || 'localhost',
    port: parseNumber(process.env['REDIS_PORT'], 6379),
    password: process.env['REDIS_PASSWORD'],
    db: parseNumber(process.env['REDIS_DB'], 0),
    ttl: parseNumber(process.env['REDIS_TTL'], 3600),
  },

  jwt: {
    secret: process.env['JWT_SECRET'] || 'fallback-jwt-secret',
    expiresIn: process.env['JWT_EXPIRES_IN'] || '15m',
    refreshExpiresIn: process.env['JWT_REFRESH_EXPIRES_IN'] || '7d',
    issuer: process.env['JWT_ISSUER'] || 'p2p-platform',
    audience: process.env['JWT_AUDIENCE'] || 'p2p-users',
  },

  security: {
    bcryptRounds: parseNumber(process.env['BCRYPT_ROUNDS'], 12),
    corsOrigin: parseArray(process.env['CORS_ORIGIN'], ['http://localhost:3000']),
    helmetEnabled: parseBoolean(process.env['HELMET_ENABLED'], true),
    compressionEnabled: parseBoolean(process.env['COMPRESSION_ENABLED'], true),
  },

  rateLimit: {
    windowMs: parseNumber(process.env['RATE_LIMIT_WINDOW_MS'], 900000),
    maxRequests: parseNumber(process.env['RATE_LIMIT_MAX_REQUESTS'], 100),
    skipSuccessfulRequests: parseBoolean(process.env['RATE_LIMIT_SKIP_SUCCESSFUL_REQUESTS'], false),
  },

  blockchain: {
    tron: {
      network: (process.env['TRON_NETWORK'] as any) || 'mainnet',
      apiKey: process.env['TRON_API_KEY'],
      apiUrl: process.env['TRON_API_URL'] || 'https://api.trongrid.io',
      usdtContractAddress: process.env['USDT_CONTRACT_ADDRESS'] || 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
      privateKey: process.env['TRON_PRIVATE_KEY'],
    },
  },

  email: {
    host: process.env['EMAIL_HOST'] || 'smtp.gmail.com',
    port: parseNumber(process.env['EMAIL_PORT'], 587),
    secure: parseBoolean(process.env['EMAIL_SECURE'], false),
    user: process.env['EMAIL_USER'] || '',
    password: process.env['EMAIL_PASSWORD'] || '',
    from: process.env['EMAIL_FROM'] || 'noreply@p2p-platform.com',
    fromName: process.env['EMAIL_FROM_NAME'] || 'P2P Platform',
  },

  sms: {
    twilio: {
      accountSid: process.env['TWILIO_ACCOUNT_SID'] || '',
      authToken: process.env['TWILIO_AUTH_TOKEN'] || '',
      phoneNumber: process.env['TWILIO_PHONE_NUMBER'] || '',
      verifyServiceSid: process.env['TWILIO_VERIFY_SERVICE_SID'],
    },
  },

  firebase: {
    projectId: process.env['FIREBASE_PROJECT_ID'] || '',
    privateKeyId: process.env['FIREBASE_PRIVATE_KEY_ID'] || '',
    privateKey: process.env['FIREBASE_PRIVATE_KEY'] || '',
    clientEmail: process.env['FIREBASE_CLIENT_EMAIL'] || '',
    clientId: process.env['FIREBASE_CLIENT_ID'] || '',
  },

  fileUpload: {
    maxSize: parseNumber(process.env['UPLOAD_MAX_SIZE'], 10485760), // 10MB
    allowedTypes: parseArray(process.env['UPLOAD_ALLOWED_TYPES'], ['image/jpeg', 'image/png', 'application/pdf']),
    uploadPath: process.env['UPLOAD_PATH'] || './uploads',
    tempPath: process.env['UPLOAD_TEMP_PATH'] || './temp',
    cloudinary: process.env['CLOUDINARY_CLOUD_NAME'] ? {
      cloudName: process.env['CLOUDINARY_CLOUD_NAME'],
      apiKey: process.env['CLOUDINARY_API_KEY'] || '',
      apiSecret: process.env['CLOUDINARY_API_SECRET'] || '',
    } : undefined,
  },

  externalAPIs: {
    coingecko: {
      baseUrl: process.env['COINGECKO_API_URL'] || 'https://api.coingecko.com/api/v3',
    },
    exchangeRate: {
      apiKey: process.env['EXCHANGE_RATE_API_KEY'],
      baseUrl: process.env['EXCHANGE_RATE_API_URL'] || 'https://api.exchangerate-api.com/v4/latest',
    },
  },

  websocket: {
    port: parseNumber(process.env['WS_PORT'], 3001),
    path: process.env['WS_PATH'] || '/socket.io',
    corsOrigin: parseArray(process.env['WS_CORS_ORIGIN'], ['http://localhost:3000']),
  },

  logging: {
    level: (process.env['LOG_LEVEL'] as any) || 'info',
    filePath: process.env['LOG_FILE_PATH'] || './logs',
    maxSize: process.env['LOG_MAX_SIZE'] || '20m',
    maxFiles: process.env['LOG_MAX_FILES'] || '14d',
    console: parseBoolean(process.env['LOG_CONSOLE'], true),
  },

  cache: {
    ttl: parseNumber(process.env['CACHE_TTL'], 3600),
    prefix: process.env['CACHE_PREFIX'] || 'p2p:',
    enabled: parseBoolean(process.env['CACHE_ENABLED'], true),
  },

  healthCheck: {
    enabled: parseBoolean(process.env['HEALTH_CHECK_ENABLED'], true),
    path: process.env['HEALTH_CHECK_PATH'] || '/health',
    interval: parseNumber(process.env['HEALTH_CHECK_INTERVAL'], 30000),
  },

  queue: {
    redisUrl: process.env['QUEUE_REDIS_URL'] || 'redis://localhost:6379',
    prefix: process.env['QUEUE_PREFIX'] || 'p2p_jobs',
    concurrency: parseNumber(process.env['QUEUE_CONCURRENCY'], 5),
  },

  monitoring: {
    sentry: process.env['SENTRY_DSN'] ? {
      dsn: process.env['SENTRY_DSN'],
      environment: process.env['SENTRY_ENVIRONMENT'] || nodeEnv,
    } : undefined,
    metrics: {
      enabled: parseBoolean(process.env['METRICS_ENABLED'], false),
      port: parseNumber(process.env['METRICS_PORT'], 9090),
    },
  },

  debug: {
    enabled: parseBoolean(process.env['DEBUG'], nodeEnv === 'development'),
    verboseLogging: parseBoolean(process.env['VERBOSE_LOGGING'], nodeEnv === 'development'),
    enableSwagger: parseBoolean(process.env['ENABLE_SWAGGER'], true),
    swaggerPath: process.env['SWAGGER_UI_PATH'] || '/api/docs',
    apiDocsPath: process.env['API_DOCUMENTATION_URL'] || '/api',
  },
};

// Validate required configuration
const validateConfig = () => {
  const requiredFields = [
    'JWT_SECRET',
  ];

  const missingFields = requiredFields.filter(field => !process.env[field]);

  if (missingFields.length > 0 && config.app.environment === 'production') {
    throw new Error(`Missing required environment variables: ${missingFields.join(', ')}`);
  }

  if (config.jwt.secret === 'fallback-jwt-secret' && config.app.environment === 'production') {
    throw new Error('JWT_SECRET must be set in production environment');
  }
};

// Only validate in production to avoid blocking development
if (config.app.environment === 'production') {
  validateConfig();
}

export default config;
export { validateConfig };
