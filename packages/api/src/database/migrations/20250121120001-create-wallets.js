'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Drop existing wallets table if it exists (different structure)
    await queryInterface.dropTable('wallets');
    
    await queryInterface.createTable('Wallets', {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      usdt_available: {
        type: Sequelize.DECIMAL(18, 8),
        defaultValue: 0,
        allowNull: false,
      },
      usdt_locked: {
        type: Sequelize.DECIMAL(18, 8),
        defaultValue: 0,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex('Wallets', ['user_id']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Wallets');
  }
};
