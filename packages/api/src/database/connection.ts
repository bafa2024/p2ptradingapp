import { Sequelize } from 'sequelize';
import config from '../config';
import logger from '../utils/logger';

// Initialize Sequelize connection
let sequelize: Sequelize;

try {
  sequelize = new Sequelize(config.database);
  
  // Test the connection
  sequelize.authenticate()
    .then(() => {
      logger.info('✅ Sequelize database connection established successfully.');
    })
    .catch((err) => {
      logger.error('❌ Sequelize database connection failed:', err.message);
    });
} catch (error) {
  logger.error('❌ Failed to initialize Sequelize:', error);
}

// Export connections
export { sequelize };

// Initialize models and associations
export const initializeDatabase = async () => {
  try {
    // Import models to ensure they are registered
    await import('../models');
    
    // Sync database (in development, use force: false to avoid dropping tables)
    if (process.env['NODE_ENV'] === 'development') {
      await sequelize.sync({ force: false });
      logger.info('✅ Database synchronized in development mode');
    }
    
    logger.info('✅ Database initialization completed');
  } catch (error) {
    logger.error('❌ Database initialization failed:', error);
    throw error;
  }
};

// Graceful shutdown
export const closeDatabaseConnection = async () => {
  try {
    if (sequelize) {
      await sequelize.close();
      logger.info('✅ Database connection closed gracefully');
    }
  } catch (error) {
    logger.error('❌ Error closing database connection:', error);
  }
};

// Health check
export const checkDatabaseHealth = async () => {
  try {
    if (sequelize) {
      await sequelize.authenticate();
      return { status: 'healthy', message: 'Database connection is working' };
    }
    return { status: 'unhealthy', message: 'Database connection not initialized' };
  } catch (error) {
    return { status: 'unhealthy', message: `Database connection failed: ${(error as Error).message}` };
  }
};
