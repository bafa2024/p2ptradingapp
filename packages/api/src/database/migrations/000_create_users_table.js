'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Skip this migration - users table is created by 20250121120000-create-users.js
    // This migration is kept for historical compatibility but does nothing
    const tableExists = await queryInterface.showAllTables().then(tables => 
      tables.includes('users') || tables.includes('Users')
    );
    
    if (!tableExists) {
      console.log('⚠️  Note: users table will be created by later migration (20250121120000-create-users.js)');
    }
  },

  async down (queryInterface, Sequelize) {
    // No-op: table is managed by later migration
  }
};
