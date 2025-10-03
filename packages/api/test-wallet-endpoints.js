const axios = require('axios');

const BASE_URL = 'http://localhost:8080/api/v1';

async function testWalletEndpoints() {
  try {
    console.log('🧪 Testing Wallet Endpoints...\n');

    // 1. Register a new user
    console.log('1. Registering new user...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      email: 'test6@example.com',
      password: '123456'
    });
    
    console.log('✅ Registration successful');
    console.log('Response:', JSON.stringify(registerResponse.data, null, 2));
    
    const token = registerResponse.data.token;
    const userId = registerResponse.data.user.id;
    
    if (!token) {
      throw new Error('No token received from registration');
    }

    console.log('\n2. Testing wallet balance endpoint...');
    const balanceResponse = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Balance endpoint successful');
    console.log('Response:', JSON.stringify(balanceResponse.data, null, 2));

    console.log('\n3. Testing wallet deposit...');
    const depositResponse = await axios.post(`${BASE_URL}/wallet/deposit`, {
      amount: 100
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Deposit successful');
    console.log('Response:', JSON.stringify(depositResponse.data, null, 2));

    console.log('\n4. Testing wallet balance after deposit...');
    const balanceAfterDeposit = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Balance after deposit');
    console.log('Response:', JSON.stringify(balanceAfterDeposit.data, null, 2));

    console.log('\n5. Testing wallet withdrawal...');
    const withdrawResponse = await axios.post(`${BASE_URL}/wallet/withdraw`, {
      amount: 50
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Withdrawal successful');
    console.log('Response:', JSON.stringify(withdrawResponse.data, null, 2));

    console.log('\n6. Testing final balance...');
    const finalBalance = await axios.get(`${BASE_URL}/wallet/balance`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    console.log('✅ Final balance');
    console.log('Response:', JSON.stringify(finalBalance.data, null, 2));

    console.log('\n🎉 All wallet endpoint tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

testWalletEndpoints();

