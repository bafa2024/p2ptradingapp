/**
 * Web App Environment Configuration
 * 
 * This configuration is used for the React web application that provides
 * WebView content for the mobile app and standalone web access.
 */

// Get environment from process.env or default to development
const NODE_ENV = process.env.NODE_ENV || 'development';

// Environment-specific configurations
const environments = {
  development: {
    // API Configuration
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api/v1',
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || 'ws://localhost:3001',
    
    // App Configuration
    REACT_APP_NAME: 'P2P Platform Web (Dev)',
    REACT_APP_VERSION: '1.0.0-dev',
    REACT_APP_BUILD_NUMBER: '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'http://localhost:3002',
    
    // Mobile App Integration
    REACT_APP_MOBILE_APP_SCHEME: 'p2pplatform',
    REACT_APP_IS_WEBVIEW_MODE: process.env.REACT_APP_IS_WEBVIEW_MODE === 'true',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_web_dev:auth',
    REACT_APP_SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
    
    // Security
    REACT_APP_ENABLE_CSP: false,
    REACT_APP_ENABLE_HTTPS_ONLY: false,
    
    // Features
    REACT_APP_FEATURES: {
      TRADING: true,
      CHAT: true,
      KYC: true,
      WALLET: true,
      ANALYTICS: false,
      PWA: true,
      OFFLINE_MODE: false,
      NOTIFICATIONS: true,
      DARK_MODE: true,
      RTL_SUPPORT: true,
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#007AFF',
      ACCENT_COLOR: '#34C759',
      ERROR_COLOR: '#FF3B30',
      WARNING_COLOR: '#FF9500',
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: true,
    REACT_APP_SHOW_REDUX_DEVTOOLS: true,
    REACT_APP_ENABLE_LOGGER: true,
    REACT_APP_LOG_LEVEL: 'debug',
    
    // Performance
    REACT_APP_ENABLE_SOURCE_MAPS: true,
    REACT_APP_BUNDLE_ANALYZER: false,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: '',
    REACT_APP_HOTJAR_ID: '',
    REACT_APP_INTERCOM_APP_ID: '',
  },

  staging: {
    // API Configuration
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://api-staging.p2p-platform.com/api/v1',
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || 'wss://ws-staging.p2p-platform.com',
    
    // App Configuration
    REACT_APP_NAME: 'P2P Platform Web (Staging)',
    REACT_APP_VERSION: '1.0.0-staging',
    REACT_APP_BUILD_NUMBER: process.env.REACT_APP_BUILD_NUMBER || '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'https://app-staging.p2p-platform.com',
    
    // Mobile App Integration
    REACT_APP_MOBILE_APP_SCHEME: 'p2pplatform',
    REACT_APP_IS_WEBVIEW_MODE: process.env.REACT_APP_IS_WEBVIEW_MODE === 'true',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_web_staging:auth',
    REACT_APP_SESSION_TIMEOUT: 12 * 60 * 60 * 1000, // 12 hours
    
    // Security
    REACT_APP_ENABLE_CSP: true,
    REACT_APP_ENABLE_HTTPS_ONLY: true,
    
    // Features
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
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#007AFF',
      ACCENT_COLOR: '#34C759',
      ERROR_COLOR: '#FF3B30',
      WARNING_COLOR: '#FF9500',
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: false,
    REACT_APP_SHOW_REDUX_DEVTOOLS: false,
    REACT_APP_ENABLE_LOGGER: true,
    REACT_APP_LOG_LEVEL: 'info',
    
    // Performance
    REACT_APP_ENABLE_SOURCE_MAPS: false,
    REACT_APP_BUNDLE_ANALYZER: false,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
    REACT_APP_HOTJAR_ID: process.env.REACT_APP_HOTJAR_ID || '',
    REACT_APP_INTERCOM_APP_ID: process.env.REACT_APP_INTERCOM_APP_ID || '',
  },

  production: {
    // API Configuration
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://api.p2p-platform.com/api/v1',
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || 'wss://ws.p2p-platform.com',
    
    // App Configuration
    REACT_APP_NAME: 'P2P Platform',
    REACT_APP_VERSION: '1.0.0',
    REACT_APP_BUILD_NUMBER: process.env.REACT_APP_BUILD_NUMBER || '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'https://app.p2p-platform.com',
    
    // Mobile App Integration
    REACT_APP_MOBILE_APP_SCHEME: 'p2pplatform',
    REACT_APP_IS_WEBVIEW_MODE: process.env.REACT_APP_IS_WEBVIEW_MODE === 'true',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_web:auth',
    REACT_APP_SESSION_TIMEOUT: 8 * 60 * 60 * 1000, // 8 hours
    
    // Security
    REACT_APP_ENABLE_CSP: true,
    REACT_APP_ENABLE_HTTPS_ONLY: true,
    
    // Features
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
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#007AFF',
      ACCENT_COLOR: '#34C759',
      ERROR_COLOR: '#FF3B30',
      WARNING_COLOR: '#FF9500',
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: false,
    REACT_APP_SHOW_REDUX_DEVTOOLS: false,
    REACT_APP_ENABLE_LOGGER: false,
    REACT_APP_LOG_LEVEL: 'error',
    
    // Performance
    REACT_APP_ENABLE_SOURCE_MAPS: false,
    REACT_APP_BUNDLE_ANALYZER: false,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
    REACT_APP_HOTJAR_ID: process.env.REACT_APP_HOTJAR_ID || '',
    REACT_APP_INTERCOM_APP_ID: process.env.REACT_APP_INTERCOM_APP_ID || '',
  },
};

// Constants that don't change between environments
const constants = {
  // Supported languages
  REACT_APP_SUPPORTED_LANGUAGES: ['en', 'ar', 'ku'],
  REACT_APP_DEFAULT_LANGUAGE: 'en',
  
  // Supported currencies
  REACT_APP_SUPPORTED_CURRENCIES: ['USDT', 'IQD', 'BTC', 'ETH', 'TRX'],
  REACT_APP_DEFAULT_CURRENCY: 'USDT',
  
  // API Configuration
  REACT_APP_API_TIMEOUT: 30000,
  REACT_APP_WS_TIMEOUT: 5000,
  REACT_APP_RETRY_ATTEMPTS: 3,
  
  // Cache Configuration
  REACT_APP_CACHE_PREFIX: 'p2p_web_',
  REACT_APP_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  REACT_APP_LOCAL_STORAGE_PREFIX: 'p2p_',
  
  // UI Constants
  REACT_APP_BREAKPOINTS: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1400,
  },
  
  // Validation Rules
  REACT_APP_VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 128,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 50,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
  },
  
  // File Upload Limits
  REACT_APP_UPLOAD_LIMITS: {
    MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
  },
  
  // Routes that should open in mobile app
  REACT_APP_MOBILE_ROUTES: [
    '/trade',
    '/wallet',
    '/profile',
    '/notifications',
  ],
  
  // Routes available for web view
  REACT_APP_WEBVIEW_ROUTES: [
    '/terms',
    '/privacy',
    '/help',
    '/faq',
    '/contact',
    '/guide/trading',
    '/guide/security',
    '/support',
  ],
};

