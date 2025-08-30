// src/controllers/auth/auth.controller.ts
import { Request, Response } from 'express';
import { features } from '../../config/features';
import { Wallet } from '../../models/Wallet';
import { v4 as uuidv4 } from 'uuid';
// import your User model and any password/Firebase logic you already use
import { User } from '../../models/User';

export async function register(req: Request, res: Response) {
  try {
    const { email, password, phone } = req.body;

    // Create user (replace with your own validation and hashing / Firebase)
    const user = await User.create({
      id: uuidv4(),
      email,
      phone,
      password_hash: password || '', // replace with real hashed password or remove if using Firebase
      status: 'active',
    });

    // Only create a wallet if the feature is enabled
    if (!features.walletDisabled) {
      await Wallet.create({
        user_id: user.id,
        usdt_available: 0,
        usdt_locked: 0,
        suspended_reason: null,
        suspended_at: null,
      });
    }

    return res.status(201).json({
      id: user.id,
      email: user.email,
      phone: user.phone,
      walletCreated: !features.walletDisabled,
    });
  } catch (err: any) {
    console.error('[register] error', err);
    return res.status(400).json({ error: err?.message || 'Registration failed' });
  }
}

// keep your existing login/OTP endpoints as-is
