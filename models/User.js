// User Model for OKX Platform
// This model represents users in the system

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/connection');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false
  },
  firebase_uid: {
    type: DataTypes.STRING(128),
    unique: true,
    allowNull: false,
    comment: 'Firebase Authentication UID'
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  phone_number: {
    type: DataTypes.STRING(20),
    allowNull: true,
    unique: true
  },
  display_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  photo_url: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  nationality: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Verification & KYC
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  kyc_status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected', 'not_required'),
    defaultValue: 'pending',
    allowNull: false
  },
  kyc_verified_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  kyc_notes: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Membership & Status
  membership_status: {
    type: DataTypes.ENUM('free', 'premium', 'vip'),
    defaultValue: 'free',
    allowNull: false
  },
  membership_expires_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  is_banned: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  },
  ban_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  
  // Referral System
  referral_code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  referred_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  
  // Statistics
  total_trades: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  successful_trades: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  failed_trades: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  total_volume: {
    type: DataTypes.DECIMAL(20, 8),
    defaultValue: 0,
    allowNull: false
  },
  rating: {
    type: DataTypes.DECIMAL(3, 2),
    defaultValue: 0,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  review_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
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
  last_active: {
    type: DataTypes.DATE,
    allowNull: true
  },
  last_login: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  indexes: [
    {
      unique: true,
      fields: ['firebase_uid']
    },
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['phone_number']
    },
    {
      unique: true,
      fields: ['referral_code']
    },
    {
      fields: ['kyc_status']
    },
    {
      fields: ['membership_status']
    },
    {
      fields: ['is_active']
    },
    {
      fields: ['country']
    },
    {
      fields: ['created_at']
    }
  ]
});

// Instance methods
User.prototype.updateLastActive = function() {
  this.last_active = new Date();
  return this.save();
};

User.prototype.updateLastLogin = function() {
  this.last_login = new Date();
  return this.save();
};

User.prototype.incrementTradeCount = function(successful = true) {
  this.total_trades += 1;
  if (successful) {
    this.successful_trades += 1;
  } else {
    this.failed_trades += 1;
  }
  return this.save();
};

User.prototype.updateRating = function(newRating) {
  const totalRating = (this.rating * this.review_count) + newRating;
  this.review_count += 1;
  this.rating = totalRating / this.review_count;
  return this.save();
};

// Class methods
User.findByFirebaseUid = function(firebaseUid) {
  return this.findOne({ where: { firebase_uid: firebaseUid } });
};

User.findByEmail = function(email) {
  return this.findOne({ where: { email } });
};

User.findByReferralCode = function(referralCode) {
  return this.findOne({ where: { referral_code: referralCode } });
};

User.findPendingKYC = function() {
  return this.findAll({ where: { kyc_status: 'pending' } });
};

User.findActiveUsers = function() {
  return this.findAll({ where: { is_active: true } });
};

module.exports = User;
