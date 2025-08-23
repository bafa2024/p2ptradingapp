// User related enums
export enum KYCStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

export enum MembershipTier {
  FREE = 'free',
  BASIC = 'basic',
  PREMIUM = 'premium'
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  MODERATOR = 'moderator'
}

export enum UserStatusEnum {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  BANNED = 'banned',
  PENDING_VERIFICATION = 'pending_verification'
}

// Trading related enums
export enum AdvertisementType {
  BUY = 'buy',
  SELL = 'sell'
}

export enum TradeStatus {
  PENDING = 'pending',
  PAID = 'paid',
  CONFIRMED = 'confirmed',
  DISPUTED = 'disputed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired'
}

export enum PaymentMethodTypeEnum {
  BANK_TRANSFER = 'bank_transfer',
  CASH = 'cash',
  MOBILE_MONEY = 'mobile_money',
  ONLINE_WALLET = 'online_wallet',
  CRYPTO = 'crypto'
}

export enum PriceTypeEnum {
  FIXED = 'fixed',
  FLOATING = 'floating'
}

// Wallet related enums
export enum CurrencyCode {
  USDT = 'USDT',
  IQD = 'IQD',
  BTC = 'BTC',
  ETH = 'ETH',
  TRX = 'TRX'
}

export enum TransactionType {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
  INTERNAL_TRANSFER = 'internal_transfer',
  TRADE = 'trade',
  COMMISSION = 'commission',
  FEE = 'fee',
  REFUND = 'refund'
}

export enum TransactionStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// Admin related enums
export enum AdminRoleEnum {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support'
}

export enum AdminPermissionEnum {
  // User permissions
  USERS_VIEW = 'users.view',
  USERS_EDIT = 'users.edit',
  USERS_DELETE = 'users.delete',
  USERS_SUSPEND = 'users.suspend',
  
  // Trade permissions
  TRADES_VIEW = 'trades.view',
  TRADES_EDIT = 'trades.edit',
  TRADES_CANCEL = 'trades.cancel',
  TRADES_DISPUTE = 'trades.dispute',
  
  // Advertisement permissions
  ADVERTISEMENTS_VIEW = 'advertisements.view',
  ADVERTISEMENTS_EDIT = 'advertisements.edit',
  ADVERTISEMENTS_DELETE = 'advertisements.delete',
  
  // Wallet permissions
  WALLETS_VIEW = 'wallets.view',
  WALLETS_EDIT = 'wallets.edit',
  WALLETS_FREEZE = 'wallets.freeze',
  
  // KYC permissions
  KYC_VIEW = 'kyc.view',
  KYC_APPROVE = 'kyc.approve',
  KYC_REJECT = 'kyc.reject',
  
  // Report permissions
  REPORTS_VIEW = 'reports.view',
  REPORTS_EXPORT = 'reports.export',
  
  // Settings permissions
  SETTINGS_VIEW = 'settings.view',
  SETTINGS_EDIT = 'settings.edit',
  
  // System permissions
  SYSTEM_LOGS = 'system.logs',
  SYSTEM_MAINTENANCE = 'system.maintenance'
}

// Auth related enums
export enum TokenTypeEnum {
  ACCESS = 'access',
  REFRESH = 'refresh',
  EMAIL_VERIFICATION = 'email_verification',
  PASSWORD_RESET = 'password_reset',
  TWO_FACTOR = 'two_factor'
}

export enum OTPType {
  REGISTRATION = 'registration',
  LOGIN = 'login',
  PASSWORD_RESET = 'password_reset',
  PHONE_VERIFICATION = 'phone_verification'
}

// System related enums
export enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

export enum ServiceStatusEnum {
  HEALTHY = 'healthy',
  DEGRADED = 'degraded',
  UNHEALTHY = 'unhealthy'
}

export enum NotificationType {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum NotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}

// WebSocket related enums
export enum WebSocketEventType {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  JOIN_ROOM = 'join_room',
  LEAVE_ROOM = 'leave_room',
  TRADE_UPDATE = 'trade_update',
  CHAT_MESSAGE = 'chat_message',
  NOTIFICATION = 'notification',
  ONLINE_STATUS = 'online_status',
  PRICE_UPDATE = 'price_update'
}

export enum ChatMessageType {
  TEXT = 'text',
  IMAGE = 'image',
  SYSTEM = 'system',
  PAYMENT_PROOF = 'payment_proof'
}

// File related enums
export enum FileType {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio'
}

export enum DocumentType {
  PASSPORT = 'passport',
  NATIONAL_ID = 'national_id',
  DRIVERS_LICENSE = 'drivers_license',
  BANK_STATEMENT = 'bank_statement',
  UTILITY_BILL = 'utility_bill'
}

// API related enums
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum ApiVersion {
  V1 = 'v1',
  V2 = 'v2'
}

export enum Environment {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  PRODUCTION = 'production',
  TEST = 'test'
}

// Error related enums
export enum ErrorCode {
  // Authentication errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INVALID_TOKEN = 'INVALID_TOKEN',
  
  // Validation errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD = 'MISSING_REQUIRED_FIELD',
  INVALID_FORMAT = 'INVALID_FORMAT',
  
  // Resource errors
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  RESOURCE_LOCKED = 'RESOURCE_LOCKED',
  
  // Business logic errors
  INSUFFICIENT_BALANCE = 'INSUFFICIENT_BALANCE',
  TRADE_NOT_AVAILABLE = 'TRADE_NOT_AVAILABLE',
  KYC_NOT_VERIFIED = 'KYC_NOT_VERIFIED',
  
  // System errors
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  MAINTENANCE_MODE = 'MAINTENANCE_MODE'
}
