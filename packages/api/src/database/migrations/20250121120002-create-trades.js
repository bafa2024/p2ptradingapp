'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Drop existing trades table if it exists (different structure)
    await queryInterface.dropTable('trades');
    
    await queryInterface.createTable('Trades', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      buyer_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      seller_id: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      amount: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      currency: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
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
    await queryInterface.addIndex('Trades', ['buyer_id']);
    await queryInterface.addIndex('Trades', ['seller_id']);
    await queryInterface.addIndex('Trades', ['status']);
    await queryInterface.addIndex('Trades', ['created_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Trades');
  }
};
