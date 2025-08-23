import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError';

// Extend Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      throw new AppError('Access denied. No token provided.', 401);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback-secret') as any;
      
      // Add user to request object
      req.user = decoded;
      
      next();
    } catch (error) {
      throw new AppError('Invalid token.', 401);
    }
  } catch (error) {
    next(error);
  }
};

export const optionalAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token: string | undefined;

    // Check for token in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        // Verify token
        const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback-secret') as any;
        
        // Add user to request object
        req.user = decoded;
      } catch (error) {
        // Token is invalid, but we continue without user
        req.user = undefined;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const adminAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // First check if user is authenticated
    await authMiddleware(req, res, (err) => {
      if (err) throw err;
    });

    // Check if user is admin
    if (req.user?.role !== 'admin' && req.user?.membership_tier !== 'premium') {
      throw new AppError('Access denied. Admin privileges required.', 403);
    }

    next();
  } catch (error) {
    next(error);
  }
};
