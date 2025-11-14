// packages/api/src/socket/index.ts
import { Server as SocketIOServer, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { setupSocketEvents } from './events';

export interface SocketUser {
  userId: string;
  socketId: string;
}

// Store active socket connections
export const activeConnections = new Map<string, SocketUser[]>();

export function initializeSocket(httpServer: HTTPServer): SocketIOServer {
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
      credentials: true
    },
    transports: ['websocket', 'polling']
  });

  // Setup event handlers
  setupSocketEvents(io);

  console.log('✅ Socket.IO server initialized');
  return io;
}

export function getSocketIO(io: SocketIOServer | null): SocketIOServer {
  if (!io) {
    throw new Error('Socket.IO server not initialized');
  }
  return io;
}

