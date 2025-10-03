'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // User IDs from the seeded users
    const aliceId = '11111111-1111-1111-1111-111111111111';
    const bobId = '22222222-2222-2222-2222-222222222222';
    
    await queryInterface.bulkInsert('SupportTickets', [
      {
        // Alice: subject="Issue with withdrawal", message="Withdrawal stuck for 24h", status="open"
        user_id: aliceId,
        subject: 'Issue with withdrawal',
        message: 'Withdrawal stuck for 24h',
        status: 'open',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        // Bob: subject="KYC Verification", message="Docs submitted but not approved", status="in_progress"
        user_id: bobId,
        subject: 'KYC Verification',
        message: 'Docs submitted but not approved',
        status: 'in_progress',
        created_at: new Date(),
        updated_at: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SupportTickets', {
      user_id: [
        '11111111-1111-1111-1111-111111111111',
        '22222222-2222-2222-2222-222222222222'
      ]
    }, {});
  }
};


