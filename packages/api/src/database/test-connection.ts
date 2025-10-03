import { testDatabaseConnection as sequelizeTestConnection } from '../config/database';

const testDatabaseConnection = async () => {
  return await sequelizeTestConnection();
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