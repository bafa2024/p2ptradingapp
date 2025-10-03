// src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

export interface AuthenticatedRequest extends Request {
  userId?: string;
  user?: {
    id: string;
    email: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers['authorization'];
  if (!header) {
    return res.status(401).json({ 
      success: false,
      error: 'missing_token',
      message: 'Authorization header is required'
    });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ 
      success: false,
      error: 'missing_token',
      message: 'Bearer token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    req.userId = decoded.userId;
    req.user = {
      id: decoded.userId,
      email: decoded.email
    };
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false,
      error: 'invalid_token',
      message: 'Invalid or expired token'
    });
  }
};