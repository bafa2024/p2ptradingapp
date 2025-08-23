/**
 * Mobile App Configuration
 * 
 * This file contains environment-specific configuration for the React Native app.
 * 
 * Environment variables can be set in:
 * 1. Root project .env files
 * 2. expo-constants for Expo-managed apps
 * 3. System environment variables
 */

import Constants from 'expo-constants';

// Get environment from Expo constants or default to development
const ENV = Constants.expoConfig?.extra?.environment || 'development';

// Configuration for different environments
const config = {
  development: {
    // API Configuration
    API_URL: 'http://localhost:3000/api/v1',
    WS_URL: 'ws://localhost:3001',
    
    // App Configuration
    APP_NAME: 'P2P Platform (Dev)',
    APP_VERSION: '1.0.0-dev',
    APP_BUILD_NUMBER: 1,
    
    // WebView Configuration
    WEB_APP_URL: 'http://localhost:3002',
    
    // Authentication
    AUTH_STORAGE_KEY: '@p2p_platform_dev:auth',
    BIOMETRIC_STORAGE_KEY: '@p2p_platform_dev:biometric',
    
    // Notifications
    FIREBASE_CONFIG: {
      apiKey: 'dev-api-key',
      authDomain: 'p2p-platform-dev.firebaseapp.com',
      projectId: 'p2p-platform-dev',
      storageBucket: 'p2p-platform-dev.appspot.com',
      messagingSenderId: '123456789',
      appId: 'dev-app-id',
    },
    
    // Feature Flags
    FEATURES: {
      BIOMETRIC_AUTH: true,
      PUSH_NOTIFICATIONS: true,
      OFFLINE_MODE: false,
      ANALYTICS: false,
      CRASH_REPORTING: false,
      DEV_MENU: true,
      DEBUG_MODE: true,
    },
    
    // UI Configuration
    THEME: {
      DEFAULT_THEME: 'light',
      ALLOW_THEME_SWITCHING: true,
    },
    
    // Cache Configuration
    CACHE: {
      IMAGE_CACHE_SIZE: 50 * 1024 * 1024, // 50MB
      DATA_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
    },
    
    // Security
    SECURITY: {
      CERTIFICATE_PINNING: false,
      JAILBREAK_DETECTION: false,
      ROOT_DETECTION: false,
      SCREENSHOT_PROTECTION: false,
    },
    
    // Logging
    LOGGING: {
      LEVEL: 'debug',
      REMOTE_LOGGING: false,
      CONSOLE_LOGGING: true,
    },
    
    // Analytics
    ANALYTICS: {
      ENABLED: false,
      TRACK_SCREENS: false,
      TRACK_EVENTS: false,
    },
  },
  
  staging: {
    // API Configuration
    API_URL: 'https://api-staging.p2p-platform.com/api/v1',
    WS_URL: 'wss://ws-staging.p2p-platform.com',
    
    // App Configuration
    APP_NAME: 'P2P Platform (Staging)',
    APP_VERSION: '1.0.0-staging',
    APP_BUILD_NUMBER: 1,
    
    // WebView Configuration
    WEB_APP_URL: 'https://app-staging.p2p-platform.com',
    
    // Authentication
    AUTH_STORAGE_KEY: '@p2p_platform_staging:auth',
    BIOMETRIC_STORAGE_KEY: '@p2p_platform_staging:biometric',
    
    // Notifications
    FIREBASE_CONFIG: {
      apiKey: 'staging-api-key',
      authDomain: 'p2p-platform-staging.firebaseapp.com',
      projectId: 'p2p-platform-staging',
      storageBucket: 'p2p-platform-staging.appspot.com',
      messagingSenderId: '123456789',
      appId: 'staging-app-id',
    },
    
    // Feature Flags
    FEATURES: {
      BIOMETRIC_AUTH: true,
      PUSH_NOTIFICATIONS: true,
      OFFLINE_MODE: true,
      ANALYTICS: true,
      CRASH_REPORTING: true,
      DEV_MENU: false,
      DEBUG_MODE: false,
    },
    
    // UI Configuration
    THEME: {
      DEFAULT_THEME: 'light',
      ALLOW_THEME_SWITCHING: true,
    },
    
    // Cache Configuration
    CACHE: {
      IMAGE_CACHE_SIZE: 100 * 1024 * 1024, // 100MB
      DATA_CACHE_TTL: 10 * 60 * 1000, // 10 minutes
    },
    
    // Security
    SECURITY: {
      CERTIFICATE_PINNING: true,
      JAILBREAK_DETECTION: true,
      ROOT_DETECTION: true,
      SCREENSHOT_PROTECTION: true,
    },
    
    // Logging
    LOGGING: {
      LEVEL: 'info',
      REMOTE_LOGGING: true,
      CONSOLE_LOGGING: false,
    },
    
    // Analytics
    ANALYTICS: {
      ENABLED: true,
      TRACK_SCREENS: true,
      TRACK_EVENTS: true,
    },
  },
  
  production: {
    // API Configuration
    API_URL: 'https://api.p2p-platform.com/api/v1',
    WS_URL: 'wss://ws.p2p-platform.com',
    
    // App Configuration
    APP_NAME: 'P2P Platform',
    APP_VERSION: '1.0.0',
    APP_BUILD_NUMBER: 1,
    
    // WebView Configuration
    WEB_APP_URL: 'https://app.p2p-platform.com',
    
    // Authentication
    AUTH_STORAGE_KEY: '@p2p_platform:auth',
    BIOMETRIC_STORAGE_KEY: '@p2p_platform:biometric',
    
    // Notifications
    FIREBASE_CONFIG: {
      apiKey: 'production-api-key',
      authDomain: 'p2p-platform.firebaseapp.com',
      projectId: 'p2p-platform',
      storageBucket: 'p2p-platform.appspot.com',
      messagingSenderId: '123456789',
      appId: 'production-app-id',
    },
    
    // Feature Flags
    FEATURES: {
      BIOMETRIC_AUTH: true,
      PUSH_NOTIFICATIONS: true,
      OFFLINE_MODE: true,
      ANALYTICS: true,
      CRASH_REPORTING: true,
      DEV_MENU: false,
      DEBUG_MODE: false,
    },
    
    // UI Configuration
    THEME: {
      DEFAULT_THEME: 'light',
      ALLOW_THEME_SWITCHING: true,
    },
    
    // Cache Configuration
    CACHE: {
      IMAGE_CACHE_SIZE: 200 * 1024 * 1024, // 200MB
      DATA_CACHE_TTL: 30 * 60 * 1000, // 30 minutes
    },
    
    // Security
    SECURITY: {
      CERTIFICATE_PINNING: true,
      JAILBREAK_DETECTION: true,
      ROOT_DETECTION: true,
      SCREENSHOT_PROTECTION: true,
    },
    
    // Logging
    LOGGING: {
      LEVEL: 'error',
      REMOTE_LOGGING: true,
      CONSOLE_LOGGING: false,
    },
    
    // Analytics
    ANALYTICS: {
      ENABLED: true,
      TRACK_SCREENS: true,
      TRACK_EVENTS: true,
    },
  },
};

