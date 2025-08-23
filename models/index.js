// Model Associations for OKX Platform
// This file defines relationships between Sequelize models

const User = require('./User');
const Wallet = require('./Wallet');
const Trade = require('./Trade');

// User - Wallet (One-to-One)
User.hasOne(Wallet, {
  foreignKey: 'user_id',
  as: 'wallet',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Wallet.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// User - Trade (One-to-Many) - User as seller/creator
User.hasMany(Trade, {
  foreignKey: 'user_id',
  as: 'createdTrades',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

Trade.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'seller',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// User - Trade (One-to-Many) - User as counterparty/buyer
User.hasMany(Trade, {
  foreignKey: 'counterparty_id',
  as: 'participatedTrades',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

Trade.belongsTo(User, {
  foreignKey: 'counterparty_id',
  as: 'buyer',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// User - User (One-to-Many) - Referral system
User.hasMany(User, {
  foreignKey: 'referred_by',
  as: 'referrals',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

User.belongsTo(User, {
  foreignKey: 'referred_by',
  as: 'referrer',
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE'
});

// Export models with associations
module.exports = {
  User,
  Wallet,
  Trade,
  
  // Initialize associations
  initializeAssociations: () => {
    console.log('✅ Sequelize model associations initialized');
  }
};
