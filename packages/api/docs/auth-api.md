# Authentication API Documentation

## Overview

The Authentication API provides endpoints for user registration, login, logout, and profile management. It integrates with Firebase Authentication for secure user management and uses JWT tokens for session management.

## Base URL

```
https://api.okx-platform.com/api/v1/auth
```

## Authentication

Most endpoints require authentication via JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### 1. User Registration

**POST** `/register`

Creates a new user account with email, phone number, and password.

#### Request Body

```json
{
  "email": "user@example.com",
  "phone_number": "+1234567890",
  "password": "SecurePass123",
  "display_name": "John Doe",
  "referral_code": "REF123",
  "date_of_birth": "1990-01-01",
  "nationality": "US",
  "country": "United States",
  "city": "New York"
}
```

#### Field Validation

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `email` | string | Yes | Valid email format |
| `phone_number` | string | Yes | Valid international phone number |
| `password` | string | Yes | Min 6 chars, contains uppercase, lowercase, number |
| `display_name` | string | Yes | 2-100 characters |
| `referral_code` | string | No | 3-20 characters |
| `date_of_birth` | string | No | ISO 8601 date format |
| `nationality` | string | No | 2-50 characters |
| `country` | string | No | 2-50 characters |
| `city` | string | No | 2-50 characters |

#### Response

