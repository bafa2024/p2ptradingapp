// src/models/Wallet.ts
import {
  Model,
  DataTypes,
  Sequelize,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  literal,
  where,
} from 'sequelize';

/**
 * Wallet model
 * - Uses DECIMAL for monetary values; getters convert to number for convenience.
 * - Uses `null` (not undefined) for optional columns to satisfy exactOptionalPropertyTypes.
 * - Provides safe helpers for available/locked balance changes and escrow operations.
 */
export class Wallet extends Model<
  InferAttributes<Wallet>,
  InferCreationAttributes<Wallet>
> {
  declare id: CreationOptional<string>;
  declare user_id: ForeignKey<string>;

  // Monetary values stored as DECIMAL in DB, exposed as number via getters
  declare usdt_available: number;
  declare usdt_locked: number;

  declare suspended_reason: string | null;
  declare suspended_at: Date | null;

  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  // --------------------------
  // Numeric-field whitelist for type-safe bumping
  // --------------------------
  private static numberKeys = new Set<keyof Wallet>([
    'usdt_available',
    'usdt_locked',
  ] as Array<keyof Wallet>);

  private bump(field: keyof Wallet, delta: number) {
    if (!Wallet.numberKeys.has(field)) {
      throw new Error(`Field ${String(field)} is not numeric on Wallet`);
    }
    const current = (this as any)[field] as number;
    (this as any)[field] = (current ?? 0) + delta;
  }

  // --------------------------
  // Convenience getters
  // --------------------------
  public get total_usdt(): number {
    return (this.usdt_available ?? 0) + (this.usdt_locked ?? 0);
  }

  // --------------------------
  // Guard / assertions
  // --------------------------
  public assertSufficientAvailable(amount: number, field: keyof Wallet = 'usdt_available') {
    const available = (this as any)[field] as number;
    if ((available ?? 0) < amount) {
      throw new Error(`Insufficient available balance: need ${amount}, have ${available ?? 0}`);
    }
  }

  public canLock(amount: number, availableField: keyof Wallet = 'usdt_available'): boolean {
    const available = (this as any)[availableField] as number;
    return (available ?? 0) >= amount;
  }

  // --------------------------
  // Balance operations (atomic at object level; wrap in Sequelize transaction at call site)
  // --------------------------
  public increaseAvailable(availableField: keyof Wallet = 'usdt_available', amount: number) {
    if (amount <= 0) throw new Error('increaseAvailable amount must be > 0');
    this.bump(availableField, amount);
  }

  public decreaseAvailable(availableField: keyof Wallet = 'usdt_available', amount: number) {
    if (amount <= 0) throw new Error('decreaseAvailable amount must be > 0');
    this.assertSufficientAvailable(amount, availableField);
    this.bump(availableField, -amount);
  }

  /** Lock from available → locked (escrow start) */
  public lock(
    availableField: keyof Wallet = 'usdt_available',
    lockedField: keyof Wallet = 'usdt_locked',
    amount: number
  ) {
    if (amount <= 0) throw new Error('lock amount must be > 0');
    this.assertSufficientAvailable(amount, availableField);
    this.bump(availableField, -amount);
    this.bump(lockedField, amount);
  }

  /** Unlock from locked → available (escrow cancel/revert) */
  public unlock(
    availableField: keyof Wallet = 'usdt_available',
    lockedField: keyof Wallet = 'usdt_locked',
    amount: number
  ) {
    if (amount <= 0) throw new Error('unlock amount must be > 0');
    // For safety, check locked too
    const locked = (this as any)[lockedField] as number;
    if ((locked ?? 0) < amount) {
      throw new Error(`Insufficient locked balance: need ${amount}, have ${locked ?? 0}`);
    }
    this.bump(lockedField, -amount);
    this.bump(availableField, amount);
  }

  /** Release from locked → (no longer held). Caller should credit buyer & platform fee via ledger outside this object. */
  public releaseFromLocked(
    lockedField: keyof Wallet = 'usdt_locked',
    amount: number
  ) {
    if (amount <= 0) throw new Error('release amount must be > 0');
    const locked = (this as any)[lockedField] as number;
    if ((locked ?? 0) < amount) {
      throw new Error(`Insufficient locked balance: need ${amount}, have ${locked ?? 0}`);
    }
    this.bump(lockedField, -amount);
  }

  /** Clear suspension state */
  public clearSuspension() {
    this.suspended_reason = null;
    this.suspended_at = null;
  }

  // --------------------------
  // Static helpers / scopes
  // --------------------------
  /** WHERE (available + locked) >= minBalance */
  public static hasMinTotalBalance(
    availableField: 'usdt_available' = 'usdt_available',
    lockedField: 'usdt_locked' = 'usdt_locked',
    minBalance: number = 0
  ) {
    return where(literal(`${availableField} + ${lockedField}`), '>=', minBalance);
  }

  // --------------------------
  // Init
  // --------------------------
  static initModel(sequelize: Sequelize) {
    Wallet.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },

        // Monetary columns (DECIMAL for precision). Getters convert to number.
        usdt_available: {
          type: DataTypes.DECIMAL(30, 8),
          allowNull: false,
          defaultValue: '0',
          get(this: Wallet) {
            const raw = this.getDataValue('usdt_available') as unknown as string | number | null;
            return typeof raw === 'string' ? parseFloat(raw) : (raw ?? 0);
          },
          set(this: Wallet, v: number | string) {
            // store as string to avoid JS float drift
            const n = typeof v === 'string' ? v : String(v);
            this.setDataValue('usdt_available', n);
          },
        },
        usdt_locked: {
          type: DataTypes.DECIMAL(30, 8),
          allowNull: false,
          defaultValue: '0',
          get(this: Wallet) {
            const raw = this.getDataValue('usdt_locked') as unknown as string | number | null;
            return typeof raw === 'string' ? parseFloat(raw) : (raw ?? 0);
          },
          set(this: Wallet, v: number | string) {
            const n = typeof v === 'string' ? v : String(v);
            this.setDataValue('usdt_locked', n);
          },
        },

        suspended_reason: {
          type: DataTypes.STRING,
          allowNull: true,
          defaultValue: null,
        },
        suspended_at: {
          type: DataTypes.DATE,
          allowNull: true,
          defaultValue: null,
        },

        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        sequelize,
        tableName: 'wallets',
        modelName: 'Wallet',
        underscored: true,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        indexes: [
          { fields: ['user_id'] },
        ],
      }
    );
  }
}

/**
 * Associate here (call from your models/index.ts after initModel):
 *   Wallet.belongsTo(User, { foreignKey: 'user_id' });
 */
export function initWallet(sequelize: Sequelize) {
  Wallet.initModel(sequelize);
}
