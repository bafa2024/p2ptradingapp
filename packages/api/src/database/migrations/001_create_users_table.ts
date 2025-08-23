import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      unique: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: true,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    kyc_status: {
      type: DataTypes.ENUM('pending', 'verified', 'rejected'),
      defaultValue: 'pending',
      allowNull: false,
    },
    membership_tier: {
      type: DataTypes.ENUM('free', 'basic', 'premium'),
      defaultValue: 'free',
      allowNull: false,
    },
    referral_code: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: true,
    },
    referred_by: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });

  // Add indexes for better performance
  await queryInterface.addIndex('users', ['phone_number']);
  await queryInterface.addIndex('users', ['email']);
  await queryInterface.addIndex('users', ['username']);
  await queryInterface.addIndex('users', ['kyc_status']);
  await queryInterface.addIndex('users', ['membership_tier']);
  await queryInterface.addIndex('users', ['referral_code']);
  await queryInterface.addIndex('users', ['referred_by']);
  await queryInterface.addIndex('users', ['created_at']);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('users');
}
