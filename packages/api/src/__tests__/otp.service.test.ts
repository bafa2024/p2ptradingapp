import { otpService } from '../services/otp.service';
import { User } from '../models/User';

// Mock dependencies
jest.mock('../models/User');

const mockUser = {
  id: 1,
  email: 'test@example.com',
  first_name: 'John',
  is_email_verified: false,
  email_verified_at: null,
};

describe('OTPService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Clear OTP store before each test
    (otpService as any).otpStore.clear();
  });

  describe('generateOTP', () => {
    it('should generate OTP for valid user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const result = await otpService.generateOTP('test@example.com');

      expect(result.otp).toMatch(/^\d{6}$/);
      expect(result.expiresAt).toBeInstanceOf(Date);
      expect(result.expiresAt.getTime()).toBeGreaterThan(Date.now());
    });

    it('should throw error for non-existent user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      await expect(otpService.generateOTP('nonexistent@example.com'))
        .rejects.toThrow('User not found');
    });

    it('should throw error for already verified user', async () => {
      const verifiedUser = { ...mockUser, is_email_verified: true };
      (User.findOne as jest.Mock).mockResolvedValue(verifiedUser);

      await expect(otpService.generateOTP('test@example.com'))
        .rejects.toThrow('Email is already verified');
    });

    it('should enforce rate limiting', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      // Generate 3 OTPs (should work)
      await otpService.generateOTP('test@example.com');
      await otpService.generateOTP('test@example.com');
      await otpService.generateOTP('test@example.com');

      // 4th OTP should fail
      await expect(otpService.generateOTP('test@example.com'))
        .rejects.toThrow('Too many OTP requests');
    });
  });

  describe('sendOTP', () => {
    it('should send OTP successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      // Mock nodemailer transporter
      const mockTransporter = {
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
      };
      (otpService as any).transporter = mockTransporter;

      const result = await otpService.sendOTP('test@example.com');

      expect(result.success).toBe(true);
      expect(result.message).toBe('OTP sent successfully. Please check your email.');
      expect(mockTransporter.sendMail).toHaveBeenCalled();
    });

    it('should handle email sending errors', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      const mockTransporter = {
        sendMail: jest.fn().mockRejectedValue(new Error('SMTP error')),
      };
      (otpService as any).transporter = mockTransporter;

      await expect(otpService.sendOTP('test@example.com'))
        .rejects.toThrow('SMTP error');
    });
  });

  describe('verifyOTP', () => {
    beforeEach(async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      await otpService.generateOTP('test@example.com');
    });

    it('should verify valid OTP', async () => {
      const otpData = (otpService as any).otpStore.get('test@example.com');
      const result = await otpService.verifyOTP('test@example.com', otpData.otp);

      expect(result.success).toBe(true);
      expect(result.message).toBe('Email verified successfully!');
    });

    it('should reject invalid OTP', async () => {
      await expect(otpService.verifyOTP('test@example.com', '000000'))
        .rejects.toThrow('Invalid OTP');
    });

    it('should reject expired OTP', async () => {
      // Manually expire the OTP
      const otpData = (otpService as any).otpStore.get('test@example.com');
      otpData.expiresAt = new Date(Date.now() - 1000);

      await expect(otpService.verifyOTP('test@example.com', otpData.otp))
        .rejects.toThrow('OTP has expired');
    });

    it('should enforce attempt limits', async () => {
      // Try 5 times with wrong OTP
      for (let i = 0; i < 5; i++) {
        try {
          await otpService.verifyOTP('test@example.com', '000000');
        } catch (error) {
          // Expected to fail
        }
      }

      // 6th attempt should fail and clear OTP
      await expect(otpService.verifyOTP('test@example.com', '000000'))
        .rejects.toThrow('Too many failed attempts');
    });
  });

  describe('resendOTP', () => {
    it('should resend OTP successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      const mockTransporter = {
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
      };
      (otpService as any).transporter = mockTransporter;

      const result = await otpService.resendOTP('test@example.com');

      expect(result.success).toBe(true);
      expect(mockTransporter.sendMail).toHaveBeenCalled();
    });

    it('should enforce resend rate limiting', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      const mockTransporter = {
        sendMail: jest.fn().mockResolvedValue({ messageId: 'test-id' }),
      };
      (otpService as any).transporter = mockTransporter;

      // First resend should work
      await otpService.resendOTP('test@example.com');

      // Second resend within 1 minute should fail
      await expect(otpService.resendOTP('test@example.com'))
        .rejects.toThrow('Please wait');
    });
  });

  describe('getOTPStatus', () => {
    it('should return OTP status for existing OTP', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      await otpService.generateOTP('test@example.com');

      const status = otpService.getOTPStatus('test@example.com');

      expect(status).toBeDefined();
      expect(status?.email).toBe('test@example.com');
      expect(status?.otp).toMatch(/^\d{6}$/);
    });

    it('should return null for non-existent OTP', () => {
      const status = otpService.getOTPStatus('nonexistent@example.com');
      expect(status).toBeNull();
    });
  });

  describe('getStats', () => {
    it('should return correct statistics', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      // Generate some OTPs
      await otpService.generateOTP('test1@example.com');
      await otpService.generateOTP('test2@example.com');

      const stats = otpService.getStats();

      expect(stats.totalOTPs).toBe(2);
      expect(stats.activeOTPs).toBe(2);
      expect(stats.verifiedOTPs).toBe(0);
      expect(stats.expiredOTPs).toBe(0);
    });
  });

  describe('cleanupExpiredOTPs', () => {
    it('should clean up expired OTPs', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      
      // Generate OTP
      await otpService.generateOTP('test@example.com');
      
      // Manually expire it
      const otpData = (otpService as any).otpStore.get('test@example.com');
      otpData.expiresAt = new Date(Date.now() - 1000);

      // Trigger cleanup
      (otpService as any).cleanupExpiredOTPs();

      const status = otpService.getOTPStatus('test@example.com');
      expect(status).toBeNull();
    });
  });
});
