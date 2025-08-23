// API Configuration
export const API_CONFIG = {
  VERSION: 'v1',
  BASE_PATH: '/api/v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000,
} as const;

// Pagination defaults
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 100,
  MIN_LIMIT: 1,
} as const;

// User related constants
export const USER_CONSTRAINTS = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_]+$/,
  },
  PASSWORD: {
    MIN_LENGTH: 6,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBERS: true,
    REQUIRE_SPECIAL_CHARS: false,
  },
  PHONE: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 15,
    PATTERN: /^\+?[1-9]\d{1,14}$/,
  },
  EMAIL: {
    MAX_LENGTH: 255,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  BIO: {
    MAX_LENGTH: 500,
  },
  REFERRAL_CODE: {
    LENGTH: 8,
    PATTERN: /^[A-Z0-9]{8}$/,
  },
} as const;

// Trading constants
export const TRADING = {
  MIN_TRADE_AMOUNT: {
    USDT: 10,
    IQD: 15000,
    BTC: 0.001,
    ETH: 0.01,
    TRX: 100,
  },
  MAX_TRADE_AMOUNT: {
    USDT: 50000,
    IQD: 75000000,
    BTC: 10,
    ETH: 100,
    TRX: 1000000,
  },
  PRICE_DECIMAL_PLACES: {
    USDT: 2,
    IQD: 0,
    BTC: 8,
    ETH: 6,
    TRX: 4,
  },
  TRADE_TIMEOUT_MINUTES: {
    DEFAULT: 30,
    FAST: 15,
    STANDARD: 30,
    EXTENDED: 60,
  },
  COMMISSION_RATES: {
    FREE_TIER: 0.005, // 0.5%
    BASIC_TIER: 0.003, // 0.3%
    PREMIUM_TIER: 0.001, // 0.1%
  },
  MAX_ACTIVE_ADVERTISEMENTS: {
    FREE_TIER: 3,
    BASIC_TIER: 10,
    PREMIUM_TIER: 50,
  },
  PRICE_MARGIN_LIMITS: {
    MIN: -50, // -50%
    MAX: 100, // +100%
  },
} as const;

// Wallet constants
export const WALLET = {
  MINIMUM_WITHDRAWAL: {
    USDT: 10,
    IQD: 15000,
    BTC: 0.001,
    ETH: 0.01,
    TRX: 100,
  },
  NETWORK_FEES: {
    USDT: 1, // TRC20 USDT
    BTC: 0.0001,
    ETH: 0.001,
    TRX: 1,
  },
  CONFIRMATION_BLOCKS: {
    USDT: 19, // Tron network
    BTC: 3,
    ETH: 12,
    TRX: 19,
  },
  DAILY_WITHDRAWAL_LIMITS: {
    UNVERIFIED: 1000, // USD equivalent
    VERIFIED: 10000,
    PREMIUM: 100000,
  },
  ADDRESS_FORMATS: {
    TRON: /^T[A-Za-z1-9]{33}$/,
    BITCOIN: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
    ETHEREUM: /^0x[a-fA-F0-9]{40}$/,
  },
} as const;

// Security constants
export const SECURITY = {
  OTP: {
    LENGTH: 6,
    EXPIRY_MINUTES: 10,
    MAX_ATTEMPTS: 3,
    RESEND_COOLDOWN_SECONDS: 60,
  },
  TWO_FACTOR: {
    WINDOW: 1, // 30-second windows
    BACKUP_CODES_COUNT: 10,
    BACKUP_CODE_LENGTH: 8,
  },
  SESSION: {
    ACCESS_TOKEN_EXPIRY: '15m',
    REFRESH_TOKEN_EXPIRY: '7d',
    REMEMBER_ME_EXPIRY: '30d',
    MAX_CONCURRENT_SESSIONS: 5,
  },
  PASSWORD_RESET: {
    TOKEN_EXPIRY_HOURS: 1,
    MAX_ATTEMPTS_PER_HOUR: 3,
  },
  RATE_LIMITING: {
    LOGIN_ATTEMPTS: {
      MAX_PER_HOUR: 5,
      LOCKOUT_DURATION_MINUTES: 15,
    },
    API_REQUESTS: {
      PER_MINUTE: 60,
      PER_HOUR: 1000,
    },
    WEBSOCKET_MESSAGES: {
      PER_MINUTE: 100,
    },
  },
} as const;

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: {
    IMAGE: 5 * 1024 * 1024, // 5MB
    DOCUMENT: 10 * 1024 * 1024, // 10MB
    VIDEO: 50 * 1024 * 1024, // 50MB
  },
  ALLOWED_TYPES: {
    IMAGE: ['image/jpeg', 'image/png', 'image/webp'],
    DOCUMENT: ['application/pdf', 'image/jpeg', 'image/png'],
    VIDEO: ['video/mp4', 'video/webm'],
  },
  UPLOAD_PATH: {
    AVATARS: 'uploads/avatars',
    KYC_DOCUMENTS: 'uploads/kyc',
    TRADE_ATTACHMENTS: 'uploads/trades',
    ADMIN_UPLOADS: 'uploads/admin',
  },
} as const;

// KYC constants
export const KYC = {
  REQUIRED_DOCUMENTS: {
    IDENTITY: ['passport', 'national_id', 'drivers_license'],
    ADDRESS: ['utility_bill', 'bank_statement', 'rental_agreement'],
  },
  DOCUMENT_EXPIRY_YEARS: 10,
  REVIEW_TIME_BUSINESS_DAYS: 3,
  AUTO_APPROVAL_THRESHOLD: 0.95, // AI confidence score
} as const;

