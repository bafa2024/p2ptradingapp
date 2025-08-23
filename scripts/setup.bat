@echo off
REM =============================================================================
REM P2P Crypto Trading Platform Setup Script (Windows)
REM =============================================================================

echo 🚀 Setting up P2P Crypto Trading Platform...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    pause
    exit /b 1
)

REM Check Node.js version
for /f "tokens=1,2 delims=." %%a in ('node --version') do set NODE_VERSION=%%a
set NODE_VERSION=%NODE_VERSION:~1%
if %NODE_VERSION% lss 18 (
    echo ❌ Node.js version 18+ is required. Current version: 
    node --version
    pause
    exit /b 1
)

echo ✅ Node.js version: 
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed. Please install npm first.
    pause
    exit /b 1
)

echo ✅ npm version: 
npm --version

REM Install root dependencies
echo 📦 Installing root dependencies...
npm install

REM Bootstrap Lerna packages
echo 🔧 Bootstrapping Lerna packages...
npm run bootstrap

REM Create environment file if it doesn't exist
if not exist .env (
    echo 📝 Creating .env file from template...
    copy env.example .env
    echo ⚠️  Please edit .env file with your configuration before continuing.
    echo    Press any key when you're ready to continue...
    pause >nul
)

REM Create necessary directories
echo 📁 Creating necessary directories...
if not exist logs mkdir logs
if not exist uploads mkdir uploads
if not exist temp mkdir temp

REM Build shared package first
echo 🏗️  Building shared package...
cd packages\shared
npm run build
cd ..\..

REM Build API package
echo 🏗️  Building API package...
cd packages\api
npm run build
cd ..\..

echo ✅ Setup completed successfully!
echo.
echo 🎯 Next steps:
echo 1. Edit .env file with your configuration
echo 2. Start development servers: npm run dev
echo 3. Or start individual packages:
echo    - API: npm run start:api
echo    - Mobile: npm run start:mobile
echo    - Web: npm run start:web
echo    - Admin: npm run start:admin
echo.
echo 📚 Check README.md for more information
echo 🆘 For help, check the docs/ folder or create an issue
pause
