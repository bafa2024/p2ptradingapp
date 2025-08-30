// src/routes/v1/wallet.ts
import { Router } from 'express';
import { features } from '../../config/features';
import { getMyWallet, requestWithdrawal } from '../../controllers/wallet/wallet.controller';

const router = Router();

router.get('/me', getMyWallet);

router.post('/withdrawals', (req, res) => {
  if (features.walletDisabled) {
    return res.status(503).json({ error: 'Wallet temporarily disabled.' });
  }
  return requestWithdrawal(req, res);
});

export default router;
