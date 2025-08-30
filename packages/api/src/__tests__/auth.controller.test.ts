import request from 'supertest';
import express from 'express';
import { body } from 'express-validator';
import AuthController from '../controllers/auth/auth.controller';
import { User } from '../models/User';
import { Wallet } from '../models/Wallet';
import { sequelize } from '../database/connection';

// Mock Firebase service
jest.mock('../services/firebase.service');
const mockFirebaseService = {
  createUser: jest.fn(),
  signIn: jest.fn(),
  updatePassword: jest.fn(),
  verifyPhoneNumber: jest.fn()
};

// Mock models
jest.mock('../models/User');
jest.mock('../models/Wallet');
jest.mock('../database/connection');

// Create test app
const app = express();
app.use(express.json());

// Add auth routes
app.post('/register', [
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('display_name').notEmpty()
], async (req: any, res: any) => {
  try {
    await AuthController.register(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], async (req: any, res: any) => {
  try {
    await AuthController.register(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/me', async (req: any, res: any) => {
  try {
    await AuthController.getProfile(req, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

describe('AuthController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock sequelize transaction
    (sequelize.transaction as jest.Mock).mockResolvedValue({
      commit: jest.fn(),
      rollback: jest.fn()
    });
  });

  describe('POST /register', () => {
    const validUserData = {
      email: 'test@example.com',
      phone_number: '+1234567890',
      password: 'TestPass123',
      display_name: 'Test User',
      referral_code: 'REF123'
    };

    it('should register a new user successfully', async () => {
      // Mock Firebase service
      mockFirebaseService.createUser.mockResolvedValue({
        uid: 'firebase-uid-123'
      });

      // Mock User.findOne (no existing user)
      (User.findOne as jest.Mock).mockResolvedValue(null);

      // Mock User.create
      (User.create as jest.Mock).mockResolvedValue({
        id: 'user-id-123',
        ...validUserData,
        kyc_status: 'pending',
        membership_status: 'free',
        is_verified: false
      });

      // Mock Wallet.create
      (Wallet.create as jest.Mock).mockResolvedValue({
        id: 'wallet-id-123',
        user_id: 'user-id-123'
      });

      const response = await request(app)
        .post('/register')
        .send(validUserData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.tokens).toBeDefined();
    });

    it('should return error if user already exists', async () => {
      // Mock existing user
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 'existing-user-id',
        email: validUserData.email
      });

      const response = await request(app)
        .post('/register')
        .send(validUserData)
        .expect(409);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('User with this email or phone number already exists');
    });

    it('should return error if referral code is invalid', async () => {
      // Mock no existing user
      (User.findOne as jest.Mock)
        .mockResolvedValueOnce(null) // First call for user check
        .mockResolvedValueOnce(null); // Second call for referral check

      const response = await request(app)
        .post('/register')
        .send(validUserData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid referral code');
    });

    it('should validate required fields', async () => {
      const invalidData = {
        email: 'invalid-email',
        password: '123'
      };

      const response = await request(app)
        .post('/register')
        .send(invalidData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.errors).toBeDefined();
    });
  });

  describe('POST /login', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'TestPass123'
    };

    it('should login user successfully', async () => {
      // Mock user exists
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 'user-id-123',
        email: loginData.email,
        phone_number: '+1234567890',
        display_name: 'Test User',
        kyc_status: 'pending',
        membership_status: 'free',
        is_verified: false,
        is_active: true,
        is_banned: false,
        update: jest.fn().mockResolvedValue(true),
        wallet: {
          usdt_available: 100,
          usdt_locked: 0
        }
      });

      // Mock Firebase sign in
      mockFirebaseService.signIn.mockResolvedValue({
        uid: 'firebase-uid-123'
      });

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe('Login successful');
      expect(response.body.data.user).toBeDefined();
      expect(response.body.data.tokens).toBeDefined();
    });

    it('should return error for invalid credentials', async () => {
      // Mock user not found
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(401);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Invalid credentials');
    });

    it('should return error for deactivated account', async () => {
      // Mock deactivated user
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 'user-id-123',
        email: loginData.email,
        is_active: false
      });

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Account is deactivated');
    });

    it('should return error for banned account', async () => {
      // Mock banned user
      (User.findOne as jest.Mock).mockResolvedValue({
        id: 'user-id-123',
        email: loginData.email,
        is_active: true,
        is_banned: true
      });

      const response = await request(app)
        .post('/login')
        .send(loginData)
        .expect(403);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Account is banned');
    });
  });

  describe('GET /me', () => {
    it('should return user profile when authenticated', async () => {
      const mockUser = {
        id: 'user-id-123',
        email: 'test@example.com',
        phone_number: '+1234567890',
        display_name: 'Test User',
        photo_url: 'https://example.com/photo.jpg',
        date_of_birth: '1990-01-01',
        nationality: 'US',
        country: 'United States',
        city: 'New York',
        kyc_status: 'approved',
        membership_status: 'premium',
        is_verified: true,
        total_trades: 10,
        rating: 4.5,
        referral_code: 'REF123',
        wallet: {
          usdt_available: 100,
          usdt_locked: 0,
          usd_available: 50,
          usd_locked: 0
        }
      };

      // Mock request with user
      const req = {
        user: mockUser
      } as any;

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      await AuthController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        message: 'User profile retrieved successfully',
        data: {
          user: {
            id: mockUser.id,
            email: mockUser.email,
            phone_number: mockUser.phone_number,
            display_name: mockUser.display_name,
            photo_url: mockUser.photo_url,
            date_of_birth: mockUser.date_of_birth,
            nationality: mockUser.nationality,
            country: mockUser.country,
            city: mockUser.city,
            kyc_status: mockUser.kyc_status,
            membership_status: mockUser.membership_status,
            is_verified: mockUser.is_verified,
            total_trades: mockUser.total_trades,
            rating: mockUser.rating,
            referral_code: mockUser.referral_code,
            wallet: mockUser.wallet
          }
        }
      });
    });

    it('should return error when not authenticated', async () => {
      const req = {} as any;
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as any;

      await AuthController.getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        message: 'User not authenticated'
      });
    });
  });

  describe('Token Generation', () => {
    it('should generate valid JWT tokens', async () => {
      const userId = 'user-id-123';
      const email = 'test@example.com';

      // Access private method through reflection or make it public for testing
      const tokens = (AuthController as any).generateTokens(userId, email);

      expect(tokens.accessToken).toBeDefined();
      expect(tokens.refreshToken).toBeDefined();
      expect(typeof tokens.accessToken).toBe('string');
      expect(typeof tokens.refreshToken).toBe('string');
    });
  });

  describe('Error Handling', () => {
    it('should handle database errors gracefully', async () => {
      // Mock database error
      (User.findOne as jest.Mock).mockRejectedValue(new Error('Database connection failed'));

      const response = await request(app)
        .post('/login')
        .send({
          email: 'test@example.com',
          password: 'TestPass123'
        })
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Login failed');
    });

    it('should handle Firebase service errors', async () => {
      // Mock Firebase error
      mockFirebaseService.createUser.mockRejectedValue(new Error('Firebase service unavailable'));

      const response = await request(app)
        .post('/register')
        .send({
          email: 'test@example.com',
          phone_number: '+1234567890',
          password: 'TestPass123',
          display_name: 'Test User'
        })
        .expect(500);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Registration failed');
    });
  });
});
