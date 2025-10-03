import { body } from 'express-validator';

// Registration validation - relaxed for prototyping
export const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
  // phone_number and display_name are implicitly optional (no validation = accepts any value or absence)
];

// Login validation
export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Refresh token validation
export const validateRefreshToken = [
  body('refresh_token')
    .notEmpty()
    .withMessage('Refresh token is required')
];

// Change password validation
export const validateChangePassword = [
  body('current_password')
    .notEmpty()
    .withMessage('Current password is required'),
  body('new_password')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Forgot password validation
export const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
];

// Reset password validation
export const validateResetPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('reset_token')
    .notEmpty()
    .withMessage('Reset token is required'),
  body('new_password')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

// Phone verification validation
export const validatePhoneVerification = [
  body('otp')
    .isLength({ min: 4, max: 6 })
    .withMessage('OTP must be between 4 and 6 characters')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

