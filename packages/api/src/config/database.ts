import { Sequelize } from 'sequelize';
import logger from '../utils/logger';

// Database configuration interface
interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql' | 'postgres' | 'sqlite' | 'mariadb';
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
  logging: boolean | ((sql: string) => void);
}

// Parse environment variables with defaults
const parseNumber = (value: string | undefined, defaultValue: number): number => {
  if (!value) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

const parseBoolean = (value: string | undefined, defaultValue: boolean = false): boolean => {
  if (!value) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
};

// Get environment variables
const nodeEnv = process.env['NODE_ENV'] || 'development';

// Database configuration
const databaseConfig: DatabaseConfig = {
  host: process.env['DB_HOST'] || 'localhost',
  port: parseNumber(process.env['DB_PORT'], 3306),
  username: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'okx_platform',
  dialect: (process.env['DB_DIALECT'] as 'mysql' | 'postgres' | 'sqlite' | 'mariadb') || 'mysql',
  pool: {
    max: parseNumber(process.env['DB_POOL_MAX'], 10),
    min: parseNumber(process.env['DB_POOL_MIN'], 0),
    acquire: parseNumber(process.env['DB_POOL_ACQUIRE'], 30000),
    idle: parseNumber(process.env['DB_POOL_IDLE'], 10000),
  },
  logging: nodeEnv === 'development' ? console.log : false,
};

// Create Sequelize instance
const sequelize = new Sequelize(databaseConfig);

// Test database connection
export const testDatabaseConnection = async (): Promise<boolean> => {
  try {
    console.log('🔍 Testing Sequelize database connection...');
    console.log('📋 Configuration:', {
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password ? '***' : '(empty)',
      database: databaseConfig.database,
      dialect: databaseConfig.dialect,
    });

    // Test the connection
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    logger.info('✅ Sequelize database connection established successfully.');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    logger.error('❌ Sequelize database connection failed:', error);
    
    // Provide helpful troubleshooting tips
    if (error instanceof Error) {
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('  1. Make sure your database server is running');
        console.log('  2. Check if the database is running on the correct port');
        console.log('  3. Verify the host and port in your .env file');
      } else if (error.message.includes('Access denied')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('  1. Check database username and password');
        console.log('  2. Verify credentials in your .env file');
        console.log('  3. Make sure the user has access to the database');
      } else if (error.message.includes('Unknown database')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('  1. Create the database first');
        console.log('  2. Check the database name in your .env file');
        console.log('  3. Run: CREATE DATABASE okx_platform;');
      }
    }
    
    return false;
  }
};

// Export the Sequelize instance and configuration
export { sequelize, databaseConfig };
export default sequelize;


