import { Request, Response } from 'express';
import { otpService } from '../../services/otp.service';
import logger from '../../utils/logger';
import { AppError } from '../../utils/AppError';

export class OTPController {
  /**
   * Send OTP for email verification
   */
  async sendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        throw new AppError('Email is required', 400);
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError('Invalid email format', 400);
      }

      const result = await otpService.sendOTP(email);

      res.status(200).json({
        success: true,
        message: result.message,
        data: {
          email,
          message: 'OTP sent successfully. Please check your email.',
        },
      });
    } catch (error) {
      logger.error('Error in sendOTP:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to send OTP. Please try again later.',
        });
      }
    }
  }

  /**
   * Verify OTP code
   */
  async verifyOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        throw new AppError('Email and OTP are required', 400);
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError('Invalid email format', 400);
      }

      // Basic OTP validation (6 digits)
      if (!/^\d{6}$/.test(otp)) {
        throw new AppError('Invalid OTP format. OTP must be 6 digits.', 400);
      }

      const result = await otpService.verifyOTP(email, otp);

      res.status(200).json({
        success: true,
        message: result.message,
        data: {
          email,
          verified: true,
          message: 'Email verified successfully!',
        },
      });
    } catch (error) {
      logger.error('Error in verifyOTP:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to verify OTP. Please try again later.',
        });
      }
    }
  }

  /**
   * Resend OTP
   */
  async resendOTP(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      if (!email) {
        throw new AppError('Email is required', 400);
      }

      // Basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new AppError('Invalid email format', 400);
      }

      const result = await otpService.resendOTP(email);

      res.status(200).json({
        success: true,
        message: result.message,
        data: {
          email,
          message: 'OTP resent successfully. Please check your email.',
        },
      });
    } catch (error) {
      logger.error('Error in resendOTP:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to resend OTP. Please try again later.',
        });
      }
    }
  }

  /**
   * Get OTP status (for debugging/admin purposes)
   */
  async getOTPStatus(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;

      if (!email) {
        throw new AppError('Email is required', 400);
      }

      const otpStatus = otpService.getOTPStatus(email);

      if (!otpStatus) {
        res.status(404).json({
          success: false,
          message: 'No OTP found for this email',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          email: otpStatus.email,
          expiresAt: otpStatus.expiresAt,
          attempts: otpStatus.attempts,
          verified: otpStatus.verified,
          // OTP is hidden for security
        },
      });
    } catch (error) {
      logger.error('Error in getOTPStatus:', error);
      
      if (error instanceof AppError) {
        res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      } else {
        res.status(500).json({
          success: false,
          message: 'Failed to get OTP status. Please try again later.',
        });
      }
    }
  }

  /**
   * Get OTP statistics (for monitoring/admin purposes)
   */
  async getOTPStats(_req: Request, res: Response): Promise<void> {
    try {
      const stats = otpService.getStats();

      res.status(200).json({
        success: true,
        data: stats,
      });
    } catch (error) {
      logger.error('Error in getOTPStats:', error);
      
      res.status(500).json({
        success: false,
        message: 'Failed to get OTP statistics. Please try again later.',
      });
    }
  }
}

// Export singleton instance
export const otpController = new OTPController();
