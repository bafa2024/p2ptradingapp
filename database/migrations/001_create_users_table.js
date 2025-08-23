// Migration: Create Users Table
// This migration creates the users table for the OKX platform

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      firebase_uid: {
        type: Sequelize.STRING(128),
        unique: true,
        allowNull: false,
        comment: 'Firebase Authentication UID'
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      phone_number: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true
      },
      display_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      photo_url: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      nationality: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      country: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      city: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      
      // Verification & KYC
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      kyc_status: {
        type: Sequelize.ENUM('pending', 'approved', 'rejected', 'not_required'),
        defaultValue: 'pending',
        allowNull: false
      },
      kyc_verified_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      kyc_notes: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      
      // Membership & Status
      membership_status: {
        type: Sequelize.ENUM('free', 'premium', 'vip'),
        defaultValue: 'free',
        allowNull: false
      },
      membership_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
      },
      is_banned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      ban_reason: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      
      // Referral System
      referral_code: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      referred_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      
      // Statistics
      total_trades: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      successful_trades: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      failed_trades: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false
      },
      total_volume: {
        type: Sequelize.DECIMAL(20, 8),
        defaultValue: 0,
        allowNull: false
      },
      rating: {
        type: Sequelize.DECIMAL(3, 2),
        defaultValue: 0,
        allowNull: false
      },
      review_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
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
      last_active: {
        type: Sequelize.DATE,
        allowNull: true
      },
      last_login: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Create indexes
    await queryInterface.addIndex('users', ['firebase_uid'], { unique: true });
    await queryInterface.addIndex('users', ['email'], { unique: true });
    await queryInterface.addIndex('users', ['phone_number'], { unique: true });
    await queryInterface.addIndex('users', ['referral_code'], { unique: true });
    await queryInterface.addIndex('users', ['kyc_status']);
    await queryInterface.addIndex('users', ['membership_status']);
    await queryInterface.addIndex('users', ['is_active']);
    await queryInterface.addIndex('users', ['country']);
    await queryInterface.addIndex('users', ['created_at']);
    
    console.log('✅ Users table created successfully');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
    console.log('✅ Users table dropped successfully');
  }
};
