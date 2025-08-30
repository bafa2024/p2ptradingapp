import { Router } from 'express';
import { body, param } from 'express-validator';
import { otpController } from '../../controllers/otp/otp.controller';
import { handleValidationErrors } from '../../middleware/validation';

const router = Router();

/**
 * @route   POST /api/v1/otp/send
 * @desc    Send OTP for email verification
 * @access  Public
 */
router.post(
  '/send',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ],
  handleValidationErrors,
  otpController.sendOTP
);

/**
 * @route   POST /api/v1/otp/verify
 * @desc    Verify OTP code
 * @access  Public
 */
router.post(
  '/verify',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
    body('otp')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be exactly 6 digits')
      .isNumeric()
      .withMessage('OTP must contain only numbers'),
  ],
  handleValidationErrors,
  otpController.verifyOTP
);

/**
 * @route   POST /api/v1/otp/resend
 * @desc    Resend OTP
 * @access  Public
 */
router.post(
  '/resend',
  [
    body('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ],
  handleValidationErrors,
  otpController.resendOTP
);

/**
 * @route   GET /api/v1/otp/status/:email
 * @desc    Get OTP status for debugging/admin purposes
 * @access  Public (for debugging)
 */
router.get(
  '/status/:email',
  [
    param('email')
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(),
  ],
  handleValidationErrors,
  otpController.getOTPStatus
);

/**
 * @route   GET /api/v1/otp/stats
 * @desc    Get OTP statistics for monitoring/admin purposes
 * @access  Public (for monitoring)
 */
router.get('/stats', otpController.getOTPStats);

export default router;