// Notification constants
export const NOTIFICATIONS = {
  TYPES: {
    TRADE_CREATED: 'trade_created',
    TRADE_PAID: 'trade_paid',
    TRADE_COMPLETED: 'trade_completed',
    TRADE_DISPUTED: 'trade_disputed',
    PAYMENT_RECEIVED: 'payment_received',
    KYC_APPROVED: 'kyc_approved',
    KYC_REJECTED: 'kyc_rejected',
    SECURITY_ALERT: 'security_alert',
    PROMOTION: 'promotion',
    SYSTEM_MAINTENANCE: 'system_maintenance',
  },
  CHANNELS: {
    EMAIL: 'email',
    SMS: 'sms',
    PUSH: 'push',
    IN_APP: 'in_app',
  },
  RETENTION_DAYS: 90,
} as const;

// WebSocket constants
export const WEBSOCKET = {
  EVENTS: {
    CONNECT: 'connect',
    DISCONNECT: 'disconnect',
    JOIN_TRADE: 'join_trade',
    LEAVE_TRADE: 'leave_trade',
    TRADE_UPDATE: 'trade_update',
    CHAT_MESSAGE: 'chat_message',
    TYPING: 'typing',
    ONLINE_STATUS: 'online_status',
    NOTIFICATION: 'notification',
  },
  ROOMS: {
    USER_PREFIX: 'user_',
    TRADE_PREFIX: 'trade_',
    ADMIN_ROOM: 'admin_room',
    GENERAL_ROOM: 'general',
  },
  HEARTBEAT_INTERVAL: 25000, // 25 seconds
  CONNECTION_TIMEOUT: 5000, // 5 seconds
} as const;

// System constants
export const SYSTEM = {
  SUPPORTED_LANGUAGES: ['en', 'ar', 'ku'],
  DEFAULT_LANGUAGE: 'en',
  SUPPORTED_TIMEZONES: [
    'UTC',
    'Asia/Baghdad',
    'Asia/Erbil',
    'Europe/London',
    'America/New_York',
  ],
  DEFAULT_TIMEZONE: 'Asia/Baghdad',
  CURRENCIES: {
    PRIMARY: 'USDT',
    FIAT: 'IQD',
    SUPPORTED: ['USDT', 'IQD', 'BTC', 'ETH', 'TRX'],
  },
  FEATURE_FLAGS: {
    MOBILE_APP: true,
    WEB_APP: true,
    ADMIN_PANEL: true,
    TWO_FACTOR_AUTH: true,
    KYC_VERIFICATION: true,
    DISPUTE_RESOLUTION: true,
    REFERRAL_PROGRAM: true,
    PROMOTIONS: true,
  },
} as const;

// Error messages
export const ERROR_MESSAGES = {
  VALIDATION: {
    REQUIRED: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_PHONE: 'Please enter a valid phone number',
    PASSWORD_TOO_SHORT: 'Password must be at least 6 characters long',
    PASSWORD_TOO_WEAK: 'Password must contain uppercase, lowercase, and numbers',
    INVALID_AMOUNT: 'Please enter a valid amount',
    AMOUNT_TOO_LOW: 'Amount is below minimum limit',
    AMOUNT_TOO_HIGH: 'Amount exceeds maximum limit',
  },
  AUTH: {
    INVALID_CREDENTIALS: 'Invalid phone number or password',
    ACCOUNT_LOCKED: 'Account is temporarily locked due to multiple failed attempts',
    TOKEN_EXPIRED: 'Your session has expired. Please login again',
    UNAUTHORIZED: 'You are not authorized to perform this action',
    TWO_FACTOR_REQUIRED: 'Two-factor authentication is required',
    INVALID_OTP: 'Invalid verification code',
  },
  TRADING: {
    INSUFFICIENT_BALANCE: 'Insufficient balance for this transaction',
    TRADE_NOT_AVAILABLE: 'This trade is no longer available',
    INVALID_TRADE_STATUS: 'Cannot perform this action on trade in current status',
    SELF_TRADE_NOT_ALLOWED: 'You cannot trade with yourself',
    KYC_REQUIRED: 'KYC verification is required for this trade amount',
  },
  SYSTEM: {
    INTERNAL_ERROR: 'An internal error occurred. Please try again later',
    SERVICE_UNAVAILABLE: 'Service is temporarily unavailable',
    MAINTENANCE_MODE: 'System is under maintenance. Please try again later',
    RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later',
  },
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  AUTH: {
    REGISTRATION_SUCCESS: 'Registration successful. Please verify your phone number',
    LOGIN_SUCCESS: 'Login successful',
    LOGOUT_SUCCESS: 'Logout successful',
    PASSWORD_CHANGED: 'Password changed successfully',
    PASSWORD_RESET_SENT: 'Password reset code sent to your phone',
  },
  TRADING: {
    ADVERTISEMENT_CREATED: 'Advertisement created successfully',
    TRADE_CREATED: 'Trade request sent successfully',
    PAYMENT_MARKED: 'Payment marked as sent',
    TRADE_COMPLETED: 'Trade completed successfully',
  },
  KYC: {
    DOCUMENTS_SUBMITTED: 'KYC documents submitted for review',
    VERIFICATION_APPROVED: 'KYC verification approved',
  },
  WALLET: {
    WITHDRAWAL_INITIATED: 'Withdrawal request initiated',
    TRANSFER_COMPLETED: 'Transfer completed successfully',
  },
} as const;

// Regular expressions
export const REGEX = {
  USERNAME: /^[a-zA-Z0-9_]{3,50}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/,
  TRON_ADDRESS: /^T[A-Za-z1-9]{33}$/,
  BITCOIN_ADDRESS: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$|^bc1[a-z0-9]{39,59}$/,
  ETHEREUM_ADDRESS: /^0x[a-fA-F0-9]{40}$/,
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
} as const;