// Get current environment configuration
const currentConfig = environments[NODE_ENV] || environments.development;

// Merge environment config with constants
const config = {
  ...constants,
  ...currentConfig,
  NODE_ENV,
  IS_DEV: NODE_ENV === 'development',
  IS_STAGING: NODE_ENV === 'staging',
  IS_PROD: NODE_ENV === 'production',
};

// Validation function
const validateConfig = () => {
  const requiredFields = [
    'REACT_APP_API_URL',
    'REACT_APP_NAME',
    'REACT_APP_VERSION',
  ];

  const missingFields = requiredFields.filter(field => !config[field]);

  if (missingFields.length > 0) {
    console.error('Missing required configuration fields:', missingFields);
    throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
  }

  // Validate API URL format
  try {
    new URL(config.REACT_APP_API_URL);
  } catch (error) {
    throw new Error('Invalid REACT_APP_API_URL format');
  }

  // Production-specific validations
  if (config.IS_PROD) {
    if (config.REACT_APP_API_URL.includes('localhost')) {
      throw new Error('Production app cannot use localhost API URL');
    }
    
    if (!config.REACT_APP_ENABLE_HTTPS_ONLY) {
      console.warn('HTTPS should be enforced in production');
    }
    
    if (config.REACT_APP_DEBUG_MODE) {
      console.warn('Debug mode should be disabled in production');
    }
  }
};

// Run validation
try {
  validateConfig();
} catch (error) {
  console.error('Configuration validation failed:', error.message);
  if (config.IS_PROD) {
    throw error; // Fail hard in production
  }
}

// Log configuration in development
if (config.IS_DEV && config.REACT_APP_DEBUG_MODE) {
  console.log('Web App Configuration:', {
    environment: NODE_ENV,
    apiUrl: config.REACT_APP_API_URL,
    wsUrl: config.REACT_APP_WS_URL,
    features: config.REACT_APP_FEATURES,
  });
}

export default config;

// Export commonly used values for convenience
export const {
  REACT_APP_API_URL,
  REACT_APP_WS_URL,
  REACT_APP_NAME,
  REACT_APP_VERSION,
  REACT_APP_FEATURES,
  REACT_APP_THEME,
  REACT_APP_IS_WEBVIEW_MODE,
  REACT_APP_MOBILE_APP_SCHEME,
  REACT_APP_BREAKPOINTS,
  REACT_APP_VALIDATION,
  REACT_APP_UPLOAD_LIMITS,
  REACT_APP_MOBILE_ROUTES,
  REACT_APP_WEBVIEW_ROUTES,
  IS_DEV,
  IS_STAGING,
  IS_PROD,
  NODE_ENV,
} = config;


