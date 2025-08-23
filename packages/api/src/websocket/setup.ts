import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';

export const setupWebSocket = (io: Server): void => {
  // Middleware for authentication
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.headers.authorization;
      
      if (!token) {
        return next(new Error('Authentication error: No token provided'));
      }

      // Verify token and attach user to socket
      const decoded = jwt.verify(token, process.env['JWT_SECRET'] || 'fallback-secret') as any;
      socket.data.user = decoded;
      next();
    } catch (error) {
      next(new Error('Authentication error: Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    console.log(`🔌 User connected: ${socket.id}`);
    
    // Join user to their personal room
    if (socket.data.user?.id) {
      socket.join(`user:${socket.data.user.id}`);
      console.log(`👤 User ${socket.data.user.id} joined personal room`);
    }

    // Handle trading events
    socket.on('join_trade_room', (tradeId: string) => {
      socket.join(`trade:${tradeId}`);
      console.log(`📊 User joined trade room: ${tradeId}`);
    });

    socket.on('leave_trade_room', (tradeId: string) => {
      socket.leave(`trade:${tradeId}`);
      console.log(`📊 User left trade room: ${tradeId}`);
    });

    // Handle chat events
    socket.on('join_chat', (chatId: string) => {
      socket.join(`chat:${chatId}`);
      console.log(`💬 User joined chat: ${chatId}`);
    });

    socket.on('leave_chat', (chatId: string) => {
      socket.leave(`chat:${chatId}`);
      console.log(`💬 User left chat: ${chatId}`);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
      console.log(`🔌 User disconnected: ${socket.id}`);
    });
  });

  // Export io instance for use in other parts of the application
  (global as any).io = io;
};

// Helper functions for emitting events
export const emitToUser = (userId: string, event: string, data: any): void => {
  const io = (global as any).io;
  if (io) {
    io.to(`user:${userId}`).emit(event, data);
  }
};

export const emitToTrade = (tradeId: string, event: string, data: any): void => {
  const io = (global as any).io;
  if (io) {
    io.to(`trade:${tradeId}`).emit(event, data);
  }
};

export const emitToChat = (chatId: string, event: string, data: any): void => {
  const io = (global as any).io;
  if (io) {
    io.to(`chat:${chatId}`).emit(event, data);
  }
};

export const emitToAll = (event: string, data: any): void => {
  const io = (global as any).io;
  if (io) {
    io.emit(event, data);
  }
};
