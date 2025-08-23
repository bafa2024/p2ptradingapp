import sequelize from './connection';

const testSequelizeConnection = async () => {
  console.log('🔍 Testing Sequelize connection...');
  
  try {
    // Test authentication
    await sequelize.authenticate();
    console.log('✅ Sequelize connection established successfully!');

    // Get database info
    const dbInfo = sequelize.getDatabaseName();
    const dialect = sequelize.getDialect();
    console.log(`📊 Connected to: ${dbInfo} (${dialect})`);

    // Test a simple query
    console.log('\n🔍 Testing simple query...');
    const [results] = await sequelize.query('SELECT COUNT(*) as table_count FROM information_schema.tables WHERE table_schema = ?', {
      replacements: [dbInfo],
    });
    
    if (Array.isArray(results) && results.length > 0) {
      const tableCount = (results[0] as any).table_count;
      console.log(`📋 Found ${tableCount} tables in database`);
    }

    // List tables
    console.log('\n📋 Listing tables...');
    const [tables] = await sequelize.query('SHOW TABLES');
    
    if (Array.isArray(tables)) {
      console.log('Tables in database:');
      tables.forEach((table: any) => {
        const tableName = Object.values(table)[0];
        console.log(`  - ${tableName}`);
      });
    }

    // Test a query on existing tables
    console.log('\n👥 Testing user table query...');
    try {
      const [users] = await sequelize.query('SELECT COUNT(*) as user_count FROM users');
      if (Array.isArray(users) && users.length > 0) {
        const userCount = (users[0] as any).user_count;
        console.log(`👥 Found ${userCount} users in database`);
      }
    } catch (queryError) {
      console.log('ℹ️  User table might be empty or have different structure');
    }

    console.log('\n🎉 Sequelize connection test completed successfully!');
    return true;

  } catch (error) {
    console.error('\n❌ Sequelize connection test failed:');
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return false;
  } finally {
    // Close the connection
    await sequelize.close();
    console.log('🔐 Database connection closed');
  }
};

// Export for use in other files
export { testSequelizeConnection };

// Run test if this file is executed directly
if (require.main === module) {
  testSequelizeConnection()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}


