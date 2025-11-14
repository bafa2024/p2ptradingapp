'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.CHAR(36),
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(255),
        unique: true,
        allowNull: true,
      },
      phone_number: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: true,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },
      kyc_status: {
        type: Sequelize.ENUM('pending', 'verified', 'rejected'),
        allowNull: true,
        defaultValue: 'pending',
      },
      membership_tier: {
        type: Sequelize.ENUM('free', 'basic', 'premium'),
        allowNull: true,
        defaultValue: 'free',
      },
      referral_code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: true,
      },
      referred_by: {
        type: Sequelize.CHAR(36),
        allowNull: true,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
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

    // Add indexes
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['phone_number']);
    await queryInterface.addIndex('users', ['username']);
    await queryInterface.addIndex('users', ['referral_code']);
    await queryInterface.addIndex('users', ['kyc_status']);
    await queryInterface.addIndex('users', ['membership_tier']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};


