import { Router, Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import * as AuthController from '../../controllers/auth/auth.controller';
import { AppError } from '../../utils/AppError';
import {
  validateRegistration,
  validateLogin,
  validateRefreshToken,
  validateChangePassword,
  validateForgotPassword,
  validateResetPassword,
  validatePhoneVerification
} from '../../validation/auth.validation';

const router = Router();

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
