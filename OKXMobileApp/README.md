# IQX P2P Trading Mobile App

A React Native mobile application for P2P cryptocurrency trading, built with Expo and designed for both Android and iOS platforms.

## 🚀 Features

- **P2P Trading Interface**: Buy and sell cryptocurrencies with other users
- **Multi-Currency Support**: Support for USDT, BTC, ETH, LTC
- **Payment Methods**: Multiple Iraqi payment methods (Zain Cash, Fast Pay, FIB, Al-Rafdin, etc.)
- **Real-time Trading**: Live merchant listings and price updates
- **Mobile-First Design**: Optimized for mobile devices with responsive UI
- **Dark Theme**: Modern dark theme matching the web platform
- **Cross-Platform**: Runs on both Android and iOS

## 📱 Screens

- **Home Screen**: Main P2P trading interface with merchant listings
- **Trade Screen**: Detailed trading interface for completing transactions
- **Orders Screen**: Track active and completed orders
- **Wallet Screen**: Manage cryptocurrency wallets
- **Profile Screen**: User profile and settings

## 🛠 Tech Stack

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Navigation and routing
- **Expo Vector Icons**: Icon library
- **React Native Gesture Handler**: Touch gesture support
- **Expo Linear Gradient**: Gradient components

## 📦 Installation

1. **Prerequisites**:
   - Node.js (v16 or later)
   - npm or yarn
   - Expo CLI: `npm install -g @expo/cli`

2. **Clone and Install**:
   ```bash
   cd "c:\xampp\htdocs\okx platform\OKXMobileApp"
   npm install
   ```

3. **Install Expo CLI** (if not already installed):
   ```bash
   npm install -g @expo/cli
   ```

## 🚀 Running the App

### Development Server
```bash
# Start the Expo development server
npm start
```
or
```bash
expo start
```

### Platform-specific Commands
```bash
# Run on Android
npm run android

# Run on iOS (macOS required)
npm run ios

# Run on Web
npm run web
```

## 📱 Testing on Devices

1. **Install Expo Go** on your mobile device:
   - [Android: Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS: App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Scan QR Code**: Use Expo Go to scan the QR code from the development server

3. **Testing Features**:
   - Browse merchant listings
   - Navigate between screens
   - Test buy/sell flows
   - Verify responsive design

## 🏗 Project Structure

```
OKXMobileApp/
├── src/
│   ├── components/          # Reusable UI components
│   ├── screens/            # App screens
│   │   ├── HomeScreen.js   # Main P2P trading interface
│   │   └── TradeScreen.js  # Trade execution screen
│   ├── navigation/         # Navigation configuration
│   │   └── AppNavigator.js # Main app navigation
│   ├── constants/          # App constants
│   │   ├── Colors.js       # Color palette
│   │   ├── Layout.js       # Layout constants
│   │   └── Typography.js   # Typography settings
│   └── styles/            # Global styles
│       └── GlobalStyles.js # Shared style definitions
├── assets/                # Static assets
├── App.js                # Main app entry point
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## 🎨 Design System

The app uses a consistent design system based on the web platform:

- **Colors**: Dark theme with blue accent colors
- **Typography**: Consistent font sizes and weights
- **Spacing**: Standardized spacing system
- **Components**: Reusable UI components

## 📋 Development Guidelines

1. **Code Style**: Follow React Native best practices
2. **Components**: Create reusable components in `src/components/`
3. **Screens**: Add new screens to `src/screens/`
4. **Navigation**: Update navigation in `src/navigation/AppNavigator.js`
5. **Styling**: Use global styles and constants for consistency

## 🔧 Configuration

### Expo Configuration (app.json)
- App name and bundle identifiers
- Platform-specific settings
- Build configuration

### Package Dependencies
- Navigation libraries
- UI component libraries
- Platform-specific packages

## 📱 Building for Production

### Android APK
```bash
expo build:android
```

### iOS App
```bash
expo build:ios
```

### Expo Application Services (EAS)
```bash
npm install -g eas-cli
eas build --platform android
eas build --platform ios
```

## 🌐 Platform Integration

This mobile app is designed to work with the existing web platform:

- **Shared Design**: Consistent UI/UX with the web version
- **API Integration**: Ready for backend API integration
- **Data Sync**: Prepared for real-time data synchronization

## 🚨 Troubleshooting

### Common Issues:
1. **Metro bundler issues**: Clear cache with `expo start --clear`
2. **Dependency conflicts**: Delete `node_modules` and run `npm install`
3. **Platform-specific issues**: Check Expo documentation

### Performance Tips:
- Use FlatList for large data sets
- Optimize images and assets
- Implement proper navigation structure
- Use React.memo for performance-critical components

## 📈 Next Steps

1. **API Integration**: Connect to backend services
2. **Real-time Updates**: Implement WebSocket connections
3. **Push Notifications**: Add notification support
4. **Biometric Authentication**: Add security features
5. **Offline Support**: Implement offline capabilities
6. **Testing**: Add comprehensive testing suite

## 📞 Support

For development support or issues:
- Check Expo documentation: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- React Native documentation: https://reactnative.dev/

---

Built with ❤️ using React Native and Expo
