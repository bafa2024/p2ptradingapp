// packages/api/src/middleware/admin.ts
import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth';
import { User } from '../models/User';

export const isAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        error: 'unauthorized',
        message: 'Authentication required'
      });
    }

    const user = await User.findByPk(req.userId);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'user_not_found',
        message: 'User not found'
      });
    }

    // Check if user has admin role
    const userRole = (user as any).role || 'user';
    if (userRole !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'forbidden',
        message: 'Admin access required'
      });
    }

    next();
  } catch (error) {
    console.error('[isAdmin] error:', error);
    return res.status(500).json({
      success: false,
      error: 'admin_check_failed',
      message: 'Failed to verify admin status'
    });
  }
};

