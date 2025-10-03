// src/routes/v1/order.ts
import { Router } from 'express';
import { authMiddleware } from '../../middleware/auth';
import { createBuyOrder, createSellOrder, getOpenOrders, cancelOrder } from '../../controllers/order/order.controller';

const router = Router();

// Apply authentication middleware to all order routes
router.use(authMiddleware);

// Order routes
router.post('/buy', createBuyOrder);
router.post('/sell', createSellOrder);
router.get('/open', getOpenOrders);
router.post('/cancel/:id', cancelOrder);

export default router;

