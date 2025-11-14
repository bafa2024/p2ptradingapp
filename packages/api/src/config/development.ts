// Simple development configuration for testing
export const devConfig = {
  app: {
    name: 'P2P Platform API (Dev)',
    version: '1.0.0',
    port: 3000,
    host: 'localhost',
    environment: 'development' as const,
  },
  
  database: {
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'okx_platform_dev',
    dialect: 'mysql' as const,
    logging: false,
  },
  
  jwt: {
    secret: 'dev-jwt-secret-not-for-production',
    expiresIn: '24h',
  },
  
  security: {
    corsOrigin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
  },
  
  debug: {
    enabled: true,
    enableSwagger: true,
  },
};


