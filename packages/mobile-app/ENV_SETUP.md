# Mobile App Environment Configuration

This document describes the environment configuration setup for the React Native mobile application.

## Configuration Architecture

The mobile app uses a JavaScript configuration file (`config.js`) instead of traditional environment variables due to React Native limitations. The configuration supports multiple environments and feature flags.

## Environment Types

### Development
- Local API endpoints
- Debug features enabled
- Relaxed security settings
- Detailed logging
- No analytics tracking

### Staging
- Staging server endpoints
- Production-like features
- Moderate security
- Remote logging enabled
- Analytics enabled for testing

### Production
- Production server endpoints
- Full security features
- Optimized performance
- Error-only logging
- Full analytics and crash reporting

## Configuration Structure

### API Configuration
```javascript
{
  API_URL: 'https://api.p2p-platform.com/api/v1',
  WS_URL: 'wss://ws.p2p-platform.com',
  WEB_APP_URL: 'https://app.p2p-platform.com',
}
```

### App Configuration
```javascript
{
  APP_NAME: 'P2P Platform',
  APP_VERSION: '1.0.0',
  APP_BUILD_NUMBER: 1,
}
```

### Feature Flags
```javascript
FEATURES: {
  BIOMETRIC_AUTH: true,
  PUSH_NOTIFICATIONS: true,
  OFFLINE_MODE: true,
  ANALYTICS: true,
  CRASH_REPORTING: true,
  DEV_MENU: false,
  DEBUG_MODE: false,
}
```

### Security Configuration
```javascript
SECURITY: {
  CERTIFICATE_PINNING: true,
  JAILBREAK_DETECTION: true,
  ROOT_DETECTION: true,
  SCREENSHOT_PROTECTION: true,
}
```

### Firebase Configuration
```javascript
FIREBASE_CONFIG: {
  apiKey: 'your-api-key',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: '123456789',
  appId: 'your-app-id',
}
```

## Environment Setup

### For Expo Development

1. **Set environment in app.json/app.config.js:**
   ```json
   {
     "expo": {
       "extra": {
         "environment": "development"
       }
     }
   }
   ```

2. **Using expo-constants:**
   ```javascript
   import Constants from 'expo-constants';
   const ENV = Constants.expoConfig?.extra?.environment || 'development';
   ```

### For React Native CLI

1. **Set environment variable:**
   ```bash
   # Development
   export REACT_NATIVE_ENV=development
   
   # Production
   export REACT_NATIVE_ENV=production
   ```

2. **Use in config.js:**
   ```javascript
   const ENV = process.env.REACT_NATIVE_ENV || 'development';
   ```

### Build-Time Configuration

#### For Development Builds
```bash
# Expo
expo start --dev-client

# React Native CLI
npx react-native run-ios --mode Debug
npx react-native run-android --variant debug
```

#### For Production Builds
```bash
# Expo
expo build:ios --release-channel production
expo build:android --release-channel production

# React Native CLI
npx react-native run-ios --mode Release
npx react-native run-android --variant release
```

## Configuration Usage

### Importing Configuration
```javascript
import config from './config';
// or
import { API_URL, FEATURES, IS_DEV } from './config';
```

### Using in Components
```javascript
import { API_URL, FEATURES } from '../config';

const ApiService = {
  baseURL: API_URL,
  timeout: 30000,
};

const MyComponent = () => {
  if (FEATURES.DEBUG_MODE) {
    console.log('Debug mode enabled');
  }
  
  return (
    <View>
      {FEATURES.DEV_MENU && <DevMenu />}
    </View>
  );
};
```

### Conditional Features
```javascript
import { FEATURES, IS_PROD } from '../config';

// Feature flags
if (FEATURES.BIOMETRIC_AUTH) {
  // Enable biometric authentication
}

if (FEATURES.ANALYTICS && IS_PROD) {
  // Enable analytics in production
}

// Environment-specific behavior
if (IS_DEV) {
  // Development-only features
} else if (IS_PROD) {
  // Production-only features
}
```

## Storage Keys

