// src/models/Order.ts
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../database/connection';

export interface OrderAttributes {
  id: string;
  user_id: string;
  type: 'buy' | 'sell';
  amount: number;
  price: number;
  status: 'open' | 'completed' | 'cancelled';
  created_at: Date;
  updated_at: Date;
}

export interface OrderCreationAttributes extends Optional<OrderAttributes, 'id' | 'created_at' | 'updated_at'> {}

export class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: string;
  public user_id!: string;
  public type!: 'buy' | 'sell';
  public amount!: number;
  public price!: number;
  public status!: 'open' | 'completed' | 'cancelled';
  public created_at!: Date;
  public updated_at!: Date;

  // Computed property for total value
  public get total_value(): number {
    return this.amount * this.price;
  }
}

Order.init(
  {
    id: {
      type: DataTypes.CHAR(36),
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    type: {
      type: DataTypes.ENUM('buy', 'sell'),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('open', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'open'
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
    tableName: 'Orders',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        fields: ['user_id']
      },
      {
        fields: ['type']
      },
      {
        fields: ['status']
      },
      {
        fields: ['created_at']
      }
    ]
  }
);

export default Order;

