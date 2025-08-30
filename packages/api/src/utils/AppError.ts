export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public status: string;
  public validationErrors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;