The app uses consistent storage keys across environments:

```javascript
STORAGE_KEYS: {
  USER_PREFERENCES: '@p2p_platform:preferences',
  THEME: '@p2p_platform:theme',
  LANGUAGE: '@p2p_platform:language',
  CURRENCY: '@p2p_platform:currency',
  ONBOARDING_COMPLETE: '@p2p_platform:onboarding_complete',
  BIOMETRIC_ENABLED: '@p2p_platform:biometric_enabled',
  NOTIFICATION_SETTINGS: '@p2p_platform:notification_settings',
}
```

## WebView Integration

The mobile app integrates with web views for certain features:

```javascript
WEBVIEW_ROUTES: {
  TERMS_OF_SERVICE: '/terms',
  PRIVACY_POLICY: '/privacy',
  HELP_CENTER: '/help',
  FAQ: '/faq',
  CONTACT_US: '/contact',
  TRADE_GUIDE: '/guide/trading',
  SECURITY_GUIDE: '/guide/security',
}
```

Usage:
```javascript
import { WEB_APP_URL, WEBVIEW_ROUTES } from '../config';

const termsUrl = `${WEB_APP_URL}${WEBVIEW_ROUTES.TERMS_OF_SERVICE}`;
```

## Security Considerations

### Development Environment
- Certificate pinning disabled for local development
- Debug mode enabled
- Detailed logging
- No jailbreak/root detection

### Production Environment
- Certificate pinning enabled
- All security features enabled
- Minimal logging
- Jailbreak/root detection active
- Screenshot protection enabled

### Best Practices
1. **Never expose sensitive data in configuration**
2. **Use feature flags to control functionality**
3. **Validate configuration on app startup**
4. **Use different Firebase projects for different environments**
5. **Enable proper security measures in production**

## Troubleshooting

### Common Issues

1. **API connection errors**
   - Check API_URL configuration
   - Verify network connectivity
   - Ensure CORS settings on server

2. **Firebase configuration errors**
   - Verify Firebase configuration object
   - Check if google-services.json/GoogleService-Info.plist is properly configured
   - Ensure Firebase project matches environment

3. **Build failures**
   - Ensure environment is properly set
   - Check for missing dependencies
   - Verify app.json/app.config.js configuration

4. **Feature flags not working**
   - Check feature flag configuration
   - Verify conditional logic in components
   - Ensure configuration is properly imported

### Debug Tools

#### Development Debug Panel
```javascript
if (FEATURES.DEV_MENU) {
  // Show debug information
  console.log('Current config:', config);
}
```

#### Configuration Validation
```javascript
// The config automatically validates required fields
// Check console for validation errors
```

#### Network Debugging
```javascript
if (IS_DEV) {
  // Enable network debugging
  global.XMLHttpRequest = require('react-native/Libraries/Network/XMLHttpRequest');
}
```

## Performance Optimization

### Cache Configuration
```javascript
CACHE: {
  IMAGE_CACHE_SIZE: 200 * 1024 * 1024, // 200MB
  DATA_CACHE_TTL: 30 * 60 * 1000, // 30 minutes
}
```

### Bundle Size Optimization
- Use conditional imports based on feature flags
- Remove debug code in production builds
- Optimize asset loading based on environment

### Memory Management
- Adjust cache sizes based on device capabilities
- Use different limits for different environments
- Monitor memory usage in production

## Deployment

### Environment-Specific Builds

1. **Development Builds**
   - Use development configuration
   - Enable all debug features
   - Connect to local/development servers

2. **Staging Builds**
   - Use staging configuration
   - Enable testing features
   - Connect to staging servers

3. **Production Builds**
   - Use production configuration
   - Disable debug features
   - Enable all security measures
   - Connect to production servers

### CI/CD Integration

```yaml
# Example GitHub Actions
- name: Build for staging
  run: |
    export REACT_NATIVE_ENV=staging
    npx react-native run-android --variant release

- name: Build for production
  run: |
    export REACT_NATIVE_ENV=production
    npx react-native run-android --variant release
```


