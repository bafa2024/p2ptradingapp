// Migration Runner for OKX Platform
// This script runs both Firebase and Sequelize migrations

const { sequelize } = require('./connection');
const { initializeAssociations } = require('../models');

async function runSequelizeMigrations() {
  try {
    console.log('🔄 Running Sequelize migrations...');
    
    // Import and run migrations
    const createUsersTable = require('./migrations/001_create_users_table');
    const createWalletsTable = require('./migrations/002_create_wallets_table');
    const createTradesTable = require('./migrations/003_create_trades_table');
    
    // Run migrations in order
    await createUsersTable.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    await createWalletsTable.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    await createTradesTable.up(sequelize.getQueryInterface(), sequelize.Sequelize);
    
    // Initialize model associations
    initializeAssociations();
    
    console.log('✅ Sequelize migrations completed successfully!');
    
  } catch (error) {
    console.error('❌ Sequelize migrations failed:', error.message);
    throw error;
  }
}

async function runAllMigrations() {
  try {
    console.log('🚀 Starting database migrations...');
    console.log('=====================================');
    
    // Run Sequelize migrations
    await runSequelizeMigrations();
    
    console.log('=====================================');
    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('=====================================');
    console.error('💥 Migration process failed!');
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Export functions
module.exports = {
  runSequelizeMigrations,
  runAllMigrations
};

// If running directly, execute migrations
if (require.main === module) {
  runAllMigrations()
    .then(() => {
      console.log('✅ Migration script completed');
      process.exit(0);
    })
    .catch((error) => {
      console.error('❌ Migration script failed:', error.message);
      process.exit(1);
    });
}
