// packages/api/src/socket/events.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import { activeConnections } from './index';

export function setupSocketEvents(io: SocketIOServer): void {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Client connected: ${socket.id}`);

    // Join user to their personal room
    socket.on('join_user_room', (userId: string) => {
      if (userId) {
        socket.join(`user:${userId}`);
        console.log(`👤 User ${userId} joined their room`);
        
        // Track connection
        if (!activeConnections.has(userId)) {
          activeConnections.set(userId, []);
        }
        activeConnections.get(userId)?.push({
          userId,
          socketId: socket.id
        });
      }
    });

    // Join market updates room
    socket.on('join_market', () => {
      socket.join('market_updates');
      console.log(`📊 Client ${socket.id} joined market updates`);
    });

    // Leave market updates
    socket.on('leave_market', () => {
      socket.leave('market_updates');
      console.log(`📊 Client ${socket.id} left market updates`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`🔌 Client disconnected: ${socket.id}`);
      
      // Remove from active connections
      for (const [userId, connections] of activeConnections.entries()) {
        const filtered = connections.filter(conn => conn.socketId !== socket.id);
        if (filtered.length === 0) {
          activeConnections.delete(userId);
        } else {
          activeConnections.set(userId, filtered);
        }
      }
    });

    // Ping/pong for connection health
    socket.on('ping', () => {
      socket.emit('pong');
    });
  });
}

// Event emitters for order updates
export function emitOrderCreated(io: SocketIOServer, orderData: any): void {
  io.to('market_updates').emit('order_created', orderData);
  console.log(`📢 Emitted order_created event for order ${orderData.id}`);
}

export function emitOrderFilled(io: SocketIOServer, orderData: any, tradeData: any): void {
  io.to('market_updates').emit('order_filled', {
    order: orderData,
    trade: tradeData
  });
  console.log(`📢 Emitted order_filled event for order ${orderData.id}`);
}

export function emitOrderCancelled(io: SocketIOServer, orderData: any): void {
  const userId = orderData.user_id || orderData.userId;
  
  // Notify market and specific user
  io.to('market_updates').emit('order_cancelled', orderData);
  if (userId) {
    io.to(`user:${userId}`).emit('order_cancelled', orderData);
  }
  console.log(`📢 Emitted order_cancelled event for order ${orderData.id}`);
}

