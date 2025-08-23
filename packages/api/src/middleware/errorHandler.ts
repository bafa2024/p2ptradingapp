import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
  code?: string;
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log error for debugging
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString()
  });

  // Sequelize validation error
  if (err.name === 'SequelizeValidationError') {
    const message = Object.values((err as any).errors).map((val: any) => val.message).join(', ');
    error.message = message;
    error.statusCode = 400;
  }

  // Sequelize unique constraint error
  if (err.name === 'SequelizeUniqueConstraintError') {
    const message = 'Duplicate field value entered';
    error.message = message;
    error.statusCode = 400;
  }

  // Sequelize foreign key constraint error
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    const message = 'Referenced record does not exist';
    error.message = message;
    error.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error.message = message;
    error.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error.message = message;
    error.statusCode = 401;
  }

  // Multer file upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    const message = 'File too large';
    error.message = message;
    error.statusCode = 400;
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    const message = 'Unexpected file field';
    error.message = message;
    error.statusCode = 400;
  }

  // Rate limiting error
  if (err.statusCode === 429) {
    error.message = 'Too many requests, please try again later';
  }

  // Default error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    },
    timestamp: new Date().toISOString(),
    path: req.url,
    method: req.method
  });
};
