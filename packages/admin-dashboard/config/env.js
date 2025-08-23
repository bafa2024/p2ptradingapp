/**
 * Admin Dashboard Environment Configuration
 * 
 * This configuration is used for the React admin dashboard application
 * that provides administrative interfaces for managing the P2P platform.
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
    REACT_APP_NAME: 'P2P Platform Admin (Dev)',
    REACT_APP_VERSION: '1.0.0-dev',
    REACT_APP_BUILD_NUMBER: '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'http://localhost:3003',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_admin_dev:auth',
    REACT_APP_SESSION_TIMEOUT: 4 * 60 * 60 * 1000, // 4 hours
    REACT_APP_REQUIRE_2FA: false,
    REACT_APP_SESSION_REFRESH_INTERVAL: 10 * 60 * 1000, // 10 minutes
    
    // Security
    REACT_APP_ENABLE_CSP: false,
    REACT_APP_ENABLE_HTTPS_ONLY: false,
    REACT_APP_IP_WHITELIST_ENABLED: false,
    REACT_APP_AUDIT_LOG_ENABLED: true,
    
    // Admin Features
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
      NOTIFICATION_CENTER: true,
      SYSTEM_HEALTH: true,
      ANALYTICS_DASHBOARD: true,
      ROLE_MANAGEMENT: true,
      API_KEYS_MANAGEMENT: false,
    },
    
    // Permissions System
    REACT_APP_PERMISSIONS: {
      SUPER_ADMIN: ['*'], // All permissions
      ADMIN: [
        'users.*',
        'trades.*',
        'kyc.*',
        'disputes.*',
        'reports.view',
        'settings.view',
      ],
      MODERATOR: [
        'users.view',
        'users.suspend',
        'trades.view',
        'trades.dispute',
        'kyc.view',
        'kyc.review',
        'disputes.*',
      ],
      SUPPORT: [
        'users.view',
        'trades.view',
        'kyc.view',
        'disputes.view',
        'disputes.reply',
      ],
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#1890ff',
      SUCCESS_COLOR: '#52c41a',
      WARNING_COLOR: '#faad14',
      ERROR_COLOR: '#ff4d4f',
      SIDEBAR_THEME: 'dark',
    },
    
    // Data Grid Configuration
    REACT_APP_DATA_GRID: {
      DEFAULT_PAGE_SIZE: 20,
      PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
      MAX_EXPORT_ROWS: 10000,
      ENABLE_VIRTUAL_SCROLLING: true,
      AUTO_REFRESH_INTERVAL: 30000, // 30 seconds
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: true,
    REACT_APP_SHOW_REDUX_DEVTOOLS: true,
    REACT_APP_ENABLE_LOGGER: true,
    REACT_APP_LOG_LEVEL: 'debug',
    REACT_APP_ENABLE_PERFORMANCE_MONITORING: false,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: '',
    REACT_APP_SENTRY_DSN: '',
    REACT_APP_HOTJAR_ID: '',
  },

  staging: {
    // API Configuration
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://api-staging.p2p-platform.com/api/v1',
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || 'wss://ws-staging.p2p-platform.com',
    
    // App Configuration
    REACT_APP_NAME: 'P2P Platform Admin (Staging)',
    REACT_APP_VERSION: '1.0.0-staging',
    REACT_APP_BUILD_NUMBER: process.env.REACT_APP_BUILD_NUMBER || '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'https://admin-staging.p2p-platform.com',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_admin_staging:auth',
    REACT_APP_SESSION_TIMEOUT: 2 * 60 * 60 * 1000, // 2 hours
    REACT_APP_REQUIRE_2FA: true,
    REACT_APP_SESSION_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    
    // Security
    REACT_APP_ENABLE_CSP: true,
    REACT_APP_ENABLE_HTTPS_ONLY: true,
    REACT_APP_IP_WHITELIST_ENABLED: false,
    REACT_APP_AUDIT_LOG_ENABLED: true,
    
    // Admin Features
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
      NOTIFICATION_CENTER: true,
      SYSTEM_HEALTH: true,
      ANALYTICS_DASHBOARD: true,
      ROLE_MANAGEMENT: true,
      API_KEYS_MANAGEMENT: false,
    },
    
    // Permissions System
    REACT_APP_PERMISSIONS: {
      SUPER_ADMIN: ['*'],
      ADMIN: [
        'users.*',
        'trades.*',
        'kyc.*',
        'disputes.*',
        'reports.view',
        'reports.export',
        'settings.view',
        'settings.edit',
      ],
      MODERATOR: [
        'users.view',
        'users.suspend',
        'trades.view',
        'trades.dispute',
        'kyc.view',
        'kyc.review',
        'disputes.*',
      ],
      SUPPORT: [
        'users.view',
        'trades.view',
        'kyc.view',
        'disputes.view',
        'disputes.reply',
      ],
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#1890ff',
      SUCCESS_COLOR: '#52c41a',
      WARNING_COLOR: '#faad14',
      ERROR_COLOR: '#ff4d4f',
      SIDEBAR_THEME: 'dark',
    },
    
    // Data Grid Configuration
    REACT_APP_DATA_GRID: {
      DEFAULT_PAGE_SIZE: 20,
      PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
      MAX_EXPORT_ROWS: 50000,
      ENABLE_VIRTUAL_SCROLLING: true,
      AUTO_REFRESH_INTERVAL: 60000, // 1 minute
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: false,
    REACT_APP_SHOW_REDUX_DEVTOOLS: false,
    REACT_APP_ENABLE_LOGGER: true,
    REACT_APP_LOG_LEVEL: 'info',
    REACT_APP_ENABLE_PERFORMANCE_MONITORING: true,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
    REACT_APP_SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || '',
    REACT_APP_HOTJAR_ID: process.env.REACT_APP_HOTJAR_ID || '',
  },

  production: {
    // API Configuration
    REACT_APP_API_URL: process.env.REACT_APP_API_URL || 'https://api.p2p-platform.com/api/v1',
    REACT_APP_WS_URL: process.env.REACT_APP_WS_URL || 'wss://ws.p2p-platform.com',
    
    // App Configuration
    REACT_APP_NAME: 'P2P Platform Admin',
    REACT_APP_VERSION: '1.0.0',
    REACT_APP_BUILD_NUMBER: process.env.REACT_APP_BUILD_NUMBER || '1',
    REACT_APP_URL: process.env.REACT_APP_URL || 'https://admin.p2p-platform.com',
    
    // Authentication
    REACT_APP_AUTH_STORAGE_KEY: '@p2p_platform_admin:auth',
    REACT_APP_SESSION_TIMEOUT: 1 * 60 * 60 * 1000, // 1 hour
    REACT_APP_REQUIRE_2FA: true,
    REACT_APP_SESSION_REFRESH_INTERVAL: 5 * 60 * 1000, // 5 minutes
    
    // Security
    REACT_APP_ENABLE_CSP: true,
    REACT_APP_ENABLE_HTTPS_ONLY: true,
    REACT_APP_IP_WHITELIST_ENABLED: true,
    REACT_APP_AUDIT_LOG_ENABLED: true,
    
    // Admin Features
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
      NOTIFICATION_CENTER: true,
      SYSTEM_HEALTH: true,
      ANALYTICS_DASHBOARD: true,
      ROLE_MANAGEMENT: true,
      API_KEYS_MANAGEMENT: true,
    },
    
    // Permissions System
    REACT_APP_PERMISSIONS: {
      SUPER_ADMIN: ['*'],
      ADMIN: [
        'users.*',
        'trades.*',
        'kyc.*',
        'disputes.*',
        'reports.*',
        'settings.*',
        'system.maintenance',
      ],
      MODERATOR: [
        'users.view',
        'users.suspend',
        'trades.view',
        'trades.dispute',
        'kyc.view',
        'kyc.review',
        'disputes.*',
      ],
      SUPPORT: [
        'users.view',
        'trades.view',
        'kyc.view',
        'disputes.view',
        'disputes.reply',
      ],
    },
    
    // UI Configuration
    REACT_APP_THEME: {
      DEFAULT_THEME: 'light',
      BRAND_COLOR: '#1890ff',
      SUCCESS_COLOR: '#52c41a',
      WARNING_COLOR: '#faad14',
      ERROR_COLOR: '#ff4d4f',
      SIDEBAR_THEME: 'dark',
    },
    
    // Data Grid Configuration
    REACT_APP_DATA_GRID: {
      DEFAULT_PAGE_SIZE: 50,
      PAGE_SIZE_OPTIONS: [20, 50, 100, 200],
      MAX_EXPORT_ROWS: 100000,
      ENABLE_VIRTUAL_SCROLLING: true,
      AUTO_REFRESH_INTERVAL: 120000, // 2 minutes
    },
    
    // Debugging
    REACT_APP_DEBUG_MODE: false,
    REACT_APP_SHOW_REDUX_DEVTOOLS: false,
    REACT_APP_ENABLE_LOGGER: false,
    REACT_APP_LOG_LEVEL: 'error',
    REACT_APP_ENABLE_PERFORMANCE_MONITORING: true,
    
    // External Services
    REACT_APP_GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GOOGLE_ANALYTICS_ID || '',
    REACT_APP_SENTRY_DSN: process.env.REACT_APP_SENTRY_DSN || '',
    REACT_APP_HOTJAR_ID: process.env.REACT_APP_HOTJAR_ID || '',
  },
};

// Constants that don't change between environments
const constants = {
  // API Configuration
  REACT_APP_API_TIMEOUT: 30000,
  REACT_APP_WS_TIMEOUT: 5000,
  REACT_APP_RETRY_ATTEMPTS: 3,
  
  // Cache Configuration
  REACT_APP_CACHE_PREFIX: 'p2p_admin_',
  REACT_APP_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  REACT_APP_LOCAL_STORAGE_PREFIX: 'p2p_admin_',
  
  // Data Refresh Intervals
  REACT_APP_REFRESH_INTERVALS: {
    DASHBOARD: 30000, // 30 seconds
    USER_LIST: 60000, // 1 minute
    TRADE_LIST: 30000, // 30 seconds
    KYC_QUEUE: 60000, // 1 minute
    DISPUTE_LIST: 30000, // 30 seconds
    SYSTEM_HEALTH: 15000, // 15 seconds
    REAL_TIME_STATS: 5000, // 5 seconds
  },
  
  // Export Formats
  REACT_APP_EXPORT_FORMATS: ['csv', 'excel', 'pdf'],
  
  // Date Ranges for Reports
  REACT_APP_REPORT_DATE_RANGES: [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: '7days' },
    { label: 'Last 30 days', value: '30days' },
    { label: 'This month', value: 'thisMonth' },
    { label: 'Last month', value: 'lastMonth' },
    { label: 'Custom range', value: 'custom' },
  ],
  
  // Notification Types
  REACT_APP_NOTIFICATION_TYPES: [
    'user_registered',
    'kyc_submitted',
    'trade_disputed',
    'high_value_trade',
    'suspicious_activity',
    'system_alert',
    'security_breach',
  ],
  
  // Admin Roles
  REACT_APP_ADMIN_ROLES: [
    { value: 'super_admin', label: 'Super Admin' },
    { value: 'admin', label: 'Admin' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'support', label: 'Support' },
  ],
  
  // User Status Options
  REACT_APP_USER_STATUSES: [
    { value: 'active', label: 'Active', color: 'green' },
    { value: 'suspended', label: 'Suspended', color: 'orange' },
    { value: 'banned', label: 'Banned', color: 'red' },
    { value: 'pending_verification', label: 'Pending Verification', color: 'blue' },
  ],
  
  // Trade Statuses
  REACT_APP_TRADE_STATUSES: [
    { value: 'pending', label: 'Pending', color: 'blue' },
    { value: 'paid', label: 'Paid', color: 'orange' },
    { value: 'confirmed', label: 'Confirmed', color: 'green' },
    { value: 'disputed', label: 'Disputed', color: 'red' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'gray' },
  ],
  
  // KYC Statuses
  REACT_APP_KYC_STATUSES: [
    { value: 'pending', label: 'Pending Review', color: 'blue' },
    { value: 'reviewing', label: 'Under Review', color: 'orange' },
    { value: 'approved', label: 'Approved', color: 'green' },
    { value: 'rejected', label: 'Rejected', color: 'red' },
    { value: 'requires_additional_info', label: 'Needs Info', color: 'purple' },
  ],
  
  // Chart Colors
  REACT_APP_CHART_COLORS: [
    '#1890ff',
    '#52c41a',
    '#faad14',
    '#ff4d4f',
    '#722ed1',
    '#fa8c16',
    '#a0d911',
    '#13c2c2',
    '#eb2f96',
    '#f5222d',
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
      throw new Error('Production admin cannot use localhost API URL');
    }
    
    if (!config.REACT_APP_ENABLE_HTTPS_ONLY) {
      throw new Error('HTTPS must be enforced in production for admin dashboard');
    }
    
    if (!config.REACT_APP_REQUIRE_2FA) {
      throw new Error('2FA must be required in production for admin dashboard');
    }
    
    if (config.REACT_APP_DEBUG_MODE) {
      console.warn('Debug mode should be disabled in production');
    }
    
    if (config.REACT_APP_SESSION_TIMEOUT > 2 * 60 * 60 * 1000) {
      console.warn('Session timeout is too long for production admin dashboard');
    }
  }
};

// Run validation
try {
  validateConfig();
} catch (error) {
  console.error('Admin Dashboard configuration validation failed:', error.message);
  if (config.IS_PROD) {
    throw error; // Fail hard in production
  }
}

// Log configuration in development
if (config.IS_DEV && config.REACT_APP_DEBUG_MODE) {
  console.log('Admin Dashboard Configuration:', {
    environment: NODE_ENV,
    apiUrl: config.REACT_APP_API_URL,
    wsUrl: config.REACT_APP_WS_URL,
    features: config.REACT_APP_FEATURES,
    permissions: config.REACT_APP_PERMISSIONS,
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
  REACT_APP_PERMISSIONS,
  REACT_APP_THEME,
  REACT_APP_DATA_GRID,
  REACT_APP_REFRESH_INTERVALS,
  REACT_APP_ADMIN_ROLES,
  REACT_APP_USER_STATUSES,
  REACT_APP_TRADE_STATUSES,
  REACT_APP_KYC_STATUSES,
  REACT_APP_REQUIRE_2FA,
  REACT_APP_SESSION_TIMEOUT,
  IS_DEV,
  IS_STAGING,
  IS_PROD,
  NODE_ENV,
} = config;


