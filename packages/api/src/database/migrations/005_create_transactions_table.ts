import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('transactions', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    type: {
      type: DataTypes.ENUM('deposit', 'withdrawal', 'internal_transfer', 'trade', 'commission'),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    tx_hash: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'failed'),
      defaultValue: 'pending',
      allowNull: false,
    },
    metadata: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  // Add indexes for better performance
  await queryInterface.addIndex('transactions', ['user_id']);
  await queryInterface.addIndex('transactions', ['type']);
  await queryInterface.addIndex('transactions', ['currency']);
  await queryInterface.addIndex('transactions', ['status']);
  await queryInterface.addIndex('transactions', ['tx_hash']);
  await queryInterface.addIndex('transactions', ['created_at']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('transactions');
}
