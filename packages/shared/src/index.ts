// Types
export * from './types/user';
export * from './types/wallet';
export * from './types/trading';
export * from './types/auth';
export * from './types/admin';

// Interfaces
export * from './interfaces/api';
export * from './interfaces/events';

// Enums
export * from './enums';

// Constants
export * from './constants';

// Utilities
export * from './utils/validation';
export * from './utils/formatting';

// Re-export commonly used types for convenience
export type {
  ApiResponse,
  PaginationMeta,
  ListResponse,
} from './interfaces/api';

export type {
  UserResponse,
  CreateUserRequest,
  UpdateUserRequest,
} from './types/user';

export type {
  WalletResponse,
  Transaction,
  WithdrawalRequest,
  InternalTransferRequest,
} from './types/wallet';

export type {
  AdvertisementResponse,
  TradeResponse,
  CreateAdvertisementRequest,
  CreateTradeRequest,
} from './types/trading';

export type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  AuthTokens,
} from './types/auth';

// Export commonly used enums
export {
  KYCStatus,
  MembershipTier,
  UserRole,
  TradeStatus,
  AdvertisementType,
  CurrencyCode,
  TransactionType,
  TransactionStatus,
} from './enums';

// Export validation functions that are commonly used
export {
  isValidEmail,
  isValidPhone,
  isValidPassword,
  isValidTradeAmount,
  validateEmail,
  validatePhone,
  validatePassword,
  validateTradeAmount,
} from './utils/validation';

// Export formatting functions that are commonly used
export {
  formatCurrency,
  formatPrice,
  formatBalance,
  formatDateTime,
  formatRelativeTime,
  formatCryptoAddress,
} from './utils/formatting';
