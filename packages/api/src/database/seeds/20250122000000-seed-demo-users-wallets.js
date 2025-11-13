'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Hash password for all demo users
    const hashedPassword = await bcrypt.hash('password123', 12);
    
    // Generate UUIDs for the demo users
    const user1Id = uuidv4();
    const user2Id = uuidv4();
    const user3Id = uuidv4();
    
    // Generate UUIDs for the wallets
    const wallet1Id = uuidv4();
    const wallet2Id = uuidv4();
    const wallet3Id = uuidv4();
    
    // Insert demo users
    await queryInterface.bulkInsert('users', [
      {
        id: user1Id,
        email: 'user1@test.com',
        password_hash: hashedPassword,
        phone_number: '+10000000001',
        username: 'user1',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'USER1001',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: user2Id,
        email: 'user2@test.com',
        password_hash: hashedPassword,
        phone_number: '+10000000002',
        username: 'user2',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'USER2002',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: user3Id,
        email: 'user3@test.com',
        password_hash: hashedPassword,
        phone_number: '+10000000003',
        username: 'user3',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'USER3003',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
    
    // Insert wallets for demo users with balance=1000.00000000
    await queryInterface.bulkInsert('Wallets', [
      {
        id: wallet1Id,
        user_id: user1Id,
        usdt_available: '1000.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: wallet2Id,
        user_id: user2Id,
        usdt_available: '1000.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: wallet3Id,
        user_id: user3Id,
        usdt_available: '1000.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
    
    console.log('✅ Demo users and wallets seeded successfully');
    console.log('   - user1@test.com (password: password123)');
    console.log('   - user2@test.com (password: password123)');
    console.log('   - user3@test.com (password: password123)');
    console.log('   - Each user has wallet balance: 1000.00000000 USDT');
  },

  async down(queryInterface, Sequelize) {
    // Get user IDs first
    const users = await queryInterface.sequelize.query(
      "SELECT id FROM users WHERE email IN ('user1@test.com', 'user2@test.com', 'user3@test.com')",
      { type: Sequelize.QueryTypes.SELECT }
    );
    
    const userIds = users.map((u: any) => u.id);
    
    // Delete wallets first (due to foreign key constraint)
    if (userIds.length > 0) {
      await queryInterface.bulkDelete('Wallets', {
        user_id: userIds
      }, {});
    }
    
    // Delete users
    await queryInterface.bulkDelete('users', {
      email: ['user1@test.com', 'user2@test.com', 'user3@test.com']
    }, {});
  }
};
