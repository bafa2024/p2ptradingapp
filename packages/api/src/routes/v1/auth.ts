import { Router, Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';
import AuthController from '../../controllers/auth/auth.controller';
import { AppError } from '../../utils/AppError';

const router = Router();

// Validation middleware
const validateRegistration = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('phone_number')
    .isMobilePhone('any')
    .withMessage('Please provide a valid phone number'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one lowercase letter, one uppercase letter, and one number'),
  body('display_name')
    .isLength({ min: 2, max: 100 })
    .withMessage('Display name must be between 2 and 100 characters'),
  body('referral_code')
    .optional()
    .isLength({ min: 3, max: 20 })
    .withMessage('Referral code must be between 3 and 20 characters'),
  body('date_of_birth')
    .optional()
    .isISO8601()
    .withMessage('Date of birth must be a valid date'),
  body('nationality')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Nationality must be between 2 and 50 characters'),
  body('country')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Country must be between 2 and 50 characters'),
  body('city')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters')
];

const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

const validateRefreshToken = [
  body('refresh_token')
    .notEmpty()
    .withMessage('Refresh token is required')
];

const validateChangePassword = [
  body('current_password')
    .notEmpty()
    .withMessage('Current password is required'),
  body('new_password')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one lowercase letter, one uppercase letter, and one number')
];

const validateForgotPassword = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
];

const validateResetPassword = [
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

const validatePhoneVerification = [
  body('otp')
    .isLength({ min: 4, max: 6 })
    .withMessage('OTP must be between 4 and 6 characters')
    .isNumeric()
    .withMessage('OTP must contain only numbers')
];

// Check validation results
const checkValidation = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return;
  }
  next();
};

// Error handling middleware
const handleErrors = (err: any, _req: Request, res: Response, _next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      status: err.status
    });
    return;
  }

  // Handle Sequelize validation errors
  if (err.name === 'SequelizeValidationError') {
    const validationErrors = err.errors.map((error: any) => ({
      field: error.path,
      message: error.message
    }));

    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: validationErrors
    });
    return;
  }

  // Handle Sequelize unique constraint errors
  if (err.name === 'SequelizeUniqueConstraintError') {
    const field = err.errors[0]?.path || 'field';
    res.status(409).json({
      success: false,
      message: `${field} already exists`
    });
    return;
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expired'
    });
    return;
  }

  // Default error
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
};

// Routes
router.post('/register', validateRegistration, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.register(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/login', validateLogin, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.login(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/logout', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.logout(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh', validateRefreshToken, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.refreshToken(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/me', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.getProfile(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/change-password', validateChangePassword, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.changePassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/forgot-password', validateForgotPassword, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.forgotPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/reset-password', validateResetPassword, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.resetPassword(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/verify-phone', validatePhoneVerification, checkValidation, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await AuthController.verifyPhone(req, res);
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Auth service is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Apply error handling middleware
router.use(handleErrors);

export default router;
