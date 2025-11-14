# Socket.IO Real-Time Engine Testing Guide

## Prerequisites

1. **Start the Server**
   ```bash
   cd packages/api
   npm run dev
   ```

   You should see:
   ```
   🚀 Starting P2P Platform API Server...
   🔌 New socket connected: {socket-id}
   🚀 Server with Socket.IO running on port 3000
   ```

2. **Get Authentication Token** (for creating orders)
   ```bash
   # Register a new user
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123"
     }'
   
   # Or login with existing user
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{
       "email": "user1@test.com",
       "password": "password123"
     }'
   ```
   
   Save the `token` from the response.

---

## Method 1: Browser Console Testing

### Step 1: Open Browser Console
Open your browser's developer console (F12) and navigate to any page, or use:
```javascript
// In browser console
const socket = io('http://localhost:3000');

// Subscribe to market updates
socket.emit('subscribe_market');

// Listen for subscription confirmation
socket.on('subscribed', (data) => {
  console.log('✅ Subscribed to market:', data);
});

// Listen for order events
socket.on('order_created', (data) => {
  console.log('📢 New order created:', data);
});

socket.on('order_filled', (data) => {
  console.log('✅ Order filled:', data);
});

socket.on('order_cancelled', (data) => {
  console.log('❌ Order cancelled:', data);
});

// Connection events
socket.on('connect', () => {
  console.log('🔌 Connected to server');
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});
```

### Step 2: Create an Order (in another terminal)
```bash
curl -X POST http://localhost:3000/api/v1/orders/buy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "amount": 10,
    "price": 0.5
  }'
```

### Step 3: Verify
You should see in the browser console:
```
✅ Subscribed to market: { room: 'market_room' }
📢 New order created: { orderId: '...', type: 'buy', price: 0.5, amount: 10, ... }
```

---

## Method 2: Node.js Test Script

Create a test file: `packages/api/test-socketio.js`

```javascript
const io = require('socket.io-client');

// Connect to server
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling']
});

console.log('🔌 Connecting to Socket.IO server...');

// Connection events
socket.on('connect', () => {
  console.log('✅ Connected to server:', socket.id);
  
  // Subscribe to market updates
  socket.emit('subscribe_market');
});

socket.on('subscribed', (data) => {
  console.log('✅ Subscribed to market room:', data);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from server');
});

// Order events
socket.on('order_created', (data) => {
  console.log('\n📢 ORDER CREATED EVENT:');
  console.log('  Order ID:', data.orderId);
  console.log('  Type:', data.type);
  console.log('  Price:', data.price);
  console.log('  Amount:', data.amount);
  console.log('  Status:', data.status);
  console.log('');
});

socket.on('order_filled', (data) => {
  console.log('\n✅ ORDER FILLED EVENT:');
  console.log('  Order:', data.order);
  console.log('  Trade:', data.trade);
  console.log('');
});

socket.on('order_cancelled', (data) => {
  console.log('\n❌ ORDER CANCELLED EVENT:');
  console.log('  Order ID:', data.orderId);
  console.log('  Type:', data.type);
  console.log('  Status:', data.status);
  console.log('');
});

// Error handling
socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

// Keep the script running
console.log('👂 Listening for events... (Press Ctrl+C to exit)');
```

Run the test:
```bash
cd packages/api
node test-socketio.js
```

---

## Method 3: Postman WebSocket Testing

### Step 1: Create WebSocket Request in Postman
1. Open Postman
2. Click "New" → "WebSocket Request"
3. Enter URL: `ws://localhost:3000`
4. Click "Connect"

### Step 2: Subscribe to Market
In the message box, send:
```json
{
  "type": "subscribe_market"
}
```

Or use the event format:
- Event: `subscribe_market`
- Data: (empty)

### Step 3: Create Order via REST API
In another Postman tab:
- Method: `POST`
- URL: `http://localhost:3000/api/v1/orders/buy`
- Headers:
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN`
- Body:
```json
{
  "amount": 10,
  "price": 0.5
}
```

### Step 4: Check WebSocket Tab
You should see the `order_created` event in the WebSocket messages.

---

## Method 4: Complete Integration Test Script

Create: `packages/api/test-socketio-integration.js`

```javascript
const io = require('socket.io-client');
const axios = require('axios');

const SERVER_URL = 'http://localhost:3000';
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'password123';

