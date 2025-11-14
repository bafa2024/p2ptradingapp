// packages/api/src/socket/events.ts
import { Server, Socket } from 'socket.io';

export default function registerOrderEvents(io: Server, socket: Socket) {
  // Subscribe to market updates
  socket.on('subscribe_market', () => {
    socket.join('market_room');
    socket.emit('subscribed', { room: 'market_room' });
    console.log(`📊 Socket ${socket.id} subscribed to market_room`);
  });

  // Unsubscribe from market updates
  socket.on('unsubscribe_market', () => {
    socket.leave('market_room');
    socket.emit('unsubscribed', { room: 'market_room' });
    console.log(`📊 Socket ${socket.id} unsubscribed from market_room`);
  });

  // Join user-specific room
  socket.on('join_user_room', (userId: string) => {
    if (userId) {
      socket.join(`user:${userId}`);
      socket.emit('joined_user_room', { userId });
      console.log(`👤 Socket ${socket.id} joined user room: ${userId}`);
    }
  });
}

// Event emitters for order updates (called from controllers)
export function emitOrderCreated(io: Server, orderData: any): void {
  io.to('market_room').emit('order_created', orderData);
  console.log(`📢 Emitted order_created event for order ${orderData.id || orderData.orderId}`);
}

export function emitOrderFilled(io: Server, orderData: any, tradeData?: any): void {
  io.to('market_room').emit('order_filled', {
    order: orderData,
    trade: tradeData
  });
  console.log(`📢 Emitted order_filled event for order ${orderData.id || orderData.orderId}`);
}

export function emitOrderCancelled(io: Server, orderData: any): void {
  const userId = orderData.user_id || orderData.userId;
  
  // Notify market room
  io.to('market_room').emit('order_cancelled', orderData);
  
  // Also notify specific user if available
  if (userId) {
    io.to(`user:${userId}`).emit('order_cancelled', orderData);
  }
  
  console.log(`📢 Emitted order_cancelled event for order ${orderData.id || orderData.orderId}`);
}

