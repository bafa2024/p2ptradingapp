// Sequelize Test Script for OKX Platform
// This script tests the Sequelize setup and models

const { sequelize } = require('./database/connection');
const { User, Wallet, Trade, initializeAssociations } = require('./models');

async function testSequelizeSetup() {
  try {
    console.log('🧪 Testing Sequelize Setup...');
    console.log('=====================================');
    
    // Test database connection
    console.log('1. Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection successful');
    
    // Test model associations
    console.log('\n2. Testing model associations...');
    initializeAssociations();
    console.log('✅ Model associations initialized');
    
    // Test model definitions
    console.log('\n3. Testing model definitions...');
    
    // Test User model
    console.log('   - Testing User model...');
    const userAttributes = Object.keys(User.rawAttributes);
    console.log(`     ✅ User model has ${userAttributes.length} attributes`);
    
    // Test Wallet model
    console.log('   - Testing Wallet model...');
    const walletAttributes = Object.keys(Wallet.rawAttributes);
    console.log(`     ✅ Wallet model has ${walletAttributes.length} attributes`);
    
    // Test Trade model
    console.log('   - Testing Trade model...');
    const tradeAttributes = Object.keys(Trade.rawAttributes);
    console.log(`     ✅ Trade model has ${tradeAttributes.length} attributes`);
    
    // Test model methods
    console.log('\n4. Testing model methods...');
    
    // Test User methods
    console.log('   - Testing User methods...');
    const userMethods = Object.getOwnPropertyNames(User.prototype);
    console.log(`     ✅ User model has ${userMethods.length} instance methods`);
    
    // Test Wallet methods
    console.log('   - Testing Wallet methods...');
    const walletMethods = Object.getOwnPropertyNames(Wallet.prototype);
    console.log(`     ✅ Wallet model has ${walletMethods.length} instance methods`);
    
    // Test Trade methods
    console.log('   - Testing Trade methods...');
    const tradeMethods = Object.getOwnPropertyNames(Trade.prototype);
    console.log(`     ✅ Trade model has ${tradeMethods.length} instance methods`);
    
    // Test database sync (without force)
    console.log('\n5. Testing database sync...');
    await sequelize.sync({ force: false });
    console.log('✅ Database sync successful');
    
    console.log('\n=====================================');
    console.log('🎉 All Sequelize tests passed successfully!');
    console.log('\nNext steps:');
    console.log('1. Create your .env file with database credentials');
    console.log('2. Run migrations: node database/runMigrations.js');
    console.log('3. Test with sample data');
    
  } catch (error) {
    console.error('\n=====================================');
    console.error('💥 Sequelize test failed!');
    console.error('Error:', error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check database connection settings');
    console.error('2. Ensure MySQL server is running');
    console.error('3. Verify database credentials');
    console.error('4. Check if database exists');
    
    throw error;
  }
}

// Run tests if called directly
if (require.main === module) {
  testSequelizeSetup()
    .then(() => {
      console.log('\n✅ Test script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n❌ Test script failed:', error.message);
      process.exit(1);
    });
}

module.exports = { testSequelizeSetup };
