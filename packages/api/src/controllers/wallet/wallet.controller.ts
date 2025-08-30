// src/controllers/wallet/wallet.controller.ts
import { Request, Response } from 'express';
import { features } from '../../config/features';
// import real services/models only when enabled
// import { Wallet } from '../../models/Wallet';

export async function getMyWallet(req: Request, res: Response) {
  // If you attach userId to req in auth middleware, read it here:
  const userId = (req as any).user?.id;

  if (features.walletDisabled) {
    return res.json({
      disabled: true,
      userId,
      balances: { usdt_available: 0, usdt_locked: 0 },
      note: 'Wallet is disabled in this environment.',
    });
  }

  // ---- Real implementation (kept here for later) ----
  // const wallet = await Wallet.findOne({ where: { user_id: userId } });
  // if (!wallet) return res.status(404).json({ error: 'Wallet not found' });
  // return res.json({
  //   balances: {
  //     usdt_available: wallet.usdt_available,
  //     usdt_locked: wallet.usdt_locked,
  //   },
  // });
  return res.status(501).json({ error: 'Wallet not implemented yet.' });
}

export async function requestWithdrawal(_req: Request, res: Response) {
    return res
      .status(503)
      .json({ error: 'Wallet is disabled in this environment.' });
  }
