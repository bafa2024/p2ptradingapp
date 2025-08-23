// Wallet Model for OKX Platform
// This model represents user wallets with multi-currency support

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Wallet = sequelize.define('Wallet', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  
  // USDT Balance
  usdt_available: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  usdt_locked: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  usdt_total: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  
  // IQD Balance
  iqd_available: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  iqd_locked: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  iqd_total: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  
  // USD Balance
  usd_available: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  usd_locked: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  usd_total: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  
  // Wallet Addresses
  usdt_trc20_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  usdt_erc20_address: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  
  // Transaction Limits
  daily_withdrawal_limit: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 1000,
    allowNull: false
  },
  monthly_withdrawal_limit: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 10000,
    allowNull: false
  },
  max_trade_amount: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 5000,
    allowNull: false
  },
  
  // Status
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  is_suspended: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  
  // Timestamps
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  last_transaction_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'wallets',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['user_id']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['is_suspended']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Instance methods
Wallet.prototype.updateBalance = function(currency, amount, operation = 'add') {
  const currencyLower = currency.toLowerCase();
  
  if (operation === 'add') {
    this[`${currencyLower}_available`] += amount;
    this[`${currencyLower}_total`] += amount;
  } else if (operation === 'subtract') {
    this[`${currencyLower}_available`] -= amount;
    this[`${currencyLower}_total`] -= amount;
  }
  
  this.last_transaction_at = new Date();
  return this.save();
};

Wallet.prototype.lockFunds = function(currency, amount) {
  const currencyLower = currency.toLowerCase();
  
  if (this[`${currencyLower}_available`] >= amount) {
    this[`${currencyLower}_available`] -= amount;
    this[`${currencyLower}_locked`] += amount;
    this.last_transaction_at = new Date();
    return this.save();
  } else {
    throw new Error(`Insufficient ${currency} available balance`);
  }
};

Wallet.prototype.releaseFunds = function(currency, amount) {
  const currencyLower = currency.toLowerCase();
  
  if (this[`${currencyLower}_locked`] >= amount) {
    this[`${currencyLower}_locked`] -= amount;
    this[`${currencyLower}_available`] += amount;
    this.last_transaction_at = new Date();
    return this.save();
  } else {
    throw new Error(`Insufficient ${currency} locked balance`);
  }
};

Wallet.prototype.getBalance = function(currency) {
  const currencyLower = currency.toLowerCase();
  return {
    available: this[`${currencyLower}_available`],
    locked: this[`${currencyLower}_locked`],
    total: this[`${currencyLower}_total`]
  };
};

Wallet.prototype.setAddress = function(currency, network, address) {
  if (currency === 'USDT' && network === 'TRC20') {
    this.usdt_trc20_address = address;
  } else if (currency === 'USDT' && network === 'ERC20') {
    this.usdt_erc20_address = address;
  }
  return this.save();
};

// Class methods
Wallet.findByUserId = function(userId) {
  return this.findOne({ where: { user_id: userId } });
};

Wallet.findActiveWallets = function() {
  return this.findAll({ where: { is_active: true } });
};

Wallet.findSuspendedWallets = function() {
  return this.findAll({ where: { is_suspended: true } });
};

module.exports = Wallet;
