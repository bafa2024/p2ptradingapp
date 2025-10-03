import User from './User';
import Wallet from './Wallet';
import Order from './Order';
import Transaction from './Transaction';

// Define associations
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

// Self-referencing association for referrals
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

// Order associations
User.hasMany(Order, { 
  foreignKey: 'user_id', 
  as: 'orders', 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});

Order.belongsTo(User, { 
  foreignKey: 'user_id', 
  as: 'user', 
  onDelete: 'CASCADE', 
  onUpdate: 'CASCADE' 
});

export { User, Wallet, Order, Transaction };

export const initializeAssociations = () => {
  console.log('✅ Sequelize model associations initialized');
};

export default {
  User,
  Wallet,
  Order,
  Transaction,
  initializeAssociations
};





