// packages/api/src/socket/index.ts
import { Server } from 'socket.io';
import registerOrderEvents from './events';

export default function registerSocketEvents(io: Server) {
  io.on('connection', (socket) => {
    console.log(`🔌 New socket connected: ${socket.id}`);
    registerOrderEvents(io, socket);

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
    });
  });
}
