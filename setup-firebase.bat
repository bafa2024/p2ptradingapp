@echo off
echo ========================================
echo OKX Platform - Firebase Setup Script
echo ========================================
echo.

echo Installing Firebase CLI globally...
npm install -g firebase-tools

echo.
echo Please login to Firebase...
firebase login

echo.
echo Initializing Firebase project...
firebase init

echo.
echo Installing dependencies for Firebase Functions...
cd firebase-functions
npm install
cd ..

echo.
echo Installing Firebase dependencies for Mobile App...
cd mobile-app
npm install firebase @react-native-async-storage/async-storage
cd ..

echo.
echo Installing Firebase dependencies for Web App...
cd web-app
npm install firebase
cd ..

echo.
echo Installing Firebase dependencies for Admin Dashboard...
cd admin-dashboard
npm install firebase
cd ..

echo.
echo Installing Firebase Admin for Backend API...
cd api
npm install firebase-admin
cd ..

echo.
echo ========================================
echo Firebase setup completed!
echo ========================================
echo.
echo Next steps:
echo 1. Update configuration files with your Firebase project details
echo 2. Deploy Firestore security rules
echo 3. Deploy Cloud Functions
echo 4. Test the setup
echo.
echo See FIREBASE_SETUP_GUIDE.md for detailed instructions
echo.
pause
