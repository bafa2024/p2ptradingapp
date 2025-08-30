// Test configuration for the API
export const testConfig = {
  // Database
  database: {
    host: 'localhost',
    port: 3306,
    username: 'test_user',
    password: 'test_password',
    database: 'okx_platform_test',
    dialect: 'mysql' as const,
  },

  // JWT
  jwt: {
    accessSecret: 'test-access-secret-key',
    refreshSecret: 'test-refresh-secret-key',
    accessExpiresIn: '15m',
    refreshExpiresIn: '7d',
  },

  // Firebase (mock)
  firebase: {
    projectId: 'test-project-id',
    privateKey: 'test-private-key',
    clientEmail: 'test@test.com',
  },

  // SMTP (mock)
  smtp: {
    host: 'smtp.test.com',
    port: 587,
    user: 'test@test.com',
    pass: 'test-password',
  },

  // Test data
  testUser: {
    email: 'test@example.com',
    password: 'TestPassword123!',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '+9647501234567',
  },

  testAdmin: {
    email: 'admin@example.com',
    password: 'AdminPassword123!',
    first_name: 'Admin',
    last_name: 'User',
    role: 'admin',
  },
};

// Add a test to satisfy Jest requirements
describe('Test Configuration', () => {
  it('should have valid configuration', () => {
    expect(testConfig.database.host).toBe('localhost');
    expect(testConfig.jwt.accessSecret).toBeDefined();
  });
});

// Environment variables for testing
export const setupTestEnv = () => {
  process.env['NODE_ENV'] = 'test';
  process.env['API_PORT'] = '3001';
  process.env['DB_HOST'] = testConfig.database.host;
  process.env['DB_PORT'] = testConfig.database.port.toString();
  process.env['DB_USERNAME'] = testConfig.database.username;
  process.env['DB_PASSWORD'] = testConfig.database.password;
  process.env['DB_NAME'] = testConfig.database.database;
  process.env['JWT_ACCESS_SECRET'] = testConfig.jwt.accessSecret;
  process.env['JWT_REFRESH_SECRET'] = testConfig.jwt.refreshSecret;
  process.env['JWT_ACCESS_EXPIRES_IN'] = testConfig.jwt.accessExpiresIn;
  process.env['JWT_REFRESH_EXPIRES_IN'] = testConfig.jwt.refreshExpiresIn;
  process.env['SMTP_HOST'] = testConfig.smtp.host;
  process.env['SMTP_PORT'] = testConfig.smtp.port.toString();
  process.env['SMTP_USER'] = testConfig.smtp.user;
  process.env['SMTP_PASS'] = testConfig.smtp.pass;
  process.env['EMAIL_FROM_NAME'] = 'OKX Platform Test';
  process.env['CORS_ORIGIN'] = 'http://localhost:3000';
  process.env['RATE_LIMIT_WINDOW_MS'] = '900000';
  process.env['RATE_LIMIT_MAX_REQUESTS'] = '100';
  process.env['APP_VERSION'] = '1.0.0-test';
};
