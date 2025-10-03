'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User IDs from the seeded users
    const aliceId = '11111111-1111-1111-1111-111111111111';
    const bobId = '22222222-2222-2222-2222-222222222222';
    const charlieId = '33333333-3333-3333-3333-333333333333';
    
    // Generate UUIDs for the wallets
    const aliceWalletId = 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa';
    const bobWalletId = 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb';
    const charlieWalletId = 'cccccccc-cccc-cccc-cccc-cccccccccccc';
    
    await queryInterface.bulkInsert('Wallets', [
      {
        id: aliceWalletId,
        user_id: aliceId,
        usdt_available: '100.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: bobWalletId,
        user_id: bobId,
        usdt_available: '50.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: charlieWalletId,
        user_id: charlieId,
        usdt_available: '200.00000000',
        usdt_locked: '0.00000000',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wallets', {
      user_id: [
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222',
        '33333333-3333-3333-3333-333333333333'
      ]
    }, {});
  }
};


