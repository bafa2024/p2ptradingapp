'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
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
      type: {
        type: Sequelize.ENUM('buy', 'sell'),
        allowNull: false,
      },
      amount: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      price: {
        type: Sequelize.DECIMAL(18, 8),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('open', 'completed', 'cancelled'),
        allowNull: false,
        defaultValue: 'open',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });

    // Add indexes for better performance
    await queryInterface.addIndex('Orders', ['user_id']);
    await queryInterface.addIndex('Orders', ['type']);
    await queryInterface.addIndex('Orders', ['status']);
    await queryInterface.addIndex('Orders', ['created_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};

