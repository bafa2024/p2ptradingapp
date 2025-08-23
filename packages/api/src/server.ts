import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/v1/auth';
import userRoutes from './routes/v1/user';
import walletRoutes from './routes/v1/wallet';
import tradingRoutes from './routes/v1/trading';
import adminRoutes from './routes/v1/admin';
import supportRoutes from './routes/v1/support';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';
import { authMiddleware } from './middleware/auth';

// Import database connection
import sequelize from './database/connection';

// Import WebSocket handlers
import { setupWebSocket } from './websocket/setup';

class App {
  public app: Application;
  public server: any;
  public io: Server;
  public port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env['API_PORT'] || '3000');
    this.server = createServer(this.app);
    this.io = new Server(this.server, {
      cors: {
        origin: process.env['CORS_ORIGIN']?.split(',') || ['http://localhost:3000'],
        methods: ['GET', 'POST']
      }
    });

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.setupWebSocket();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
    }));

    // CORS configuration
    this.app.use(cors({
      origin: process.env['CORS_ORIGIN']?.split(',') || ['http://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));

    // Body parsing middleware
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Compression middleware
    this.app.use(compression());

    // Logging middleware
    if (process.env['NODE_ENV'] === 'development') {
      this.app.use(morgan('dev'));
    } else {
      this.app.use(morgan('combined'));
    }

    // Rate limiting
    const limiter = rateLimit({
      windowMs: parseInt(process.env['RATE_LIMIT_WINDOW_MS'] || '900000'), // 15 minutes
      max: parseInt(process.env['RATE_LIMIT_MAX_REQUESTS'] || '100'), // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Health check endpoint
    this.app.get('/health', (_req: Request, res: Response) => {
      res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env['NODE_ENV'],
        version: process.env['APP_VERSION'] || '1.0.0'
      });
    });
  }

  private initializeRoutes(): void {
    // API routes
    this.app.use('/api/v1/auth', authRoutes);
    this.app.use('/api/v1/users', authMiddleware, userRoutes);
    this.app.use('/api/v1/wallets', authMiddleware, walletRoutes);
    this.app.use('/api/v1/trading', authMiddleware, tradingRoutes);
    this.app.use('/api/v1/admin', authMiddleware, adminRoutes);
    this.app.use('/api/v1/support', authMiddleware, supportRoutes);

    // API documentation
    this.app.get('/api', (_req: Request, res: Response) => {
      res.json({
        message: 'P2P Crypto Trading Platform API',
        version: 'v1',
        endpoints: {
          auth: '/api/v1/auth',
          users: '/api/v1/users',
          wallets: '/api/v1/wallets',
          trading: '/api/v1/trading',
          admin: '/api/v1/admin',
          support: '/api/v1/support'
        },
        documentation: '/api/docs'
      });
    });
  }

  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFound);
    
    // Global error handler
    this.app.use(errorHandler);
  }

  private setupWebSocket(): void {
    setupWebSocket(this.io);
  }

  public async start(): Promise<void> {
    try {
      // Test database connection
      try {
        await sequelize.authenticate();
        console.log('✅ Database connection established successfully.');
      } catch (dbError) {
        console.log('⚠️  Database connection failed, but starting server anyway...');
        console.log('   This is expected if the database or tables don\'t exist yet.');
      }

      // Start server
      this.server.listen(this.port, () => {
        console.log(`🚀 Server is running on port ${this.port}`);
        console.log(`📱 Environment: ${process.env['NODE_ENV'] || 'development'}`);
        console.log(`🔗 Health check: http://localhost:${this.port}/health`);
        console.log(`📚 API docs: http://localhost:${this.port}/api`);
      });

    } catch (error) {
      console.error('❌ Failed to start server:', error);
      process.exit(1);
    }
  }

  public async stop(): Promise<void> {
    try {
      await sequelize.close();
      this.server.close();
      console.log('🛑 Server stopped successfully');
    } catch (error) {
      console.error('❌ Error stopping server:', error);
    }
  }
}

// Handle graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🔄 SIGTERM received, shutting down gracefully...');
  const app = new App();
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🔄 SIGINT received, shutting down gracefully...');
  const app = new App();
  await app.stop();
  process.exit(0);
});

// Start the application
if (require.main === module) {
  const app = new App();
  app.start();
}

export default App;
