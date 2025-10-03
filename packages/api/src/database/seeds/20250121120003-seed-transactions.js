'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User IDs from the seeded users
    const aliceId = '11111111-1111-1111-1111-111111111111';
    const bobId = '22222222-2222-2222-2222-222222222222';
    const charlieId = '33333333-3333-3333-3333-333333333333';
    
    await queryInterface.bulkInsert('Transactions', [
      {
        // Alice: deposit 50 USDT, status="completed"
        user_id: aliceId,
        type: 'deposit',
        amount: '50.00000000',
        currency: 'USDT',
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // Bob: withdrawal 20 USDT, status="pending"
        user_id: bobId,
        type: 'withdrawal',
        amount: '20.00000000',
        currency: 'USDT',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // Charlie: transfer 15 USDT, status="completed"
        user_id: charlieId,
        type: 'transfer',
        amount: '15.00000000',
        currency: 'USDT',
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', {
      user_id: [
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333'
      ]
    }, {});
  }
};


