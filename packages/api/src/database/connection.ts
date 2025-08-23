import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env['DB_HOST'] || 'localhost',
  port: parseInt(process.env['DB_PORT'] || '3306'),
  username: process.env['DB_USER'] || 'root',
  password: process.env['DB_PASSWORD'] || '',
  database: process.env['DB_NAME'] || 'p2p_platform',
  logging: process.env['NODE_ENV'] === 'development' ? console.log : false,
  pool: {
    max: parseInt(process.env['DB_POOL_MAX'] || '10'),
    min: parseInt(process.env['DB_POOL_MIN'] || '0'),
    acquire: parseInt(process.env['DB_POOL_ACQUIRE'] || '30000'),
    idle: parseInt(process.env['DB_POOL_IDLE'] || '10000'),
  },
  define: {
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  // Additional MySQL options for better compatibility
  dialectOptions: {
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  // Timezone configuration
  timezone: '+00:00',
});

export default sequelize;
