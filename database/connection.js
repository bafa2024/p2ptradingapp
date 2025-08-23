// Database Connection for OKX Platform
// This file handles both Firebase and Sequelize database connections

const { Sequelize } = require('sequelize');
const config = require('../sequelize-config');

// Sequelize connection
let sequelize;
try {
  const env = process.env.NODE_ENV || 'development';
  sequelize = new Sequelize(config[env]);
  
  // Test the connection
  sequelize.authenticate()
    .then(() => {
      console.log('✅ Sequelize database connection established successfully.');
    })
    .catch(err => {
      console.error('❌ Sequelize database connection failed:', err.message);
    });
} catch (error) {
  console.error('❌ Failed to initialize Sequelize:', error.message);
}

// Export both connections
module.exports = {
  sequelize,
  // Keep Firebase connection for backward compatibility
  firebase: require('./firebase-connection')
};
