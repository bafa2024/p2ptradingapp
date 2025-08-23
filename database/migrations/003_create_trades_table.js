// Migration: Create Trades Table
// This migration creates the trades table for the OKX platform

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trades', {
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
      counterparty_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      
      // Trade Details
      type: {
        type: Sequelize.ENUM('buy', 'sell'),
        allowNull: false
      },
      currency: {
        type: Sequelize.ENUM('USDT', 'BTC', 'ETH'),
        allowNull: false
      },
      amount: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      total_value: {
        type: Sequelize.DECIMAL(20, 8),
        allowNull: false
      },
      payment_currency: {
        type: Sequelize.ENUM('IQD', 'USD'),
        allowNull: false
      },
      
      // Payment Methods (stored as JSON)
      payment_methods: {
        type: Sequelize.JSON,
        allowNull: false,
        defaultValue: []
      },
      preferred_payment_method: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      
      // Trade Status
      status: {
        type: Sequelize.ENUM('active', 'pending', 'in_progress', 'completed', 'cancelled', 'disputed'),
        defaultValue: 'active',
        allowNull: false
      },
      is_escrow_locked: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      
      // Trade Flow Timestamps
      started_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      payment_confirmed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      cancelled_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      
      // Escrow & Security
      escrow_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      escrow_amount: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      escrow_locked_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      escrow_released_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      
      // Dispute & Resolution
      dispute_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      dispute_reason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      admin_notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      
      // Commission & Fees
      platform_fee: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      network_fee: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      
      // Metadata
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      terms: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      tags: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: []
      },
      location: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      time_limit: {
        type: Sequelize.INTEGER,
        defaultValue: 24,
        allowNull: false,
        comment: 'Time limit in hours'
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
      }
    });

    // Create indexes
    await queryInterface.addIndex('trades', ['user_id']);
    await queryInterface.addIndex('trades', ['counterparty_id']);
    await queryInterface.addIndex('trades', ['status']);
    await queryInterface.addIndex('trades', ['currency']);
    await queryInterface.addIndex('trades', ['type']);
    await queryInterface.addIndex('trades', ['payment_currency']);
    await queryInterface.addIndex('trades', ['location']);
    await queryInterface.addIndex('trades', ['created_at']);
    
    // Composite indexes for better query performance
    await queryInterface.addIndex('trades', ['status', 'created_at']);
    await queryInterface.addIndex('trades', ['currency', 'status', 'created_at']);
    await queryInterface.addIndex('trades', ['type', 'status', 'created_at']);
    await queryInterface.addIndex('trades', ['user_id', 'status', 'created_at']);
    
    console.log('✅ Trades table created successfully');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('trades');
    console.log('✅ Trades table dropped successfully');
  }
};
