// src/controllers/wallet/wallet.controller.ts
import { Response } from 'express';
import { features } from '../../config/features';
import { Wallet } from '../../models/Wallet';
import { AuthenticatedRequest } from '../../middleware/auth';

export async function getMyWallet(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  if (features.walletDisabled) {
    return res.json({
      walletDisabled: true,
      userId,
      balances: { usdt_available: 0, usdt_locked: 0 },
      note: 'Wallet is disabled in this environment.',
    });
  }

  try {
    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }
    
    return res.json({
      success: true,
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      }
    });
  } catch (error) {
    console.error('[getMyWallet] error:', error);
    return res.status(500).json({
      success: false,
      error: 'wallet_fetch_failed',
      message: 'Failed to fetch wallet'
    });
  }
}

export async function getBalance(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;

  if (features.walletDisabled) {
    return res.status(503).json({ 
      success: false,
      error: 'wallet_disabled',
      message: 'Wallet is disabled in this environment'
    });
  }

  try {
    const wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }
    
    return res.json({
      success: true,
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      }
    });
  } catch (error) {
    console.error('[getBalance] error:', error);
    return res.status(500).json({
      success: false,
      error: 'wallet_fetch_failed',
      message: 'Failed to fetch wallet balance'
    });
  }
}

export async function deposit(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { amount } = req.body;

  if (features.walletDisabled) {
    return res.status(503).json({ 
      success: false,
      error: 'wallet_disabled',
      message: 'Wallet is disabled in this environment'
    });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      success: false,
      error: 'invalid_amount',
      message: 'Amount must be a positive number'
    });
  }

  try {
    let wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Increase available balance
    wallet.usdt_available = Number(wallet.usdt_available) + Number(amount);
    await wallet.save();

    return res.json({
      success: true,
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      }
    });
  } catch (error) {
    console.error('[deposit] error:', error);
    return res.status(500).json({
      success: false,
      error: 'deposit_failed',
      message: 'Failed to process deposit'
    });
  }
}

export async function withdraw(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const { amount } = req.body;

  if (features.walletDisabled) {
    return res.status(503).json({ 
      success: false,
      error: 'wallet_disabled',
      message: 'Wallet is disabled in this environment'
    });
  }

  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      success: false,
      error: 'invalid_amount',
      message: 'Amount must be a positive number'
    });
  }

  try {
    let wallet = await Wallet.findOne({ where: { user_id: userId } });
    if (!wallet) {
      return res.status(404).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Check if sufficient funds
    if (wallet.total_usdt < amount) {
      return res.status(400).json({ 
        success: false,
        error: 'insufficient_funds',
        message: 'Insufficient wallet balance'
      });
    }

    // Decrease available balance
    wallet.usdt_available = Number(wallet.usdt_available) - Number(amount);
    await wallet.save();

    return res.json({
      success: true,
      wallet: {
        balance: wallet.total_usdt,
        status: 'enabled'
      }
    });
  } catch (error) {
    console.error('[withdraw] error:', error);
    return res.status(500).json({
      success: false,
      error: 'withdraw_failed',
      message: 'Failed to process withdrawal'
    });
  }
}

export async function requestWithdrawal(req: AuthenticatedRequest, res: Response) {
  if (features.walletDisabled) {
    return res.status(503).json({ 
      success: false,
      error: 'wallet_disabled',
      message: 'Wallet is disabled in this environment'
    });
  }
  
  return res.status(501).json({ 
    success: false,
    error: 'not_implemented',
    message: 'Withdrawal request not implemented yet'
  });
}
