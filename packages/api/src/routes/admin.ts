// packages/api/src/routes/admin.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';
import { isAdmin } from '../middleware/admin';
import * as AdminController from '../controllers/admin/admin.controller';

const router = Router();

// All admin routes require authentication and admin role
router.use(authMiddleware);
router.use(isAdmin);

// Admin routes
router.get('/users', AdminController.getAllUsers);
router.get('/orders', AdminController.getAllOrders);
router.patch('/user/:id/toggle', AdminController.toggleUserStatus);
router.get('/stats', AdminController.getSystemStats);

export default router;

