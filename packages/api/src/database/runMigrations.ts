import sequelize from './connection';
import migrations from './migrations';

async function runMigrations() {
  try {
    console.log('🔄 Starting database migrations...');
    
      // Test database connection
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
  } catch (error) {
    console.log('⚠️  Database connection failed, but continuing with migrations...');
    console.log('   This is expected if the database or tables don\'t exist yet.');
  }
    
    // Run migrations in order
    for (let i = 0; i < migrations.length; i++) {
      const migration = migrations[i];
      console.log(`📋 Running migration ${i + 1}/${migrations.length}...`);
      
      try {
        await migration.up(sequelize.getQueryInterface());
        console.log(`✅ Migration ${i + 1} completed successfully.`);
      } catch (error) {
        console.error(`❌ Migration ${i + 1} failed:`, error);
        throw error;
      }
    }
    
    console.log('🎉 All migrations completed successfully!');
    
  } catch (error) {
    console.error('💥 Migration process failed:', error);
    process.exit(1);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

// Run migrations if this file is executed directly
if (require.main === module) {
  runMigrations();
}

export default runMigrations;
