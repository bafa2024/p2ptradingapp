// src/server.ts
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './routes/v1/auth';
import walletRouter from './routes/v1/wallet';
import orderRouter from './routes/v1/order';
import healthRouter from './routes/v1/health';
import adminRouter from './routes/admin';
import monitorRouter from './routes/monitor';
import { features } from './config/features';
import { authMiddleware } from './middleware/auth';
import { Wallet } from './models/Wallet';
import { Op } from 'sequelize';
import Transaction from './models/Transaction';
import registerSocketEvents from './socket';
import { Server } from 'socket.io';

// Export io for use in controllers
export let io: Server;

// Load environment variables
const NODE_ENV = process.env['NODE_ENV'] || 'development';
const PORT = Number(process.env['PORT'] || 3000);

console.log('🚀 Starting P2P Platform API Server...');
console.log(`📋 Environment: ${NODE_ENV}`);
console.log(`🔧 Port: ${PORT}`);

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use(morgan(NODE_ENV === 'development' ? 'dev' : 'combined'));

// API routes
app.use('/api', healthRouter);
app.use('/api/v1/auth', authRouter);
// Also mount auth routes at /api/auth for compatibility
app.use('/api/auth', authRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/admin', adminRouter);
app.use('/api/monitor', monitorRouter);

// Transactions history
app.get('/api/v1/transactions', authMiddleware, async (req, res) => {
  try {
    const userId = (req as any).userId as string;
    console.log('Fetching transactions for user:', userId);
    
    const txns = await Transaction.findAll({
      where: {
        [Op.or]: [
          { buyer_id: userId },
          { seller_id: userId }
        ]
      },
      order: [['created_at', 'DESC']]
    });
    
    console.log('Found transactions:', txns.length);
    return res.json({ 
      success: true, 
      transactions: txns.map(txn => ({
        id: txn.id,
        buyer_id: txn.buyer_id,
        seller_id: txn.seller_id,
        amount: txn.amount,
        price: txn.price,
        created_at: txn.created_at
      }))
    });
  } catch (error) {
    console.error('Transactions fetch error:', error);
    return res.status(500).json({ 
      success: false, 
      error: 'transactions_fetch_failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Conditionally mount wallet routes
if (!features.walletDisabled) {
  app.use('/api/v1/wallet', walletRouter);
} else {
  // Placeholder wallet endpoint when disabled
  app.use('/api/v1/wallet', (req, res) => {
    res.json({ walletDisabled: true });
  });
}

// Dedicated wallet router for /api/wallet routes
const walletApiRouter = express.Router();

// GET balance
walletApiRouter.get('/balance', authMiddleware, async (req: any, res) => {
  try {
    const wallet = await Wallet.findOne({ where: { user_id: req.userId } });
    if (!wallet) {
      return res.status(400).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }
    res.json({ 
      success: true, 
      wallet: { 
        balance: wallet.total_usdt, 
        status: 'enabled' 
      } 
    });
  } catch (error) {
    console.error('[wallet balance] error:', error);
    res.status(500).json({
      success: false,
      error: 'wallet_fetch_failed',
      message: 'Failed to fetch wallet balance'
    });
  }
});

// POST deposit
walletApiRouter.post('/deposit', authMiddleware, async (req: any, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'invalid_amount',
        message: 'Amount must be a positive number'
      });
    }

    let wallet = await Wallet.findOne({ where: { user_id: req.userId } });
    if (!wallet) {
      return res.status(400).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Increase available balance
    wallet.usdt_available = Number(wallet.usdt_available) + Number(amount);
    await wallet.save();

    res.json({ 
      success: true, 
      wallet: { 
        balance: wallet.total_usdt, 
        status: 'enabled' 
      } 
    });
  } catch (error) {
    console.error('[wallet deposit] error:', error);
    res.status(500).json({
      success: false,
      error: 'deposit_failed',
      message: 'Failed to process deposit'
    });
  }
});

// POST withdraw
walletApiRouter.post('/withdraw', authMiddleware, async (req: any, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) {
      return res.status(400).json({ 
        success: false,
        error: 'invalid_amount',
        message: 'Amount must be a positive number'
      });
    }

    let wallet = await Wallet.findOne({ where: { user_id: req.userId } });
    if (!wallet) {
      return res.status(400).json({ 
        success: false,
        error: 'wallet_not_found',
        message: 'Wallet not found for user'
      });
    }

    // Check if sufficient funds (only check available balance for withdrawals)
    if (Number(wallet.usdt_available) < amount) {
      return res.status(400).json({ 
        success: false,
        error: 'insufficient_funds',
        message: 'Insufficient wallet balance'
      });
    }

    // Decrease available balance
    wallet.usdt_available = Number(wallet.usdt_available) - Number(amount);
    await wallet.save();

    res.json({ 
      success: true, 
      wallet: { 
        balance: wallet.total_usdt, 
        status: 'enabled' 
      } 
    });
  } catch (error) {
    console.error('[wallet withdraw] error:', error);
    res.status(500).json({
      success: false,
      error: 'withdraw_failed',
      message: 'Failed to process withdrawal'
    });
  }
});

// Mount the dedicated wallet router
app.use('/api/wallet', walletApiRouter);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: 'P2P Platform API',
    version: process.env['npm_package_version'] || 'dev',
    environment: NODE_ENV,
    health: '/api/health'
  });
});

// 404 handler
app.use('*', (_req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource was not found',
    path: _req.originalUrl
  });
});

// Example: only start wallet watcher if enabled
function startWalletWatcher() {
  // NO-OP here; implement your Tron watcher later
  console.log('🔍 [watcher] Wallet watcher started (placeholder)');
}

// Start server
(async () => {
  try {
    console.log('🔧 Initializing services...');
    
    if (!features.walletDisabled) {
      startWalletWatcher();
    } else {
      console.log('⚠️  [watcher] Wallet disabled: watcher not started');
    }

    // Create HTTP server from Express app
    const httpServer = createServer(app);
    
    // Initialize Socket.IO
    io = new Server(httpServer, {
      cors: { origin: '*', methods: ['GET', 'POST'] },
    });

    // Register Socket.IO events
    registerSocketEvents(io);
    
    // Make io available globally for use in controllers
    (global as any).io = io;

    // Start HTTP server (with Socket.IO support)
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server with Socket.IO running on port ${PORT}`);
      console.log(`🌐 API available at: http://localhost:${PORT}/api`);
      console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
      console.log(`🔌 WebSocket available at: ws://localhost:${PORT}`);
      console.log('📊 Environment:', NODE_ENV);
    });
  } catch (error) {
    console.error('❌ Startup failed:', error);
    process.exit(1);
  }
})();
