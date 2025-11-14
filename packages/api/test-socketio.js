// Simple Socket.IO Test Script
const io = require('socket.io-client');

console.log('🔌 Connecting to Socket.IO server at http://localhost:3000...\n');

// Connect to server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

// Connection events
socket.on('connect', () => {
  console.log('✅ Connected to server!');
  console.log('   Socket ID:', socket.id);
  console.log('');
  
  // Subscribe to market updates
  console.log('📊 Subscribing to market updates...');
  socket.emit('subscribe_market');
});

socket.on('subscribed', (data) => {
  console.log('✅ Subscribed to market room:', data.room);
  console.log('👂 Listening for order events...\n');
  console.log('💡 Now create an order using:');
  console.log('   curl -X POST http://localhost:3000/api/v1/orders/buy \\');
  console.log('     -H "Content-Type: application/json" \\');
  console.log('     -H "Authorization: Bearer YOUR_TOKEN" \\');
  console.log('     -d \'{"amount": 10, "price": 0.5}\'\n');
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

// Order events
socket.on('order_created', (data) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('📢 ORDER CREATED EVENT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Order ID:  ', data.orderId);
  console.log('   Type:      ', data.type);
  console.log('   Price:     ', data.price);
  console.log('   Amount:    ', data.amount);
  console.log('   Status:    ', data.status);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

socket.on('order_filled', (data) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('✅ ORDER FILLED EVENT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Order:', data.order);
  console.log('   Trade:', data.trade);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

socket.on('order_cancelled', (data) => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('❌ ORDER CANCELLED EVENT');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('   Order ID:  ', data.orderId);
  console.log('   Type:      ', data.type);
  console.log('   Status:    ', data.status);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
});

// Error handling
socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  console.error('   Make sure the server is running on port 3000');
  process.exit(1);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

// Keep script running
console.log('Press Ctrl+C to exit\n');

