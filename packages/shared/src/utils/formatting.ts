import { CurrencyCode } from '../enums';
import { TRADING } from '../constants';

// Currency formatting utilities
export const formatCurrency = (
  amount: number, 
  currency: CurrencyCode, 
  options: {
    showSymbol?: boolean;
    decimalPlaces?: number;
    locale?: string;
  } = {}
): string => {
  const {
    showSymbol = true,
    decimalPlaces = TRADING.PRICE_DECIMAL_PLACES[currency],
    locale = 'en-US'
  } = options;

  const formattedAmount = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(amount);

  if (!showSymbol) {
    return formattedAmount;
  }

  // Currency symbols
  const symbols: Record<CurrencyCode, string> = {
    [CurrencyCode.USDT]: 'USDT',
    [CurrencyCode.IQD]: 'IQD',
    [CurrencyCode.BTC]: '₿',
    [CurrencyCode.ETH]: 'Ξ',
    [CurrencyCode.TRX]: 'TRX',
  };

  return `${formattedAmount} ${symbols[currency]}`;
};

export const formatPrice = (
  price: number,
  currency: CurrencyCode,
  locale: string = 'en-US'
): string => {
  return formatCurrency(price, currency, { locale });
};

export const formatBalance = (
  balance: number,
  currency: CurrencyCode,
  options: {
    showZero?: boolean;
    locale?: string;
  } = {}
): string => {
  const { showZero = true, locale = 'en-US' } = options;
  
  if (!showZero && balance === 0) {
    return '--';
  }
  
  return formatCurrency(balance, currency, { locale });
};

// Number formatting utilities
export const formatNumber = (
  number: number,
  options: {
    decimalPlaces?: number;
    locale?: string;
    compact?: boolean;
  } = {}
): string => {
  const {
    decimalPlaces = 2,
    locale = 'en-US',
    compact = false
  } = options;

  if (compact && number >= 1000) {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1,
    }).format(number);
  }

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(number);
};

export const formatPercentage = (
  value: number,
  options: {
    decimalPlaces?: number;
    locale?: string;
    showSign?: boolean;
  } = {}
): string => {
  const {
    decimalPlaces = 2,
    locale = 'en-US',
    showSign = false
  } = options;

  const formatted = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
    signDisplay: showSign ? 'always' : 'auto',
  }).format(value / 100);

  return formatted;
};

// Date and time formatting utilities
export const formatDate = (
  date: Date | string,
  options: {
    format?: 'short' | 'medium' | 'long' | 'full';
    locale?: string;
    timeZone?: string;
  } = {}
): string => {
  const {
    format = 'medium',
    locale = 'en-US',
    timeZone = 'UTC'
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone,
  };

  switch (format) {
    case 'short':
      formatOptions.dateStyle = 'short';
      break;
    case 'medium':
      formatOptions.dateStyle = 'medium';
      break;
    case 'long':
      formatOptions.dateStyle = 'long';
      break;
    case 'full':
      formatOptions.dateStyle = 'full';
      break;
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

export const formatTime = (
  date: Date | string,
  options: {
    format?: 'short' | 'medium' | 'long';
    locale?: string;
    timeZone?: string;
    hour12?: boolean;
  } = {}
): string => {
  const {
    format = 'short',
    locale = 'en-US',
    timeZone = 'UTC',
    hour12 = false
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const formatOptions: Intl.DateTimeFormatOptions = {
    timeZone,
    hour12,
  };

  switch (format) {
    case 'short':
      formatOptions.timeStyle = 'short';
      break;
    case 'medium':
      formatOptions.timeStyle = 'medium';
      break;
    case 'long':
      formatOptions.timeStyle = 'long';
      break;
  }

  return new Intl.DateTimeFormat(locale, formatOptions).format(dateObj);
};

export const formatDateTime = (
  date: Date | string,
  options: {
    dateFormat?: 'short' | 'medium' | 'long';
    timeFormat?: 'short' | 'medium' | 'long';
    locale?: string;
    timeZone?: string;
    hour12?: boolean;
  } = {}
): string => {
  const {
    dateFormat = 'medium',
    timeFormat = 'short',
    locale = 'en-US',
    timeZone = 'UTC',
    hour12 = false
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;

  return new Intl.DateTimeFormat(locale, {
    dateStyle: dateFormat,
    timeStyle: timeFormat,
    timeZone,
    hour12,
  }).format(dateObj);
};

export const formatRelativeTime = (
  date: Date | string,
  options: {
    locale?: string;
    numeric?: 'always' | 'auto';
  } = {}
): string => {
  const {
    locale = 'en-US',
    numeric = 'auto'
  } = options;

  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - dateObj.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric });

  // Define time units in seconds
  const units: Array<[string, number]> = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1],
  ];

  for (const [unit, secondsInUnit] of units) {
    if (Math.abs(diffInSeconds) >= secondsInUnit) {
      const value = Math.floor(diffInSeconds / secondsInUnit);
      return rtf.format(-value, unit as Intl.RelativeTimeFormatUnit);
    }
  }

  return rtf.format(0, 'second');
};

