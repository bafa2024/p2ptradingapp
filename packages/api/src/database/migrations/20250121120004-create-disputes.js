'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Disputes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      trade_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trades',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      reason: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('open', 'resolved', 'rejected'),
        defaultValue: 'open',
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
    await queryInterface.addIndex('Disputes', ['trade_id']);
    await queryInterface.addIndex('Disputes', ['user_id']);
    await queryInterface.addIndex('Disputes', ['status']);
    await queryInterface.addIndex('Disputes', ['created_at']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Disputes');
  }
};