**Success (201 Created)**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "phone_number": "+1234567890",
      "display_name": "John Doe",
      "kyc_status": "pending",
      "membership_status": "free",
      "is_verified": false
    },
    "tokens": {
      "access_token": "jwt-access-token",
      "refresh_token": "jwt-refresh-token",
      "expires_in": "15m"
    }
  }
}
```

**Error (400 Bad Request)**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

**Error (409 Conflict)**

```json
{
  "success": false,
  "message": "User with this email or phone number already exists"
}
```

### 2. User Login

**POST** `/login`

Authenticates a user with email and password.

#### Request Body

```json
{
  "email": "user@example.com",
  "password": "SecurePass123"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "phone_number": "+1234567890",
      "display_name": "John Doe",
      "kyc_status": "pending",
      "membership_status": "free",
      "is_verified": false,
      "wallet": {
        "usdt_available": 100.00,
        "iqd_available": 1000.00,
        "usd_available": 50.00
      }
    },
    "tokens": {
      "access_token": "jwt-access-token",
      "refresh_token": "jwt-refresh-token",
      "expires_in": "15m"
    }
  }
}
```

**Error (401 Unauthorized)**

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Error (403 Forbidden)**

```json
{
  "success": false,
  "message": "Account is deactivated"
}
```

### 3. User Logout

**POST** `/logout`

Logs out the current user and invalidates refresh tokens.

#### Request Body

```json
{
  "refresh_token": "jwt-refresh-token"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

### 4. Refresh Token

**POST** `/refresh`

Refreshes an expired access token using a valid refresh token.

#### Request Body

```json
{
  "refresh_token": "jwt-refresh-token"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Token refreshed successfully",
  "data": {
    "tokens": {
      "access_token": "new-jwt-access-token",
      "refresh_token": "new-jwt-refresh-token",
      "expires_in": "15m"
    }
  }
}
```

**Error (401 Unauthorized)**

```json
{
  "success": false,
  "message": "Invalid refresh token"
}
```

### 5. Get User Profile

**GET** `/me`

Retrieves the current user's profile information.

**Requires Authentication:** Yes

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "data": {
    "user": {
      "id": "uuid-string",
      "email": "user@example.com",
      "phone_number": "+1234567890",
      "display_name": "John Doe",
      "photo_url": "https://example.com/photo.jpg",
      "date_of_birth": "1990-01-01",
      "nationality": "US",
      "country": "United States",
      "city": "New York",
      "kyc_status": "approved",
      "membership_status": "premium",
      "is_verified": true,
      "total_trades": 10,
      "rating": 4.5,
      "referral_code": "REF123",
      "wallet": {
        "usdt_available": 100.00,
        "usdt_locked": 0.00,
        "iqd_available": 1000.00,
        "iqd_locked": 0.00,
        "usd_available": 50.00,
        "usd_locked": 0.00
      }
    }
  }
}
```

**Error (401 Unauthorized)**

```json
{
  "success": false,
  "message": "User not authenticated"
}
```

### 6. Change Password

**POST** `/change-password`

Changes the user's password.

**Requires Authentication:** Yes

#### Request Body

```json
{
  "current_password": "OldPass123",
  "new_password": "NewPass456"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error (400 Bad Request)**

```json
{
  "success": false,
  "message": "Current password is incorrect"
}
```

### 7. Forgot Password

**POST** `/forgot-password`

Initiates the password reset process.

#### Request Body

```json
{
  "email": "user@example.com"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "If an account with this email exists, a password reset link has been sent"
}
```

### 8. Reset Password

**POST** `/reset-password`

Resets the user's password using a reset token.

#### Request Body

```json
{
  "email": "user@example.com",
  "reset_token": "reset-token-string",
  "new_password": "NewPass456"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

**Error (400 Bad Request)**

```json
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

### 9. Verify Phone Number

**POST** `/verify-phone`

Verifies the user's phone number using an OTP.

**Requires Authentication:** Yes

#### Request Body

```json
{
  "otp": "123456"
}
```

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Phone number verified successfully",
  "data": {
    "user": {
      "id": "uuid-string",
      "phone_number": "+1234567890",
      "is_verified": true
    }
  }
}
```

**Error (400 Bad Request)**

```json
{
  "success": false,
  "message": "Invalid OTP"
}
```

### 10. Health Check

**GET** `/health`

Checks the health status of the authentication service.

#### Response

**Success (200 OK)**

```json
{
  "success": true,
  "message": "Auth service is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 3600.5
}
```

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request - Validation error |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

## Rate Limiting

Authentication endpoints are rate-limited to prevent abuse:

- **Login/Register:** 5 attempts per 15 minutes per IP
- **Password Reset:** 3 attempts per hour per email
- **Phone Verification:** 5 attempts per 15 minutes per phone number

## Security Features

1. **Password Requirements:**
   - Minimum 6 characters
   - Must contain uppercase, lowercase, and number

2. **Token Security:**
   - Access tokens expire in 15 minutes
   - Refresh tokens expire in 7 days
   - Tokens are invalidated on logout

3. **Account Protection:**
   - Account deactivation for suspicious activity
   - KYC verification required for certain operations
   - Phone verification for enhanced security

## Integration Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

// Register user
const registerUser = async (userData) => {
  try {
    const response = await axios.post('/api/v1/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response.data);
    throw error;
  }
};

// Login user
const loginUser = async (credentials) => {
  try {
    const response = await axios.post('/api/v1/auth/login', credentials);
    const { access_token } = response.data.data.tokens;
    
    // Set token for future requests
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response.data);
    throw error;
  }
};

// Get user profile
const getUserProfile = async () => {
  try {
    const response = await axios.get('/api/v1/auth/me');
    return response.data;
  } catch (error) {
    console.error('Failed to get profile:', error.response.data);
    throw error;
  }
};
```

### Python

```python
import requests

class AuthClient:
    def __init__(self, base_url):
        self.base_url = base_url
        self.access_token = None
    
    def register(self, user_data):
        response = requests.post(f"{self.base_url}/register", json=user_data)
        response.raise_for_status()
        return response.json()
    
    def login(self, credentials):
        response = requests.post(f"{self.base_url}/login", json=credentials)
        response.raise_for_status()
        
        data = response.json()
        self.access_token = data['data']['tokens']['access_token']
        return data
    
    def get_profile(self):
        headers = {'Authorization': f'Bearer {self.access_token}'}
        response = requests.get(f"{self.base_url}/me", headers=headers)
        response.raise_for_status()
        return response.json()
```

### cURL Examples

```bash
# Register user
curl -X POST https://api.okx-platform.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "phone_number": "+1234567890",
    "password": "SecurePass123",
    "display_name": "John Doe"
  }'

# Login user
curl -X POST https://api.okx-platform.com/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "SecurePass123"
  }'

# Get profile (with token)
curl -X GET https://api.okx-platform.com/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Support

For technical support or questions about the Authentication API:

- **Email:** support@okx-platform.com
- **Documentation:** https://docs.okx-platform.com
- **Status Page:** https://status.okx-platform.com