// Duration formatting
export const formatDuration = (
  minutes: number,
  options: {
    format?: 'short' | 'long';
    locale?: string;
  } = {}
): string => {
  const { format = 'short', locale = 'en-US' } = options;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const days = Math.floor(hours / 24);
  const remainingHours = hours % 24;

  if (format === 'short') {
    if (days > 0) {
      return `${days}d ${remainingHours}h`;
    } else if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    } else {
      return `${minutes}m`;
    }
  } else {
    const parts: string[] = [];
    
    if (days > 0) {
      parts.push(`${days} day${days > 1 ? 's' : ''}`);
    }
    if (remainingHours > 0) {
      parts.push(`${remainingHours} hour${remainingHours > 1 ? 's' : ''}`);
    }
    if (remainingMinutes > 0) {
      parts.push(`${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}`);
    }

    return parts.join(', ') || '0 minutes';
  }
};

// File size formatting
export const formatFileSize = (
  bytes: number,
  options: {
    decimals?: number;
    binary?: boolean;
  } = {}
): string => {
  const { decimals = 2, binary = false } = options;

  if (bytes === 0) return '0 B';

  const k = binary ? 1024 : 1000;
  const sizes = binary 
    ? ['B', 'KiB', 'MiB', 'GiB', 'TiB'] 
    : ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = bytes / Math.pow(k, i);

  return `${size.toFixed(decimals)} ${sizes[i]}`;
};

// Text formatting utilities
export const truncateText = (
  text: string,
  maxLength: number,
  options: {
    ellipsis?: string;
    wordBoundary?: boolean;
  } = {}
): string => {
  const { ellipsis = '...', wordBoundary = false } = options;

  if (text.length <= maxLength) {
    return text;
  }

  let truncated = text.substring(0, maxLength - ellipsis.length);

  if (wordBoundary) {
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 0) {
      truncated = truncated.substring(0, lastSpace);
    }
  }

  return truncated + ellipsis;
};

export const capitalizeFirst = (text: string): string => {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

export const capitalizeWords = (text: string): string => {
  if (!text) return '';
  return text.split(' ').map(capitalizeFirst).join(' ');
};

export const formatPhone = (
  phone: string,
  options: {
    format?: 'international' | 'national' | 'e164';
    country?: string;
  } = {}
): string => {
  // This is a simplified implementation
  // In a real app, you'd use a library like libphonenumber-js
  const { format = 'international' } = options;
  
  const cleaned = phone.replace(/\D/g, '');
  
  if (format === 'international' && !phone.startsWith('+')) {
    return `+${cleaned}`;
  }
  
  return phone;
};

// Address formatting for crypto addresses
export const formatCryptoAddress = (
  address: string,
  options: {
    shorten?: boolean;
    startChars?: number;
    endChars?: number;
  } = {}
): string => {
  const { shorten = false, startChars = 6, endChars = 4 } = options;

  if (!shorten || address.length <= startChars + endChars + 3) {
    return address;
  }

  return `${address.substring(0, startChars)}...${address.substring(address.length - endChars)}`;
};


