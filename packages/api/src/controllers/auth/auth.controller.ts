// src/controllers/auth/auth.controller.ts
import { Request, Response } from 'express';
import { features } from '../../config/features';
import { Wallet } from '../../models/Wallet';
import { User } from '../../models/User';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../utils/AppError';

export async function register(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    // Hash password
    const saltRounds = config.security.bcryptRounds;
    const password_hash = await bcrypt.hash(password, saltRounds);

    // Create user with only existing DB columns
    const user = await User.create({
      id: uuidv4(),
      email,
      phone_number: req.body.phone_number || `+1${Math.floor(Math.random() * 9000000000) + 1000000000}`, // Generate random phone if not provided
      username: req.body.display_name || email.split('@')[0],
      password_hash,
      role: 'user', // Default role
      kyc_status: 'pending',
      membership_tier: 'free',
      referral_code: uuidv4().substring(0, 8).toUpperCase(),
      referred_by: null
    } as any);

    // Create wallet for the new user
    let wallet = null;
    try {
      wallet = await Wallet.create({
        id: uuidv4(),
        user_id: user.id,
        usdt_available: 0,
        usdt_locked: 0,
      } as any);
    } catch (walletError) {
      console.error('[register] wallet creation failed:', walletError);
      return res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: 'wallet_creation_failed'
      });
    }

    // Generate JWT token
    const token = (jwt.sign as any)(
      {
        userId: user.id,
        email: user.email,
        type: 'access'
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    // Return user data, wallet, and token (exclude password_hash)
    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        email: user.email
      },
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      },
      token
    });
  } catch (err: any) {
    console.error('[register] error', err);
    
    // Handle duplicate email error
    if (err.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        success: false,
        message: 'User with this email already exists'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Registration failed',
      error: err?.message || 'Internal server error'
    });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ where: { email } }) as any;
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Note: is_active field removed from simplified User model
    // All users are considered active by default

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Get or create wallet for the user
    let wallet = await Wallet.findOne({ where: { user_id: user.id } });
    if (!wallet) {
      try {
        wallet = await Wallet.create({
          id: uuidv4(),
          user_id: user.id,
          usdt_available: 0,
          usdt_locked: 0,
        } as any);
      } catch (walletError) {
        console.error('[login] wallet creation failed:', walletError);
        return res.status(500).json({
          success: false,
          message: 'Login failed',
          error: 'wallet_creation_failed'
        });
      }
    }

    // Generate JWT token
    const token = (jwt.sign as any)(
      {
        userId: user.id,
        email: user.email,
        type: 'access'
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.expiresIn
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email
      },
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      },
      token
    });
  } catch (err: any) {
    console.error('[login] error', err);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err?.message || 'Internal server error'
    });
  }
}

export async function logout(req: Request, res: Response) {
  try {
    // For JWT-based auth, logout is typically handled client-side
    // by removing the token. Server-side logout would require token blacklisting
    return res.status(200).json({
      success: true,
      message: 'Logout successful'
    });
  } catch (err: any) {
    console.error('[logout] error', err);
    return res.status(500).json({
      success: false,
      message: 'Logout failed'
    });
  }
}

export async function refreshToken(req: Request, res: Response) {
  try {
    // Placeholder implementation
    return res.status(501).json({
      success: false,
      message: 'Refresh token not implemented yet'
    });
  } catch (err: any) {
    console.error('[refreshToken] error', err);
    return res.status(500).json({
      success: false,
      message: 'Refresh token failed'
    });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    // Placeholder implementation - would need auth middleware to get user from token
    return res.status(501).json({
      success: false,
      message: 'Get profile not implemented yet'
    });
  } catch (err: any) {
    console.error('[getProfile] error', err);
    return res.status(500).json({
      success: false,
      message: 'Get profile failed'
    });
  }
}

export async function changePassword(req: Request, res: Response) {
  try {
    // Placeholder implementation
    return res.status(501).json({
      success: false,
      message: 'Change password not implemented yet'
    });
  } catch (err: any) {
    console.error('[changePassword] error', err);
    return res.status(500).json({
      success: false,
      message: 'Change password failed'
    });
  }
}

export async function forgotPassword(req: Request, res: Response) {
  try {
    // Placeholder implementation
    return res.status(501).json({
      success: false,
      message: 'Forgot password not implemented yet'
    });
  } catch (err: any) {
    console.error('[forgotPassword] error', err);
    return res.status(500).json({
      success: false,
      message: 'Forgot password failed'
    });
  }
}

export async function resetPassword(req: Request, res: Response) {
  try {
    // Placeholder implementation
    return res.status(501).json({
      success: false,
      message: 'Reset password not implemented yet'
    });
  } catch (err: any) {
    console.error('[resetPassword] error', err);
    return res.status(500).json({
      success: false,
      message: 'Reset password failed'
    });
  }
}

export async function verifyPhone(req: Request, res: Response) {
  try {
    // Placeholder implementation
    return res.status(501).json({
      success: false,
      message: 'Phone verification not implemented yet'
    });
  } catch (err: any) {
    console.error('[verifyPhone] error', err);
    return res.status(500).json({
      success: false,
      message: 'Phone verification failed'
    });
  }
}
