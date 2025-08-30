import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../utils/AppError';
import logger from '../utils/logger';
import { User } from '../models';
import { FirebaseService } from '../services/firebase.service';

interface AuthRequest extends Request {
      user?: any;
  token?: any;
}

interface JwtPayload {
  userId: string;
  email: string;
  type: string;
  iat: number;
  exp: number;
}

export class AuthMiddleware {
  private firebaseService: FirebaseService;

  constructor() {
    this.firebaseService = new FirebaseService();
  }

  /**
   * Verify JWT access token
   */
  verifyJWT = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Access token is required', 401);
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      // Verify JWT token
      const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
      
      if (decoded.type !== 'access') {
        throw new AppError('Invalid token type', 401);
      }

      // Check if user exists and is active
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        throw new AppError('User not found', 401);
      }

      if (!user.is_active) {
        throw new AppError('User account is deactivated', 403);
      }

      if (user.is_banned) {
        throw new AppError('User account is banned', 403);
      }

      // Update last active timestamp
      await user.updateLastActive();

      // Attach user to request
      req.user = user;
      req.token = decoded;

      next();
    } catch (error) {
      if (error instanceof AppError) {
        next(error);
        return;
      }

      if (error instanceof jwt.JsonWebTokenError) {
        next(new AppError('Invalid access token', 401));
        return;
      }

      if (error instanceof jwt.TokenExpiredError) {
        next(new AppError('Access token expired', 401));
        return;
      }

      logger.error('JWT verification error:', error);
      next(new AppError('Authentication failed', 401));
    }
  };

  /**
   * Verify Firebase ID token
   */
  verifyFirebaseToken = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new AppError('Firebase ID token is required', 401);
      }

      const token = authHeader.substring(7); // Remove 'Bearer ' prefix

      // Verify Firebase ID token
      const decodedToken = await this.firebaseService.verifyIdToken(token);
      
      // Check if user exists and is active
      const user = await User.findOne({ where: { firebase_uid: decodedToken.uid } });
      if (!user) {
        throw new AppError('User not found', 401);
      }

      if (!user.is_active) {
        throw new AppError('User account is deactivated', 403);
      }

      if (user.is_banned) {
        throw new AppError('User account is banned', 403);
      }

      // Update last active timestamp
      await user.updateLastActive();

      // Attach user to request
      req.user = user;
      req.token = decodedToken;

      next();
    } catch (error) {
      if (error instanceof AppError) {
        next(error);
        return;
      }

      logger.error('Firebase token verification error:', error);
      next(new AppError('Authentication failed', 401));
    }
  };

  /**
   * Optional authentication (user may or may not be authenticated)
   */
  optionalAuth = async (req: AuthRequest, _res: Response, next: NextFunction): Promise<void> => {
    try {
      const authHeader = req.headers.authorization;
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // No token provided, continue without authentication
        next();
        return;
      }

      const token = authHeader.substring(7);

      try {
        // Try JWT first
        const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
        
        if (decoded.type === 'access') {
          const user = await User.findByPk(decoded.userId);
          if (user && user.is_active && !user.is_banned) {
            req.user = user;
            req.token = decoded;
          }
        }
      } catch (jwtError) {
        // JWT failed, try Firebase
        try {
          const decodedToken = await this.firebaseService.verifyIdToken(token);
          const user = await User.findOne({ where: { firebase_uid: decodedToken.uid } });
          if (user && user.is_active && !user.is_banned) {
            req.user = user;
            req.token = decodedToken;
          }
        } catch (firebaseError) {
          // Both failed, continue without authentication
          logger.debug('Optional authentication failed:', firebaseError);
        }
      }

      next();
    } catch (error) {
      // Log error but continue without authentication
      logger.debug('Optional authentication error:', error);
      next();
    }
  };

  /**
   * Role-based access control
   */
  requireRole = (allowedRoles: string[]) => {
    return (req: AuthRequest, _res: Response, next: NextFunction): void => {
      if (!req.user) {
        next(new AppError('Authentication required', 401));
        return;
      }

      if (!allowedRoles.includes(req.user.role)) {
        next(new AppError('Insufficient permissions', 403));
        return;
      }

      next();
    };
  };

  /**
   * KYC verification required
   */
  requireKYC = (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    if (req.user.kyc_status !== 'approved') {
      next(new AppError('KYC verification required', 403));
      return;
    }

    next();
  };

  /**
   * Phone verification required
   */
  requirePhoneVerification = (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    if (!req.user.is_verified) {
      next(new AppError('Phone verification required', 403));
      return;
    }

    next();
  };

  /**
   * Rate limiting for authentication attempts
   */
  authRateLimit = (req: Request, _res: Response, next: NextFunction): void => {
    // This is a basic implementation
    // In production, you should use a proper rate limiting library like express-rate-limit
    
    const clientIP = req.ip;
    const now = Date.now();
    
    // Simple in-memory rate limiting (not suitable for production)
    if (!req.app.locals['authAttempts']) {
      req.app.locals['authAttempts'] = new Map();
    }
    
    const attempts = req.app.locals['authAttempts'].get(clientIP) || [];
    const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < 15 * 60 * 1000); // 15 minutes
    
    if (recentAttempts.length >= 5) {
      next(new AppError('Too many authentication attempts. Please try again later.', 429));
      return;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    req.app.locals['authAttempts'].set(clientIP, recentAttempts);
    
    next();
  };

  /**
   * Check if user is the owner of a resource
   */
  requireOwnership = (resourceUserIdField: string = 'user_id') => {
    return (req: AuthRequest, _res: Response, next: NextFunction): void => {
      if (!req.user) {
        next(new AppError('Authentication required', 401));
        return;
      }

      const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
      
      if (!resourceUserId) {
        next(new AppError('Resource user ID not found', 400));
        return;
      }

      if (req.user.id !== resourceUserId) {
        next(new AppError('Access denied. You can only access your own resources.', 403));
        return;
      }

      next();
    };
  };

  /**
   * Check if user is admin
   */
  requireAdmin = (req: AuthRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('Authentication required', 401));
      return;
    }

    // Check if user has admin role (you might want to add an admin field to your User model)
    if (req.user.membership_status !== 'vip') {
      next(new AppError('Admin access required', 403));
      return;
    }

    next();
  };
  }

export default new AuthMiddleware();
