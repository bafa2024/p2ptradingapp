// Trade Model for OKX Platform
// This model represents P2P trading offers and transactions

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const Trade = sequelize.define('Trade', {
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
  counterparty_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  
  // Trade Details
  type: {
    type: DataTypes.ENUM('buy', 'sell'),
    allowNull: false
  },
  currency: {
    type: DataTypes.ENUM('USDT', 'BTC', 'ETH'),
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    validate: {
      min: 0.00000001
    }
  },
  price: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    validate: {
      min: 0.00000001
    }
  },
  total_value: {
    type: DataTypes.DECIMAL(20, 8),
    allowNull: false,
    validate: {
      min: 0.00000001
    }
  },
  payment_currency: {
    type: DataTypes.ENUM('IQD', 'USD'),
    allowNull: false
  },
  
  // Payment Methods (stored as JSON)
  payment_methods: {
    type: DataTypes.JSON,
    allowNull: false,
    defaultValue: []
  },
  preferred_payment_method: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  
  // Trade Status
  status: {
    type: DataTypes.ENUM('active', 'pending', 'in_progress', 'completed', 'cancelled', 'disputed'),
    defaultValue: 'active',
    allowNull: false
  },
  is_escrow_locked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  
  // Trade Flow Timestamps
  started_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  payment_confirmed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  completed_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  cancelled_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  // Escrow & Security
  escrow_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  escrow_amount: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  escrow_locked_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  escrow_released_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  
  // Dispute & Resolution
  dispute_id: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  dispute_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  admin_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Commission & Fees
  platform_fee: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  network_fee: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  
  // Metadata
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  terms: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: []
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  time_limit: {
    type: DataTypes.INTEGER,
    defaultValue: 24,
    allowNull: false,
    comment: 'Time limit in hours'
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
  }
}, {
  tableName: 'trades',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      fields: ['user_id']
    },
    {
      fields: ['counterparty_id']
    },
    {
      fields: ['status']
    },
    {
      fields: ['currency']
    },
    {
      fields: ['type']
    },
    {
      fields: ['payment_currency']
    },
    {
      fields: ['location']
    },
    {
      fields: ['created_at']
    },
    {
      fields: ['status', 'created_at']
    },
    {
      fields: ['currency', 'status', 'created_at']
    },
    {
      fields: ['type', 'status', 'created_at']
    },
    {
      fields: ['user_id', 'status', 'created_at']
    }
  ]
});

// Instance methods
Trade.prototype.startTrade = function(counterpartyId) {
  this.counterparty_id = counterpartyId;
  this.status = 'in_progress';
  this.started_at = new Date();
  return this.save();
};

Trade.prototype.confirmPayment = function() {
  this.status = 'pending';
  this.payment_confirmed_at = new Date();
  return this.save();
};

Trade.prototype.completeTrade = function() {
  this.status = 'completed';
  this.completed_at = new Date();
  return this.save();
};

Trade.prototype.cancelTrade = function() {
  this.status = 'cancelled';
  this.cancelled_at = new Date();
  return this.save();
};

Trade.prototype.disputeTrade = function(reason) {
  this.status = 'disputed';
  this.dispute_reason = reason;
  return this.save();
};

Trade.prototype.lockEscrow = function(escrowId, amount) {
  this.is_escrow_locked = true;
  this.escrow_id = escrowId;
  this.escrow_amount = amount;
  this.escrow_locked_at = new Date();
  return this.save();
};

Trade.prototype.releaseEscrow = function() {
  this.is_escrow_locked = false;
  this.escrow_released_at = new Date();
  return this.save();
};

Trade.prototype.calculateTotalValue = function() {
  this.total_value = this.amount * this.price;
  return this.save();
};

Trade.prototype.calculatePlatformFee = function() {
  this.platform_fee = this.total_value * 0.01; // 1% platform fee
  return this.save();
};

// Class methods
Trade.findActiveTrades = function(filters = {}) {
  let whereClause = { status: 'active' };
  
  if (filters.currency) {
    whereClause.currency = filters.currency;
  }
  if (filters.type) {
    whereClause.type = filters.type;
  }
  if (filters.paymentCurrency) {
    whereClause.payment_currency = filters.paymentCurrency;
  }
  if (filters.location) {
    whereClause.location = filters.location;
  }
  
  return this.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']],
    limit: filters.limit || 50
  });
};

Trade.findByUserId = function(userId, status = null) {
  let whereClause = { user_id: userId };
  if (status) {
    whereClause.status = status;
  }
  
  return this.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']]
  });
};

Trade.findByCounterpartyId = function(counterpartyId, status = null) {
  let whereClause = { counterparty_id: counterpartyId };
  if (status) {
    whereClause.status = status;
  }
  
  return this.findAll({
    where: whereClause,
    order: [['created_at', 'DESC']]
  });
};

Trade.findPendingKYC = function() {
  return this.findAll({
    where: { status: 'pending' },
    include: [{
      model: require('./User'),
      where: { kyc_status: 'pending' }
    }]
  });
};

Trade.findDisputedTrades = function() {
  return this.findAll({
    where: { status: 'disputed' },
    order: [['updated_at', 'DESC']]
  });
};

module.exports = Trade;
