import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface UserAttributes {
  id: string;
  email: string;
  phone_number: string;
  username: string;
  password_hash: string;
  kyc_status: 'pending' | 'verified' | 'rejected';
  membership_tier: 'free' | 'basic' | 'premium';
  referral_code: string;
  referred_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public email!: string;
  public phone_number!: string;
  public username!: string;
  public password_hash!: string;
  public kyc_status!: 'pending' | 'verified' | 'rejected';
  public membership_tier!: 'free' | 'basic' | 'premium';
  public referral_code!: string;
  public referred_by?: string;
  public created_at!: Date;
  public updated_at!: Date;

  // Instance methods
  public async upgradeMembership(tier: 'basic' | 'premium'): Promise<void> {
    this.membership_tier = tier;
    await this.save();
  }

  // Static methods
  public static async findByReferralCode(code: string): Promise<User | null> {
    return this.findOne({ where: { referral_code: code } });
  }

  public static async findUsersByKYCStatus(status: UserAttributes['kyc_status']): Promise<User[]> {
    return this.findAll({ where: { kyc_status: status } });
  }

  public static async findUsersByMembershipTier(tier: UserAttributes['membership_tier']): Promise<User[]> {
    return this.findAll({ where: { membership_tier: tier } });
  }
}

User.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    kyc_status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      allowNull: true,
      defaultValue: 'pending'
    },
    membership_tier: {
      type: DataTypes.ENUM('free', 'basic', 'premium'),
      allowNull: true,
      defaultValue: 'free'
    },
    referral_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true
    },
    referred_by: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
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
        fields: ['email']
      },
      {
        unique: true,
        fields: ['phone_number']
      },
      {
        unique: true,
        fields: ['username']
      },
      {
        unique: true,
        fields: ['referral_code']
      },
      {
        fields: ['kyc_status']
      },
      {
        fields: ['membership_tier']
      },
      {
        fields: ['created_at']
      }
    ]
  }
);

export default User;
