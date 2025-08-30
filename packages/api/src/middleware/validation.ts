import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { AppError } from '../utils/AppError';

/**
 * Middleware to handle validation errors from express-validator
 */
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => ({
      field: error.type === 'field' ? error.path : 'unknown',
      message: error.msg,
      value: error.value,
    }));

    const error = new AppError('Validation failed', 400);
    error.validationErrors = errorMessages;
    
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errorMessages,
    });
    return;
  }

  next();
};

/**
 * Custom validation for phone numbers (Iraq format)
 */
export const validateIraqPhoneNumber = (value: string): boolean => {
  // Iraq phone number format: +964 or 964 followed by 9 digits
  const phoneRegex = /^(\+964|964)?[0-9]{9}$/;
  return phoneRegex.test(value);
};

/**
 * Custom validation for TRC20 addresses
 */
export const validateTRC20Address = (value: string): boolean => {
  // TRC20 addresses are 34 characters long and start with 'T'
  const trc20Regex = /^T[A-Za-z1-9]{33}$/;
  return trc20Regex.test(value);
};

/**
 * Custom validation for referral codes
 */
export const validateReferralCode = (value: string): boolean => {
  // Referral codes are 6-8 alphanumeric characters
  const referralRegex = /^[A-Za-z0-9]{6,8}$/;
  return referralRegex.test(value);
};

/**
 * Custom validation for KYC document numbers
 */
export const validateKYCDocumentNumber = (value: string): boolean => {
  // KYC document numbers are typically 8-15 alphanumeric characters
  const kycRegex = /^[A-Za-z0-9]{8,15}$/;
  return kycRegex.test(value);
};




