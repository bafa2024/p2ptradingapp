const { Wallet, User } = require('./dist/models');

async function testWallet() {
  try {
    console.log('Testing Wallet model...');
    
    // Test Wallet.sync
    await Wallet.sync();
    console.log('✅ Wallet.sync() works');
    
    // Test finding a wallet by user_id
    const wallets = await Wallet.findAll();
    console.log(`✅ Found ${wallets.length} wallets`);
    
    if (wallets.length > 0) {
      const firstWallet = wallets[0];
      console.log('✅ Wallet.findOne works');
      console.log('Sample wallet:', {
        id: firstWallet.id,
        user_id: firstWallet.user_id,
        usdt_available: firstWallet.usdt_available,
        usdt_locked: firstWallet.usdt_locked,
        total_usdt: firstWallet.total_usdt
      });
      
      // Test finding wallet by user_id
      const walletByUserId = await Wallet.findOne({ where: { user_id: firstWallet.user_id } });
      if (walletByUserId) {
        console.log('✅ Wallet.findOne({ where: { user_id } }) works');
      }
    }
    
    // Test User.wallet association
    const users = await User.findAll();
    if (users.length > 0) {
      const user = users[0];
      const userWithWallet = await User.findByPk(user.id, { include: ['wallet'] });
      if (userWithWallet && userWithWallet.wallet) {
        console.log('✅ User.wallet association works');
        console.log('User with wallet:', {
          user_id: userWithWallet.id,
          email: userWithWallet.email,
          wallet_id: userWithWallet.wallet.id,
          wallet_balance: userWithWallet.wallet.total_usdt
        });
      }
    }
    
    console.log('✅ All Wallet model tests passed!');
    
  } catch (error) {
    console.error('❌ Wallet model test failed:', error);
  }
}

testWallet();

