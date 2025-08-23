import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('trades', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    seller_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    buyer_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    ad_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'advertisements',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'paid', 'confirmed', 'disputed', 'completed', 'cancelled'),
      defaultValue: 'pending',
      allowNull: false,
    },
    escrow_released: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    commission_amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  // Add indexes for better performance
  await queryInterface.addIndex('trades', ['seller_id']);
  await queryInterface.addIndex('trades', ['buyer_id']);
  await queryInterface.addIndex('trades', ['ad_id']);
  await queryInterface.addIndex('trades', ['status']);
  await queryInterface.addIndex('trades', ['created_at']);
  await queryInterface.addIndex('trades', ['completed_at']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('trades');
}
