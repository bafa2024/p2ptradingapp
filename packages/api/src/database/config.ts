import 'dotenv/config';

export default {
  development: {
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'okx_platform',
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    dialect: 'mysql',
    logging: false,
    dialectOptions: { decimalNumbers: true },
    define: { charset: 'utf8mb4', collate: 'utf8mb4_unicode_ci' }
  }
};
