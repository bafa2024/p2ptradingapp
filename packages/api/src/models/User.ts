import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface UserAttributes {
  id: string;
  firebase_uid: string;
  email: string;
  phone_number?: string;
  display_name: string;
  photo_url?: string;
  date_of_birth?: Date;
  nationality?: string;
  country?: string;
  city?: string;
  address?: string;
  is_verified: boolean;
  kyc_status: 'pending' | 'approved' | 'rejected' | 'not_required';
  kyc_verified_at?: Date;
  kyc_notes?: string;
  membership_status: 'free' | 'premium' | 'vip';
  membership_expires_at?: Date;
  is_active: boolean;
  is_banned: boolean;
  banned_reason?: string;
  banned_at?: Date;
  last_login?: Date;
  last_active?: Date;
  referral_code: string;
  referred_by?: string;
  total_trades: number;
  successful_trades: number;
  failed_trades: number;
  total_volume: number;
  rating: number;
  total_reviews: number;
  created_at: Date;
  updated_at: Date;
  reset_token?: string;
  reset_token_expires_at?: Date;
  phone_verified_at?: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public firebase_uid!: string;
  public email!: string;
  public phone_number?: string;
  public display_name!: string;
  public photo_url?: string;
  public date_of_birth?: Date;
  public nationality?: string;
  public country?: string;
  public city?: string;
  public address?: string;
  public is_verified!: boolean;
  public kyc_status!: 'pending' | 'approved' | 'rejected' | 'not_required';
  public kyc_verified_at?: Date;
  public kyc_notes?: string;
  public membership_status!: 'free' | 'premium' | 'vip';
  public membership_expires_at?: Date;
  public is_active!: boolean;
  public is_banned!: boolean;
  public banned_reason?: string;
  public banned_at?: Date;
  public last_login?: Date;
  public last_active?: Date;
  public referral_code!: string;
  public referred_by?: string;
  public total_trades!: number;
  public successful_trades!: number;
  public failed_trades!: number;
  public total_volume!: number;
  public rating!: number;
  public total_reviews!: number;
  public created_at!: Date;
  public updated_at!: Date;
  public reset_token?: string;
  public reset_token_expires_at?: Date;
  public phone_verified_at?: Date;

  // Instance methods
  public async updateLastActive(): Promise<void> {
    this.last_active = new Date();
    await this.save();
  }

  public async incrementTradeCount(successful: boolean = true): Promise<void> {
    this.total_trades += 1;
    if (successful) {
      this.successful_trades += 1;
    } else {
      this.failed_trades += 1;
    }
    await this.save();
  }

  public async updateRating(newRating: number): Promise<void> {
    const totalRating = (this.rating * this.total_reviews) + newRating;
    this.total_reviews += 1;
    this.rating = totalRating / this.total_reviews;
    await this.save();
  }

  public async upgradeMembership(tier: 'premium' | 'vip', durationMonths: number = 1): Promise<void> {
    this.membership_status = tier;
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + durationMonths);
    this.membership_expires_at = expiryDate;
    await this.save();
  }

  public async banUser(reason: string): Promise<void> {
    this.is_banned = true;
    this.banned_reason = reason;
    this.banned_at = new Date();
    this.is_active = false;
    await this.save();
  }

  public async unbanUser(): Promise<void> {
    this.is_banned = false;
    delete this.banned_reason;
    delete this.banned_at;
    this.is_active = true;
    await this.save();
  }

  // Static methods
  public static async findByReferralCode(code: string): Promise<User | null> {
    return this.findOne({ where: { referral_code: code } });
  }

  public static async findActiveUsers(): Promise<User[]> {
    return this.findAll({ 
      where: { 
        is_active: true, 
        is_banned: false 
      } 
    });
  }

  public static async findUsersByKYCStatus(status: UserAttributes['kyc_status']): Promise<User[]> {
    return this.findAll({ where: { kyc_status: status } });
  }

  public static async findUsersByMembershipStatus(status: UserAttributes['membership_status']): Promise<User[]> {
    return this.findAll({ where: { membership_status: status } });
  }

  public static async findTopTraders(limit: number = 10): Promise<User[]> {
    return this.findAll({
      where: { is_active: true, is_banned: false },
      order: [['total_volume', 'DESC'], ['rating', 'DESC']],
      limit
    });
  }

  public static async findUsersByLocation(country?: string, city?: string): Promise<User[]> {
    const whereClause: any = { is_active: true, is_banned: false };
    if (country) whereClause.country = country;
    if (city) whereClause.city = city;
    
    return this.findAll({ where: whereClause });
  }
}

User.init(
  {
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
    banned_reason: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    banned_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    
    // Activity tracking
    last_login: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_active: {
      type: DataTypes.DATE,
      allowNull: true
    },
    
    // Referral system
    referral_code: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false
    },
    referred_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    
    // Trading statistics
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
    total_reviews: {
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
    
    // Password reset
    reset_token: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reset_token_expires_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    
    // Phone verification
    phone_verified_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize,
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
        fields: ['total_trades']
      },
      {
        fields: ['rating']
      },
      {
        fields: ['created_at']
      }
    ]
  }
);

export default User;
