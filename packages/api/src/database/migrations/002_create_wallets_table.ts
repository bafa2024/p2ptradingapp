import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('wallets', {
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
    tron_address: {
      type: DataTypes.STRING(42),
      allowNull: true,
      unique: true,
    },
    usdt_balance: {
      type: DataTypes.DECIMAL(20, 6),
      defaultValue: 0,
      allowNull: false,
    },
    iqd_balance: {
      type: DataTypes.DECIMAL(20, 2),
      defaultValue: 0,
      allowNull: false,
    },
    locked_balance: {
      type: DataTypes.DECIMAL(20, 6),
      defaultValue: 0,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  // Add indexes for better performance
  await queryInterface.addIndex('wallets', ['user_id']);
  await queryInterface.addIndex('wallets', ['tron_address']);
  await queryInterface.addIndex('wallets', ['usdt_balance']);
  await queryInterface.addIndex('wallets', ['iqd_balance']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('wallets');
}
