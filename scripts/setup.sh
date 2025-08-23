#!/bin/bash

# =============================================================================
# P2P Crypto Trading Platform Setup Script
# =============================================================================

set -e

echo "🚀 Setting up P2P Crypto Trading Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm -v)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Bootstrap Lerna packages
echo "🔧 Bootstrapping Lerna packages..."
npm run bootstrap

# Create environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp env.example .env
    echo "⚠️  Please edit .env file with your configuration before continuing."
    echo "   Press Enter when you're ready to continue..."
    read
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p temp

# Set permissions
echo "🔐 Setting file permissions..."
chmod +x scripts/*.sh

# Build shared package first
echo "🏗️  Building shared package..."
cd packages/shared
npm run build
cd ../..

# Build API package
echo "🏗️  Building API package..."
cd packages/api
npm run build
cd ../..

echo "✅ Setup completed successfully!"
echo ""
echo "🎯 Next steps:"
echo "1. Edit .env file with your configuration"
echo "2. Start development servers: npm run dev"
echo "3. Or start individual packages:"
echo "   - API: npm run start:api"
echo "   - Mobile: npm run start:mobile"
echo "   - Web: npm run start:web"
echo "   - Admin: npm run start:admin"
echo ""
echo "📚 Check README.md for more information"
echo "🆘 For help, check the docs/ folder or create an issue"
