export type WalletId = string;
export type TransactionId = string;
export type TronAddress = string;
export type CurrencyCode = 'USDT' | 'IQD' | 'BTC' | 'ETH' | 'TRX';
export type TransactionType = 'deposit' | 'withdrawal' | 'internal_transfer' | 'trade' | 'commission' | 'fee' | 'refund';
export type TransactionStatus = 'pending' | 'confirmed' | 'failed' | 'cancelled';

export interface BaseWallet {
  id: WalletId;
  user_id: string;
  tron_address?: TronAddress;
  usdt_balance: number;
  iqd_balance: number;
  locked_balance: number;
  created_at: Date;
  updated_at: Date;
}

export interface WalletBalance {
  currency: CurrencyCode;
  available_balance: number;
  locked_balance: number;
  total_balance: number;
}

export interface Transaction {
  id: TransactionId;
  user_id: string;
  wallet_id: WalletId;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode;
  tx_hash?: string;
  status: TransactionStatus;
  from_address?: string;
  to_address?: string;
  fee?: number;
  confirmation_count?: number;
  block_number?: number;
  metadata?: Record<string, any>;
  description?: string;
  created_at: Date;
  confirmed_at?: Date;
}

export interface WalletAddress {
  id: string;
  user_id: string;
  currency: CurrencyCode;
  address: string;
  label?: string;
  is_primary: boolean;
  created_at: Date;
}

export interface WithdrawalRequest {
  amount: number;
  currency: CurrencyCode;
  to_address: string;
  description?: string;
  two_factor_code?: string;
}

export interface DepositInfo {
  currency: CurrencyCode;
  address: string;
  qr_code_url: string;
  minimum_amount: number;
  network_fee: number;
  confirmation_blocks: number;
}

export interface InternalTransferRequest {
  to_user_id: string;
  amount: number;
  currency: CurrencyCode;
  description?: string;
}

export interface WalletStats {
  user_id: string;
  total_deposits: number;
  total_withdrawals: number;
  total_trades: number;
  total_fees_paid: number;
  total_commissions_earned: number;
  average_transaction_amount: number;
  last_transaction_date?: Date;
  first_transaction_date?: Date;
}

export type CreateWalletRequest = Pick<BaseWallet, 'user_id'>;
export type WalletResponse = Omit<BaseWallet, 'user_id'> & {
  balances: WalletBalance[];
};