async function testSocketIO() {
  console.log('🧪 Starting Socket.IO Integration Test\n');

  // Step 1: Register/Login to get token
  console.log('1️⃣ Authenticating...');
  let token;
  try {
    const loginResponse = await axios.post(`${SERVER_URL}/api/auth/login`, {
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
    token = loginResponse.data.token;
    console.log('✅ Authenticated, token received\n');
  } catch (error) {
    console.error('❌ Authentication failed:', error.response?.data || error.message);
    return;
  }

  // Step 2: Connect Socket.IO
  console.log('2️⃣ Connecting to Socket.IO...');
  const socket = io(SERVER_URL, {
    transports: ['websocket', 'polling']
  });

  let connected = false;
  let subscribed = false;

  socket.on('connect', () => {
    connected = true;
    console.log('✅ Connected:', socket.id);
    socket.emit('subscribe_market');
  });

  socket.on('subscribed', (data) => {
    subscribed = true;
    console.log('✅ Subscribed to market:', data.room);
  });

  socket.on('order_created', (data) => {
    console.log('\n📢 ORDER CREATED EVENT RECEIVED:');
    console.log('   Order ID:', data.orderId);
    console.log('   Type:', data.type);
    console.log('   Price:', data.price);
    console.log('   Amount:', data.amount);
    console.log('   Status:', data.status);
    console.log('');
  });

  socket.on('order_filled', (data) => {
    console.log('\n✅ ORDER FILLED EVENT RECEIVED');
    console.log('   Order:', data.order);
    console.log('   Trade:', data.trade);
  });

  socket.on('order_cancelled', (data) => {
    console.log('\n❌ ORDER CANCELLED EVENT RECEIVED');
    console.log('   Order ID:', data.orderId);
  });

  // Wait for connection
  await new Promise(resolve => {
    const checkConnection = setInterval(() => {
      if (connected && subscribed) {
        clearInterval(checkConnection);
        resolve();
      }
    }, 100);
  });

  // Step 3: Create a test order
  console.log('\n3️⃣ Creating test order...');
  try {
    const orderResponse = await axios.post(
      `${SERVER_URL}/api/v1/orders/buy`,
      {
        amount: 10,
        price: 0.5
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('✅ Order created:', orderResponse.data.order.id);
    console.log('   Waiting for Socket.IO event...\n');
  } catch (error) {
    console.error('❌ Order creation failed:', error.response?.data || error.message);
    socket.disconnect();
    return;
  }

  // Step 4: Wait for events
  console.log('4️⃣ Waiting 5 seconds for events...');
  await new Promise(resolve => setTimeout(resolve, 5000));

  // Cleanup
  socket.disconnect();
  console.log('\n✅ Test completed!');
}

// Run test
testSocketIO().catch(console.error);
```

Run:
```bash
cd packages/api
npm install socket.io-client axios  # If not already installed
node test-socketio-integration.js
```

---

## Method 5: Using Socket.IO Client Library

Install the client:
```bash
npm install socket.io-client
```

Then use in your code:
```javascript
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('subscribe_market');
});

socket.on('order_created', (data) => {
  console.log('Order created:', data);
});
```

---

## Testing Checklist

### ✅ Connection Tests
- [ ] Socket connects successfully
- [ ] Connection ID is received
- [ ] Disconnect event fires on close

### ✅ Subscription Tests
- [ ] `subscribe_market` event works
- [ ] `subscribed` confirmation received
- [ ] `unsubscribe_market` works
- [ ] `join_user_room` works with userId

### ✅ Order Event Tests
- [ ] `order_created` event fires when order is created
- [ ] Event data contains: orderId, type, price, amount, status
- [ ] `order_filled` event fires when order is matched
- [ ] `order_cancelled` event fires when order is cancelled

### ✅ Server Console Verification
Check server logs for:
```
🔌 New socket connected: {socket-id}
📊 Socket {socket-id} subscribed to market_room
📢 Emitted order_created event for order {order-id}
```

### ✅ Multiple Clients Test
1. Open multiple browser tabs/terminals
2. Connect all to Socket.IO
3. Subscribe all to market
4. Create one order
5. Verify all clients receive the event

---

## Troubleshooting

### Issue: "Connection refused"
**Solution**: Make sure the server is running on port 3000

### Issue: "CORS error"
**Solution**: Check that CORS is enabled in server.ts (should be `origin: '*'`)

### Issue: "No events received"
**Solution**: 
1. Verify you subscribed: `socket.emit('subscribe_market')`
2. Check server logs for event emissions
3. Verify order was created successfully

### Issue: "Socket disconnects immediately"
**Solution**: 
1. Check server is running
2. Verify port is correct
3. Check firewall settings

---

## Expected Server Output

When everything works, you should see:
```
🚀 Starting P2P Platform API Server...
📋 Environment: development
🔧 Port: 3000
🔧 Initializing services...
✅ Server with Socket.IO running on port 3000
🌐 API available at: http://localhost:3000/api
❤️  Health check: http://localhost:3000/api/health
🔌 WebSocket available at: ws://localhost:3000
📊 Environment: development
🔌 New socket connected: abc123
📊 Socket abc123 subscribed to market_room
📢 Emitted order_created event for order xyz789
```

---

## Quick Test Commands

```bash
# Terminal 1: Start server
cd packages/api && npm run dev

# Terminal 2: Test WebSocket (using Node.js)
node test-socketio.js

# Terminal 3: Create order
curl -X POST http://localhost:3000/api/v1/orders/buy \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"amount": 10, "price": 0.5}'
```

---

## Monitoring Socket Connections

Check active connections:
```bash
curl http://localhost:3000/api/monitor/system
```

Look for:
```json
{
  "sockets": {
    "active": 2,
    "rooms": 1
  }
}
```

