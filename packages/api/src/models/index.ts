import User from './User';
import Wallet from './Wallet';

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

export { User, Wallet };

export const initializeAssociations = () => {
  console.log('✅ Sequelize model associations initialized');
};

export default {
  User,
  Wallet,
  initializeAssociations
};





