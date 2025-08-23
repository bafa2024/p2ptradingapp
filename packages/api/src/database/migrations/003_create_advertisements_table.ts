import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('advertisements', {
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
      type: DataTypes.ENUM('buy', 'sell'),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    min_amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    max_amount: {
      type: DataTypes.DECIMAL(20, 6),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(20, 2),
      allowNull: false,
    },
    payment_methods: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    terms: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    is_promoted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  // Add indexes for better performance
  await queryInterface.addIndex('advertisements', ['user_id']);
  await queryInterface.addIndex('advertisements', ['type']);
  await queryInterface.addIndex('advertisements', ['currency']);
  await queryInterface.addIndex('advertisements', ['price']);
  await queryInterface.addIndex('advertisements', ['is_active']);
  await queryInterface.addIndex('advertisements', ['is_promoted']);
  await queryInterface.addIndex('advertisements', ['created_at']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('advertisements');
}
