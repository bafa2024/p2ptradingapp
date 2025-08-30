import { otpService } from '../services/otp.service';
import { User } from '../models/User';
import { otpController } from '../controllers/otp/otp.controller';

// Mock dependencies
jest.mock('../services/otp.service');
jest.mock('../models/User');

const mockUser = {
  id: 1,
  email: 'test@example.com',
  first_name: 'John',
  is_email_verified: false,
  email_verified_at: null,
};

// Mock request and response objects
const mockRequest = (body: any = {}, params: any = {}) => ({
  body,
  params,
});

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('OTP Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendOTP', () => {
    it('should send OTP successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (otpService.sendOTP as jest.Mock).mockResolvedValue({
        success: true,
        message: 'OTP sent successfully. Please check your email.',
      });

      const req = mockRequest({ email: 'test@example.com' });
      const res = mockResponse();

      await otpController.sendOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'OTP sent successfully. Please check your email.',
        data: {
          email: 'test@example.com',
          message: 'OTP sent successfully. Please check your email.',
        },
      });
      expect(otpService.sendOTP).toHaveBeenCalledWith('test@example.com');
    });

    it('should validate email format', async () => {
      const req = mockRequest({ email: 'invalid-email' });
      const res = mockResponse();

      await otpController.sendOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid email format',
      });
    });

    it('should require email field', async () => {
      const req = mockRequest({});
      const res = mockResponse();

      await otpController.sendOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email is required',
      });
    });
  });

  describe('verifyOTP', () => {
    it('should verify OTP successfully', async () => {
      (otpService.verifyOTP as jest.Mock).mockResolvedValue({
        success: true,
        message: 'Email verified successfully!',
      });

      const req = mockRequest({ 
        email: 'test@example.com', 
        otp: '123456' 
      });
      const res = mockResponse();

      await otpController.verifyOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'Email verified successfully!',
        data: {
          email: 'test@example.com',
          verified: true,
          message: 'Email verified successfully!',
        },
      });
      expect(otpService.verifyOTP).toHaveBeenCalledWith('test@example.com', '123456');
    });

    it('should validate OTP format', async () => {
      const req = mockRequest({ 
        email: 'test@example.com', 
        otp: '12345' // Too short
      });
      const res = mockResponse();

      await otpController.verifyOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Invalid OTP format. OTP must be 6 digits.',
      });
    });

    it('should require both email and OTP', async () => {
      const req = mockRequest({ email: 'test@example.com' });
      const res = mockResponse();

      await otpController.verifyOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'Email and OTP are required',
      });
    });
  });

  describe('resendOTP', () => {
    it('should resend OTP successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);
      (otpService.resendOTP as jest.Mock).mockResolvedValue({
        success: true,
        message: 'OTP resent successfully. Please check your email.',
      });

      const req = mockRequest({ email: 'test@example.com' });
      const res = mockResponse();

      await otpController.resendOTP(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'OTP resent successfully. Please check your email.',
        data: {
          email: 'test@example.com',
          message: 'OTP resent successfully. Please check your email.',
        },
      });
      expect(otpService.resendOTP).toHaveBeenCalledWith('test@example.com');
    });
  });

  describe('getOTPStatus', () => {
    it('should return OTP status', async () => {
      const mockOTPStatus = {
        email: 'test@example.com',
        expiresAt: new Date(Date.now() + 60000),
        attempts: 0,
        verified: false,
      };
      (otpService.getOTPStatus as jest.Mock).mockReturnValue(mockOTPStatus);

      const req = mockRequest({}, { email: 'test@example.com' });
      const res = mockResponse();

      await otpController.getOTPStatus(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          email: mockOTPStatus.email,
          expiresAt: mockOTPStatus.expiresAt,
          attempts: mockOTPStatus.attempts,
          verified: mockOTPStatus.verified,
        },
      });
      expect(otpService.getOTPStatus).toHaveBeenCalledWith('test@example.com');
    });

    it('should return 404 for non-existent OTP', async () => {
      (otpService.getOTPStatus as jest.Mock).mockReturnValue(null);

      const req = mockRequest({}, { email: 'nonexistent@example.com' });
      const res = mockResponse();

      await otpController.getOTPStatus(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'No OTP found for this email',
      });
    });
  });

  describe('getOTPStats', () => {
    it('should return OTP statistics', async () => {
      const mockStats = {
        totalOTPs: 5,
        verifiedOTPs: 2,
        expiredOTPs: 1,
        activeOTPs: 2,
      };
      (otpService.getStats as jest.Mock).mockReturnValue(mockStats);

      const req = mockRequest();
      const res = mockResponse();

      await otpController.getOTPStats(req as any, res as any);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: mockStats,
      });
      expect(otpService.getStats).toHaveBeenCalled();
    });
  });
});
