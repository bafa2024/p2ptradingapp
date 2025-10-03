// src/routes/v1/wallet.ts
import { Router } from 'express';
import { features } from '../../config/features';
import { authMiddleware } from '../../middleware/auth';
import { getMyWallet, requestWithdrawal, getBalance, deposit, withdraw } from '../../controllers/wallet/wallet.controller';

const router = Router();

// Apply authentication middleware to all wallet routes
router.use(authMiddleware);

// New wallet operation routes
router.get('/balance', getBalance);
router.post('/deposit', deposit);
router.post('/withdraw', withdraw);

// Existing routes
router.get('/me', getMyWallet);

router.post('/withdrawals', (req, res, _next) => {
  if (features.walletDisabled) {
    return res.status(503).json({ error: 'Wallet temporarily disabled.' });
  }
  return requestWithdrawal(req, res);
});

export default router;
