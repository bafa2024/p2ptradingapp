// Database Migration Script
// Run this after starting MySQL server

const { execSync } = require('child_process');
const path = require('path');

console.log('🔄 Starting database migration for okx_platform...\n');

try {
  // Step 1: Check if database exists, create if not
  console.log('1️⃣ Checking database...');
  try {
    execSync('npx sequelize-cli db:create', { 
      stdio: 'inherit',
      cwd: path.join(__dirname)
    });
    console.log('✅ Database created or already exists\n');
  } catch (error) {
    // Database might already exist, continue
    console.log('ℹ️  Database check completed\n');
  }

  // Step 2: Run migrations
  console.log('2️⃣ Running migrations...');
  execSync('npx sequelize-cli db:migrate', { 
    stdio: 'inherit',
    cwd: path.join(__dirname)
  });
  console.log('\n✅ Migrations completed successfully\n');

  // Step 3: Check migration status
  console.log('3️⃣ Migration status:');
  execSync('npx sequelize-cli db:migrate:status', { 
    stdio: 'inherit',
    cwd: path.join(__dirname)
  });

  console.log('\n✅ Database migration completed!');
  console.log('📊 Database: okx_platform');
  console.log('🔗 Ready to use\n');

} catch (error) {
  console.error('\n❌ Migration failed:', error.message);
  console.error('\n💡 Troubleshooting:');
  console.error('   1. Make sure MySQL server is running');
  console.error('   2. Check database credentials in .env file');
  console.error('   3. Verify database name: okx_platform');
  console.error('   4. Ensure user has CREATE DATABASE permissions\n');
  process.exit(1);
}

