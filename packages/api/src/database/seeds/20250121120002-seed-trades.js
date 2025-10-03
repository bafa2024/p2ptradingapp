'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User IDs from the seeded users
    const aliceId = '11111111-1111-1111-1111-111111111111';
    const bobId = '22222222-2222-2222-2222-222222222222';
    const charlieId = '33333333-3333-3333-3333-333333333333';
    
    await queryInterface.bulkInsert('Trades', [
      {
        // Trade 1: Alice buys from Bob
        buyer_id: aliceId,
        seller_id: bobId,
        amount: '10.00000000',
        price: '1.00000000',
        currency: 'USDT',
        status: 'completed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // Trade 2: Charlie buys from Alice
        buyer_id: charlieId,
        seller_id: aliceId,
        amount: '5.00000000',
        price: '1.05000000',
        currency: 'USDT',
        status: 'pending',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Trades', {
      buyer_id: [
        '11111111-1111-1111-1111-111111111111',
        '33333333-3333-3333-3333-333333333333'
      ]
    }, {});
  }
};


