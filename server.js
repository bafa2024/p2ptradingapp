#!/usr/bin/env node

/**
 * IQX P2P Trading Backend Server
 * Entry point for DigitalOcean App Platform deployment
 */

require("dotenv").config();
const express = require("express");
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();

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

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Shutting down server...');
  process.exit(0);
});

// ✅ Dynamic port for DO App Platform
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
