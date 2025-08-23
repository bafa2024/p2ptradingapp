// Sequelize Configuration for OKX Platform
// This file contains database connection settings for Sequelize ORM

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'okx_platform_dev',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: console.log,
    timezone: '+00:00',
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'okx_platform_test',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00',
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
    timezone: '+00:00',
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      charset: 'utf8mb4',
      collate: 'utf8mb4_unicode_ci'
    },
    pool: {
      max: 10,
      min: 2,
      acquire: 30000,
      idle: 10000
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
