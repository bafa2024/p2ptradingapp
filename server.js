#!/usr/bin/env node

/**
 * IQX P2P Trading Backend Server
 * Entry point for DigitalOcean App Platform deployment
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    service: 'IQX P2P Backend'
  });
});

// API routes placeholder
app.get('/api', (req, res) => {
  res.json({ 
    message: 'IQX P2P Trading Backend API',
    version: '12.2.0',
    status: 'running'
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log('🚀 IQX P2P Backend Server Started');
  console.log(`📋 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🌐 Server listening on 0.0.0.0:${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});
