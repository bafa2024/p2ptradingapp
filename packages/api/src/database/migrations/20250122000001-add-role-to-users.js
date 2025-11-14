'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Add role column to users table
    await queryInterface.addColumn('users', 'role', {
      type: Sequelize.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
      after: 'password_hash'
    });

    // Add index on role for faster queries
    await queryInterface.addIndex('users', ['role']);
  },

  async down(queryInterface, Sequelize) {
    // Remove index first
    await queryInterface.removeIndex('users', ['role']);
    
    // Remove role column
    await queryInterface.removeColumn('users', 'role');
  }
};

