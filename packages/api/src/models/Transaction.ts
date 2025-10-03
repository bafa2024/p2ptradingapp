// src/models/Transaction.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface TransactionAttributes {
  id: number;
  buyer_id: string | null;
  seller_id: string | null;
  amount: number;
  price: number;
  created_at: Date;
  updated_at: Date;
}

export type TransactionCreationAttributes = Optional<TransactionAttributes, 'id' | 'created_at' | 'updated_at'>;

export class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public buyer_id!: string | null;
  public seller_id!: string | null;
  public amount!: number;
  public price!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    buyer_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    seller_id: {
      type: DataTypes.CHAR(36),
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
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
    tableName: 'TradeTransactions',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      { fields: ['buyer_id'] },
      { fields: ['seller_id'] },
      { fields: ['created_at'] }
    ]
  }
);

export default Transaction;


