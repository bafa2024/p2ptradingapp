import * as users from './001_create_users_table';
import * as wallets from './002_create_wallets_table';
import * as advertisements from './003_create_advertisements_table';
import * as trades from './004_create_trades_table';
import * as transactions from './005_create_transactions_table';

export const migrations = [
  users,
  wallets,
  advertisements,
  trades,
  transactions,
];

export default migrations;
