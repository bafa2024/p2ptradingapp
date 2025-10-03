'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User ID for Alice (who raised the dispute)
    const aliceId = '11111111-1111-1111-1111-111111111111';
    
    await queryInterface.bulkInsert('Disputes', [
      {
        // Dispute for trade_id=1, raised by Alice
        trade_id: 1,
        user_id: aliceId,
        reason: 'Payment not received',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Disputes', {
      trade_id: 1
    }, {});
  }
};


