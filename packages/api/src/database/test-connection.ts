import mysql from 'mysql2/promise';

interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database?: string;
}

const testDatabaseConnection = async () => {
  // Default XAMPP MySQL configuration
  const config: DatabaseConfig = {
    host: process.env['DB_HOST'] || 'localhost',
    port: parseInt(process.env['DB_PORT'] || '3306'),
    user: process.env['DB_USER'] || 'root',
    password: process.env['DB_PASSWORD'] || '', // XAMPP default is empty password
  };

  console.log('🔍 Testing database connection...');
  console.log('📋 Configuration:', {
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password ? '***' : '(empty)',
  });

  try {
    // Test basic connection to MySQL server
    console.log('\n📡 Connecting to MySQL server...');
    const connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
    });

    console.log('✅ Connected to MySQL server successfully!');

    // List available databases
    console.log('\n📊 Available databases:');
    const [databases] = await connection.execute('SHOW DATABASES');
    
    if (Array.isArray(databases)) {
      databases.forEach((db: any) => {
        console.log(`  - ${db.Database}`);
      });
    }

    // Check if our target databases exist
    const targetDatabases = ['p2p_platform', 'p2p_platform_dev'];
    const existingDatabases = Array.isArray(databases) 
      ? databases.map((db: any) => db.Database)
      : [];

    console.log('\n🎯 Target databases status:');
    for (const dbName of targetDatabases) {
      const exists = existingDatabases.includes(dbName);
      console.log(`  - ${dbName}: ${exists ? '✅ EXISTS' : '❌ NOT FOUND'}`);
      
      if (!exists) {
        console.log(`\n🔧 Creating database: ${dbName}`);
        try {
          await connection.execute(`CREATE DATABASE \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
          console.log(`✅ Database ${dbName} created successfully!`);
        } catch (createError) {
          console.error(`❌ Failed to create database ${dbName}:`, createError);
        }
      }
    }

    // Test connection to our main database
    console.log('\n🔗 Testing connection to p2p_platform database...');
    await connection.changeUser({ database: 'p2p_platform' });
    console.log('✅ Connected to p2p_platform database successfully!');

    // Show tables in the database
    console.log('\n📋 Tables in p2p_platform database:');
    const [tables] = await connection.execute('SHOW TABLES');
    
    if (Array.isArray(tables) && tables.length > 0) {
      tables.forEach((table: any) => {
        const tableName = Object.values(table)[0];
        console.log(`  - ${tableName}`);
      });
    } else {
      console.log('  (No tables found - database is empty)');
    }

    await connection.end();
    console.log('\n🎉 Database connection test completed successfully!');
    
    return true;
  } catch (error) {
    console.error('\n❌ Database connection test failed:');
    
    if (error instanceof Error) {
      console.error('Error message:', error.message);
      
      // Provide helpful troubleshooting tips
      if (error.message.includes('ECONNREFUSED')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('  1. Make sure XAMPP is running');
        console.log('  2. Start MySQL service in XAMPP Control Panel');
        console.log('  3. Check if MySQL is running on port 3306');
      } else if (error.message.includes('Access denied')) {
        console.log('\n💡 Troubleshooting tips:');
        console.log('  1. Check MySQL username and password');
        console.log('  2. Default XAMPP credentials: user=root, password=(empty)');
        console.log('  3. Try accessing phpMyAdmin to verify credentials');
      }
    }
    
    return false;
  }
};

// Export for use in other files
export { testDatabaseConnection };

// Run test if this file is executed directly
if (require.main === module) {
  testDatabaseConnection()
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
}


