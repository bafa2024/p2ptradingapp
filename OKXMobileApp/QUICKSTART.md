# IQX P2P Trading Mobile App - Quick Start Guide

## 🚀 Quick Start Commands

### 1. Install Dependencies
```bash
cd "c:\xampp\htdocs\okx platform\OKXMobileApp"
npm install
```

### 2. Start Development Server
```bash
# Option 1: Using npx (recommended)
npx expo start

# Option 2: Using npm script
npm start
```

### 3. Run on Specific Platform
```bash
# Android
npx expo start --android

# iOS (macOS only)
npx expo start --ios

# Web
npx expo start --web
```

### 4. Clear Cache (if needed)
```bash
npx expo start --clear
```

## 📱 Testing on Device

1. **Install Expo Go**:
   - [Android Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)

2. **Scan QR Code**: Use Expo Go app to scan the QR code from terminal/browser

3. **Network Requirements**: Ensure your mobile device and computer are on the same WiFi network

## 🏗 Build Commands

### Development Build
```bash
# Create development build
npx expo install expo-dev-client
npx expo run:android
npx expo run:ios
```

### Production Build with EAS
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure project
eas build:configure

# Build for Android
eas build --platform android

# Build for iOS  
eas build --platform ios

# Build for both platforms
eas build --platform all
```

## 📂 Project Status

✅ **Completed Features:**
- React Native project structure
- Navigation system (Stack + Bottom Tabs)
- Home screen with P2P trading interface
- Trade screen for transaction processing
- Dark theme design system
- Mobile-optimized UI components
- Expo configuration for Android/iOS

🔄 **In Progress:**
- Real-time data integration
- Additional screen implementations
- API connectivity

📋 **Next Steps:**
1. Test on physical devices
2. Implement remaining screens (Orders, Wallet, Profile)
3. Add API integration
4. Implement real-time updates
5. Add authentication
6. Production build setup

## 🐛 Troubleshooting

### Common Issues:
```bash
# Clear cache and restart
npx expo start --clear

# Reset npm modules
rm -rf node_modules package-lock.json
npm install

# Check Expo CLI version
npx expo --version
```

### Port Issues:
- Default Metro port: 8081
- Default Expo DevTools: 19002
- Change ports: `npx expo start --port 8082`

## 📞 Development Status

The React Native mobile app is **ready for testing** and includes:

- ✅ Complete project setup
- ✅ Navigation structure
- ✅ Main trading interface
- ✅ Trade execution flow
- ✅ Mobile-optimized design
- ✅ Cross-platform compatibility
- ✅ Expo configuration

**Ready to test on Android and iOS devices!**