// Constants that don't change between environments
const CONSTANTS = {
  // Supported languages
  SUPPORTED_LANGUAGES: ['en', 'ar', 'ku'],
  DEFAULT_LANGUAGE: 'en',
  
  // Supported currencies
  SUPPORTED_CURRENCIES: ['USDT', 'IQD', 'BTC', 'ETH', 'TRX'],
  DEFAULT_CURRENCY: 'USDT',
  
  // Timeouts
  API_TIMEOUT: 30000,
  WS_TIMEOUT: 5000,
  
  // Storage keys
  STORAGE_KEYS: {
    USER_PREFERENCES: '@p2p_platform:preferences',
    THEME: '@p2p_platform:theme',
    LANGUAGE: '@p2p_platform:language',
    CURRENCY: '@p2p_platform:currency',
    ONBOARDING_COMPLETE: '@p2p_platform:onboarding_complete',
    BIOMETRIC_ENABLED: '@p2p_platform:biometric_enabled',
    NOTIFICATION_SETTINGS: '@p2p_platform:notification_settings',
  },
  
  // WebView URLs
  WEBVIEW_ROUTES: {
    TERMS_OF_SERVICE: '/terms',
    PRIVACY_POLICY: '/privacy',
    HELP_CENTER: '/help',
    FAQ: '/faq',
    CONTACT_US: '/contact',
    TRADE_GUIDE: '/guide/trading',
    SECURITY_GUIDE: '/guide/security',
  },
  
  // Validation rules
  VALIDATION: {
    MIN_PASSWORD_LENGTH: 6,
    MAX_PASSWORD_LENGTH: 128,
    MIN_USERNAME_LENGTH: 3,
    MAX_USERNAME_LENGTH: 50,
    PHONE_MIN_LENGTH: 10,
    PHONE_MAX_LENGTH: 15,
  },
  
  // UI Constants
  UI: {
    TAB_BAR_HEIGHT: 80,
    HEADER_HEIGHT: 60,
    BOTTOM_SHEET_SNAP_POINTS: ['25%', '50%', '90%'],
    ANIMATION_DURATION: 300,
    DEBOUNCE_DELAY: 500,
  },
  
  // Limits
  LIMITS: {
    MAX_UPLOAD_SIZE: 10 * 1024 * 1024, // 10MB
    MAX_MESSAGE_LENGTH: 1000,
    MAX_TRADE_AMOUNT: 1000000,
    MIN_TRADE_AMOUNT: 1,
  },
};

// Get the current environment configuration
const currentConfig = config[ENV] || config.development;

// Merge with constants
const APP_CONFIG = {
  ...currentConfig,
  ...CONSTANTS,
  ENV,
  IS_DEV: ENV === 'development',
  IS_STAGING: ENV === 'staging',
  IS_PROD: ENV === 'production',
};

// Validation function to ensure required config is present
const validateConfig = () => {
  const requiredFields = [
    'API_URL',
    'APP_NAME',
    'APP_VERSION',
  ];

  const missingFields = requiredFields.filter(field => !APP_CONFIG[field]);

  if (missingFields.length > 0) {
    console.error('Missing required configuration fields:', missingFields);
    throw new Error(`Missing required configuration: ${missingFields.join(', ')}`);
  }

  // Validate API URL format
  try {
    new URL(APP_CONFIG.API_URL);
  } catch (error) {
    throw new Error('Invalid API_URL format');
  }

  // Production-specific validations
  if (APP_CONFIG.IS_PROD) {
    if (APP_CONFIG.API_URL.includes('localhost')) {
      throw new Error('Production app cannot use localhost API URL');
    }
    
    if (APP_CONFIG.FEATURES.DEBUG_MODE) {
      console.warn('Debug mode is enabled in production');
    }
  }
};

// Run validation
validateConfig();

export default APP_CONFIG;

// Export specific configurations for easy access
export const {
  API_URL,
  WS_URL,
  WEB_APP_URL,
  APP_NAME,
  APP_VERSION,
  FEATURES,
  FIREBASE_CONFIG,
  SECURITY,
  LOGGING,
  ANALYTICS,
  CACHE,
  THEME,
  STORAGE_KEYS,
  WEBVIEW_ROUTES,
  VALIDATION,
  UI,
  LIMITS,
  ENV,
  IS_DEV,
  IS_STAGING,
  IS_PROD,
} = APP_CONFIG;


