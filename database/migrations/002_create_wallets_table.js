// Migration: Create Wallets Table
// This migration creates the wallets table for the OKX platform

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('wallets', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      
      // USDT Balance
      usdt_available: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      usdt_locked: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      usdt_total: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      
      // IQD Balance
      iqd_available: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      iqd_locked: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      iqd_total: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      
      // USD Balance
      usd_available: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      usd_locked: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      usd_total: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      
      // Wallet Addresses
      usdt_trc20_address: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      usdt_erc20_address: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      
      // Transaction Limits
      daily_withdrawal_limit: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 1000,
        allowNull: false
      },
      monthly_withdrawal_limit: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 10000,
        allowNull: false
      },
      max_trade_amount: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 5000,
        allowNull: false
      },
      
      // Status
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_suspended: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      
      // Timestamps
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      last_transaction_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Create indexes
    await queryInterface.addIndex('wallets', ['user_id'], { unique: true });
    await queryInterface.addIndex('wallets', ['is_active']);
    await queryInterface.addIndex('wallets', ['is_suspended']);
    await queryInterface.addIndex('wallets', ['created_at']);
    
    console.log('✅ Wallets table created successfully');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('wallets');
    console.log('✅ Wallets table dropped successfully');
  }
};
