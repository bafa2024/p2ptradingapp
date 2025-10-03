#!/usr/bin/env node

/**
 * Root server entry point for App Platform deployment
 * This file starts the API service from the packages/api directory
 */

const { spawn, execSync } = require('child_process');
const path = require('path');

console.log('🚀 Starting P2P Platform API Server...');
console.log('📋 Environment:', process.env.NODE_ENV || 'production');

// Change to the API directory
process.chdir(path.join(__dirname, 'packages', 'api'));

// Build the API first
console.log('🔨 Building API...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ API build completed successfully');
} catch (error) {
  console.error('❌ API build failed:', error.message);
  process.exit(1);
}

// Start the API server
console.log('🚀 Starting API server...');
const apiProcess = spawn('npm', ['start'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down API server...');
  apiProcess.kill('SIGINT');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down API server...');
  apiProcess.kill('SIGTERM');
  process.exit(0);
});

apiProcess.on('close', (code) => {
  console.log(`API server process exited with code ${code}`);
  process.exit(code);
});

apiProcess.on('error', (err) => {
  console.error('Failed to start API server:', err);
  process.exit(1);
});
