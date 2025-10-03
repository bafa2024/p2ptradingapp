'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Hash passwords
    const hashedPassword = await bcrypt.hash('123456', 12);
    
    // Generate UUIDs for the users
    const aliceId = '11111111-1111-1111-1111-111111111111';
    const bobId = '22222222-2222-2222-2222-222222222222';
    const charlieId = '33333333-3333-3333-3333-333333333333';
    
    await queryInterface.bulkInsert('users', [
      {
        id: aliceId,
        email: 'alice@example.com',
        password_hash: hashedPassword,
        phone_number: '+111111111',
        username: 'alice',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'ALICE001',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: bobId,
        email: 'bob@example.com',
        password_hash: hashedPassword,
        phone_number: '+122222222',
        username: 'bob',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'BOB002',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: charlieId,
        email: 'charlie@example.com',
        password_hash: hashedPassword,
        phone_number: '+133333333',
        username: 'charlie',
        kyc_status: 'pending',
        membership_tier: 'free',
        referral_code: 'CHARLIE003',
        referred_by: null,
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      email: ['alice@example.com', 'bob@example.com', 'charlie@example.com']
    }, {});
  }
};


