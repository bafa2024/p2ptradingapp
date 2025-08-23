import { REGEX, USER_CONSTRAINTS, TRADING, WALLET } from '../constants';
import { CurrencyCode } from '../enums';

// Basic validation utilities
export const isValidEmail = (email: string): boolean => {
  return REGEX.EMAIL.test(email.trim());
};

export const isValidPhone = (phone: string): boolean => {
  return REGEX.PHONE.test(phone.trim());
};

export const isValidUsername = (username: string): boolean => {
  return REGEX.USERNAME.test(username) && 
         username.length >= USER_CONSTRAINTS.USERNAME.MIN_LENGTH &&
         username.length <= USER_CONSTRAINTS.USERNAME.MAX_LENGTH;
};

export const isValidPassword = (password: string): boolean => {
  if (password.length < USER_CONSTRAINTS.PASSWORD.MIN_LENGTH) {
    return false;
  }
  
  if (USER_CONSTRAINTS.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
    return false;
  }
  
  if (USER_CONSTRAINTS.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
    return false;
  }
  
  if (USER_CONSTRAINTS.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
    return false;
  }
  
  return true;
};

export const isValidTronAddress = (address: string): boolean => {
  return REGEX.TRON_ADDRESS.test(address);
};

export const isValidBitcoinAddress = (address: string): boolean => {
  return REGEX.BITCOIN_ADDRESS.test(address);
};

export const isValidEthereumAddress = (address: string): boolean => {
  return REGEX.ETHEREUM_ADDRESS.test(address);
};

export const isValidCryptoAddress = (address: string, currency: CurrencyCode): boolean => {
  switch (currency) {
    case CurrencyCode.USDT:
    case CurrencyCode.TRX:
      return isValidTronAddress(address);
    case CurrencyCode.BTC:
      return isValidBitcoinAddress(address);
    case CurrencyCode.ETH:
      return isValidEthereumAddress(address);
    default:
      return false;
  }
};

export const isValidUUID = (uuid: string): boolean => {
  return REGEX.UUID.test(uuid);
};

// Amount validation
export const isValidTradeAmount = (amount: number, currency: CurrencyCode): boolean => {
  const minAmount = TRADING.MIN_TRADE_AMOUNT[currency];
  const maxAmount = TRADING.MAX_TRADE_AMOUNT[currency];
  
  return amount >= minAmount && amount <= maxAmount && amount > 0;
};

export const isValidWithdrawalAmount = (amount: number, currency: CurrencyCode): boolean => {
  const minAmount = WALLET.MINIMUM_WITHDRAWAL[currency];
  
  return amount >= minAmount && amount > 0;
};

export const isValidPriceMargin = (margin: number): boolean => {
  return margin >= TRADING.PRICE_MARGIN_LIMITS.MIN && 
         margin <= TRADING.PRICE_MARGIN_LIMITS.MAX;
};

// Format validation with error messages
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email || email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Please enter a valid email address');
  } else if (email.length > USER_CONSTRAINTS.EMAIL.MAX_LENGTH) {
    errors.push(`Email must be less than ${USER_CONSTRAINTS.EMAIL.MAX_LENGTH} characters`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone || phone.trim().length === 0) {
    errors.push('Phone number is required');
  } else if (!isValidPhone(phone)) {
    errors.push('Please enter a valid phone number');
  } else if (phone.length < USER_CONSTRAINTS.PHONE.MIN_LENGTH || 
             phone.length > USER_CONSTRAINTS.PHONE.MAX_LENGTH) {
    errors.push(`Phone number must be between ${USER_CONSTRAINTS.PHONE.MIN_LENGTH} and ${USER_CONSTRAINTS.PHONE.MAX_LENGTH} digits`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password || password.length === 0) {
    errors.push('Password is required');
  } else {
    if (password.length < USER_CONSTRAINTS.PASSWORD.MIN_LENGTH) {
      errors.push(`Password must be at least ${USER_CONSTRAINTS.PASSWORD.MIN_LENGTH} characters long`);
    }
    
    if (password.length > USER_CONSTRAINTS.PASSWORD.MAX_LENGTH) {
      errors.push(`Password must be less than ${USER_CONSTRAINTS.PASSWORD.MAX_LENGTH} characters long`);
    }
    
    if (USER_CONSTRAINTS.PASSWORD.REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (USER_CONSTRAINTS.PASSWORD.REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (USER_CONSTRAINTS.PASSWORD.REQUIRE_NUMBERS && !/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (USER_CONSTRAINTS.PASSWORD.REQUIRE_SPECIAL_CHARS && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateUsername = (username: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!username || username.trim().length === 0) {
    errors.push('Username is required');
  } else {
    if (username.length < USER_CONSTRAINTS.USERNAME.MIN_LENGTH) {
      errors.push(`Username must be at least ${USER_CONSTRAINTS.USERNAME.MIN_LENGTH} characters long`);
    }
    
    if (username.length > USER_CONSTRAINTS.USERNAME.MAX_LENGTH) {
      errors.push(`Username must be less than ${USER_CONSTRAINTS.USERNAME.MAX_LENGTH} characters long`);
    }
    
    if (!USER_CONSTRAINTS.USERNAME.PATTERN.test(username)) {
      errors.push('Username can only contain letters, numbers, and underscores');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateTradeAmount = (amount: number, currency: CurrencyCode): ValidationResult => {
  const errors: string[] = [];
  
  if (typeof amount !== 'number' || isNaN(amount)) {
    errors.push('Amount must be a valid number');
  } else if (amount <= 0) {
    errors.push('Amount must be greater than zero');
  } else {
    const minAmount = TRADING.MIN_TRADE_AMOUNT[currency];
    const maxAmount = TRADING.MAX_TRADE_AMOUNT[currency];
    
    if (amount < minAmount) {
      errors.push(`Minimum trade amount for ${currency} is ${minAmount}`);
    }
    
    if (amount > maxAmount) {
      errors.push(`Maximum trade amount for ${currency} is ${maxAmount}`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateCryptoAddress = (address: string, currency: CurrencyCode): ValidationResult => {
  const errors: string[] = [];
  
  if (!address || address.trim().length === 0) {
    errors.push('Address is required');
  } else if (!isValidCryptoAddress(address, currency)) {
    errors.push(`Please enter a valid ${currency} address`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitization utilities
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

export const sanitizePhone = (phone: string): string => {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, '');
};

export const sanitizeUsername = (username: string): string => {
  return username.trim().toLowerCase();
};

export const sanitizeAmount = (amount: string | number): number => {
  if (typeof amount === 'number') {
    return Math.round(amount * 1e8) / 1e8; // Round to 8 decimal places
  }
  
  const parsed = parseFloat(amount);
  return isNaN(parsed) ? 0 : Math.round(parsed * 1e8) / 1e8;
};

// Validation helper for forms
export const validateForm = (data: Record<string, any>, rules: Record<string, (value: any) => ValidationResult>): ValidationResult => {
  const errors: string[] = [];
  
  for (const [field, rule] of Object.entries(rules)) {
    const result = rule(data[field]);
    if (!result.isValid) {
      errors.push(...result.errors.map(error => `${field}: ${error}`));
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};


