# Testing Guide for OKX Platform API

This guide covers how to test the OTP service and the overall application using different testing approaches.

## 🧪 Testing Overview

The application uses a multi-layered testing approach:
- **Unit Tests**: Test individual functions and methods
- **Integration Tests**: Test API endpoints and service interactions
- **End-to-End Tests**: Test complete user workflows
- **Manual Testing**: Test with real API calls

## 📋 Prerequisites

Before running tests, ensure you have:

1. **Node.js** (v16 or higher)
2. **MySQL** database running
3. **Dependencies** installed (`npm install`)
4. **Environment variables** configured

## 🚀 Running Tests

### 1. Run All Tests
```bash
npm test
```

### 2. Run Specific Test Files
```bash
# Test OTP service only
npm test -- src/__tests__/otp.service.test.ts

# Test OTP API endpoints only
npm test -- src/__tests__/otp.api.test.ts

# Test authentication only
npm test -- src/__tests__/auth.controller.test.ts
```

### 3. Run Tests in Watch Mode
```bash
npm run test:watch
```

### 4. Run Tests with Coverage
```bash
npm run test:coverage
```

### 5. Run Tests Verbosely
```bash
npm test -- --verbose
```

## 🔧 Test Configuration

### Environment Variables
Tests use a separate test configuration (`src/__tests__/test.config.ts`):

```typescript
export const testConfig = {
  database: {
    host: 'localhost',
    port: 3306,
    username: 'test_user',
    password: 'test_password',
    database: 'okx_platform_test',
  },
  jwt: {
    accessSecret: 'test-access-secret-key',
    refreshSecret: 'test-refresh-secret-key',
  },
  // ... more config
};
```

### Test Database Setup
1. Create a test database:
```sql
CREATE DATABASE okx_platform_test;
CREATE USER 'test_user'@'localhost' IDENTIFIED BY 'test_password';
GRANT ALL PRIVILEGES ON okx_platform_test.* TO 'test_user'@'localhost';
FLUSH PRIVILEGES;
```

2. Run migrations on test database:
```bash
NODE_ENV=test npm run migrate
```

## 📝 Test Structure

### Unit Tests (`otp.service.test.ts`)
Tests individual OTP service methods:
- `generateOTP()` - OTP generation and validation
- `sendOTP()` - Email sending functionality
- `verifyOTP()` - OTP verification logic
- `resendOTP()` - Rate limiting and resend logic
- `getOTPStatus()` - Status retrieval
- `getStats()` - Statistics calculation

### Integration Tests (`otp.api.test.ts`)
Tests complete API endpoints:
- `POST /api/v1/otp/send` - Send OTP
- `POST /api/v1/otp/verify` - Verify OTP
- `POST /api/v1/otp/resend` - Resend OTP
- `GET /api/v1/otp/status/:email` - Get OTP status
- `GET /api/v1/otp/stats` - Get statistics

## 🧪 Manual Testing

### 1. Start the Development Server
```bash
npm run dev
```

### 2. Test OTP Endpoints with cURL

#### Send OTP
```bash
curl -X POST http://localhost:3000/api/v1/otp/send \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

#### Verify OTP
```bash
curl -X POST http://localhost:3000/api/v1/otp/verify \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "otp": "123456"}'
```

#### Resend OTP
```bash
curl -X POST http://localhost:3000/api/v1/otp/resend \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

#### Get OTP Status
```bash
curl http://localhost:3000/api/v1/otp/status/test@example.com
```

#### Get OTP Statistics
```bash
curl http://localhost:3000/api/v1/otp/stats
```

### 3. Test with Postman

Import this collection into Postman:

```json
{
  "info": {
    "name": "OKX Platform OTP API",
    "description": "Test OTP endpoints"
  },
  "item": [
    {
      "name": "Send OTP",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/v1/otp/send",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\"}"
        }
      }
    },
    {
      "name": "Verify OTP",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/v1/otp/verify",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\"email\": \"test@example.com\", \"otp\": \"123456\"}"
        }
      }
    }
  ]
}
```

## 🔍 Testing Scenarios

### 1. Happy Path Testing
- ✅ Valid email sends OTP successfully
- ✅ Valid OTP verifies email successfully
- ✅ OTP resend works after waiting period
- ✅ Status and stats endpoints return correct data

### 2. Error Handling Testing
- ❌ Invalid email format returns 400
- ❌ Missing required fields return 400
- ❌ Invalid OTP returns error message
- ❌ Expired OTP returns error
- ❌ Rate limiting prevents abuse

### 3. Edge Case Testing
- 🔄 Multiple OTP requests (rate limiting)
- 🔄 OTP expiration handling
- 🔄 Failed verification attempts
- 🔄 Non-existent user handling

## 🐛 Debugging Tests

### 1. Enable Debug Logging
```bash
DEBUG=* npm test
```

### 2. Run Single Test
```bash
npm test -- --testNamePattern="should generate OTP for valid user"
```

### 3. Check Test Coverage
```bash
npm run test:coverage
open coverage/lcov-report/index.html
```

### 4. Debug with Console Logs
```typescript
describe('OTPService', () => {
  it('should generate OTP for valid user', async () => {
    console.log('Starting test...');
    const result = await otpService.generateOTP('test@example.com');
    console.log('Result:', result);
    expect(result.otp).toMatch(/^\d{6}$/);
  });
});
```

## 📊 Test Metrics

### Coverage Goals
- **Statements**: 90%+
- **Branches**: 85%+
- **Functions**: 90%+
- **Lines**: 90%+

### Performance Goals
- **Unit Tests**: < 100ms per test
- **Integration Tests**: < 500ms per test
- **Full Test Suite**: < 30 seconds

## 🚨 Common Issues

### 1. Database Connection Errors
```bash
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**: Ensure MySQL is running and test database exists

### 2. Environment Variable Issues
```bash
Error: JWT_ACCESS_SECRET is not defined
```
**Solution**: Check test configuration and environment setup

### 3. Mock Issues
```bash
Error: Cannot read property 'mockResolvedValue' of undefined
```
**Solution**: Ensure mocks are properly imported and configured

### 4. Test Timeout Issues
```bash
Error: Timeout - Async callback was not invoked
```
**Solution**: Increase timeout or fix async test logic

## 🔧 Continuous Integration

### GitHub Actions
Tests run automatically on:
- Pull requests
- Push to main branch
- Push to develop branch

### Pre-commit Hooks
Tests run before each commit to ensure code quality.

## 📚 Additional Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
- [Express Testing Guide](https://expressjs.com/en/advanced/best-practices-performance.html#testing)

## 🤝 Contributing to Tests

When adding new features:
1. Write unit tests for business logic
2. Write integration tests for API endpoints
3. Update test configuration if needed
4. Ensure test coverage remains high
5. Document new test scenarios

---

**Happy Testing! 🎉**
