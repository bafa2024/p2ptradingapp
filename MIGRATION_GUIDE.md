# Database Migration Guide for okx_platform

## Prerequisites

1. **Start MySQL Server**
   - If using XAMPP, start MySQL from XAMPP Control Panel
   - Or start MySQL service manually

2. **Verify MySQL is Running**
   ```bash
   # Check if MySQL is accessible
   mysql -u root -e "SELECT 1;"
   ```

3. **Check Environment Variables**
   - Ensure `.env` file exists in `packages/api/` directory
   - Or set environment variables:
     ```bash
     DB_HOST=localhost
     DB_PORT=3306
     DB_NAME=okx_platform
     DB_USER=root
     DB_PASSWORD=your_password
     DB_DIALECT=mysql
     ```

---

## Migration Steps

### Option 1: Automated Script (Recommended)

```bash
cd packages/api
node migrate-database.js
```

This script will:
1. Create the database if it doesn't exist
2. Run all migrations
3. Show migration status

### Option 2: Manual Migration

#### Step 1: Create Database
```bash
cd packages/api
npx sequelize-cli db:create
```

Or manually:
```sql
CREATE DATABASE IF NOT EXISTS okx_platform 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

#### Step 2: Run Migrations
```bash
cd packages/api
npx sequelize-cli db:migrate
```

#### Step 3: Verify Migration Status
```bash
npx sequelize-cli db:migrate:status
```

#### Step 4: (Optional) Seed Demo Data
```bash
npx sequelize-cli db:seed:all
```

---

## Expected Migration Output

When successful, you should see:

```
Sequelize CLI [Node: x.x.x, CLI: x.x.x, ORM: x.x.x]

Loaded configuration file "src\config\database.js".
Using environment "development".

== 000_create_users_table: migrating =======
== 000_create_users_table: migrated (0.xxx s)

== 20250121120000-create-users: migrating =======
== 20250121120000-create-users: migrated (0.xxx s)

== 20250121120001-create-wallets: migrating =======
== 20250121120001-create-wallets: migrated (0.xxx s)

== 20250121120002-create-trades: migrating =======
== 20250121120002-create-trades: migrated (0.xxx s)

== 20250121120003-create-transactions: migrating =======
== 20250121120003-create-transactions: migrated (0.xxx s)

== 20250121120004-create-disputes: migrating =======
== 20250121120004-create-disputes: migrated (0.xxx s)

== 20250121120005-create-support-tickets: migrating =======
== 20250121120005-create-support-tickets: migrated (0.xxx s)

== 20250121120006-create-orders: migrating =======
== 20250121120006-create-orders: migrated (0.xxx s)

== 20250121120007-create-transactions-for-matching: migrating =======
== 20250121120007-create-transactions-for-matching: migrated (0.xxx s)

== 20250122000001-add-role-to-users: migrating =======
== 20250122000001-add-role-to-users: migrated (0.xxx s)
```

---

## Tables Created

After migration, the following tables should exist:

- ✅ `users` - User accounts with roles
- ✅ `Wallets` - User wallets
- ✅ `Orders` - Buy/sell orders
- ✅ `Transactions` - Trade transactions
- ✅ `Trades` - Trade records
- ✅ `Disputes` - Dispute records
- ✅ `SupportTickets` - Support tickets

---

## Verify Database

### Check Tables
```sql
USE okx_platform;
SHOW TABLES;
```

### Check Users Table Structure
```sql
DESCRIBE users;
```

Should show columns including:
- `id` (CHAR(36))
- `email` (VARCHAR(255))
- `role` (ENUM('user', 'admin'))
- `password_hash`
- `kyc_status`
- etc.

---

## Troubleshooting

### Error: "Can't connect to MySQL server"
**Solution**: Start MySQL server first
- XAMPP: Start MySQL from Control Panel
- Windows Service: Start MySQL service
- Linux: `sudo systemctl start mysql`

### Error: "Access denied for user"
**Solution**: Check database credentials in `.env` file

### Error: "Unknown database 'okx_platform'"
**Solution**: Create database first:
```bash
npx sequelize-cli db:create
```

### Error: "Table already exists"
**Solution**: 
- If you want to reset: `npx sequelize-cli db:migrate:undo:all`
- Then run: `npx sequelize-cli db:migrate`

### Error: "Foreign key constraint is incorrectly formed"
**Solution**: Make sure migrations run in order. If issues persist:
```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
```

---

## Rollback Migrations

If you need to rollback:

```bash
# Rollback last migration
npx sequelize-cli db:migrate:undo

# Rollback all migrations
npx sequelize-cli db:migrate:undo:all
```

---

## Seed Demo Data (Optional)

After migrations, seed demo users:

```bash
npx sequelize-cli db:seed:all
```

Or specific seeder:
```bash
npx sequelize-cli db:seed --seed 20250122000000-seed-demo-users-wallets.js
```

This creates:
- `user1@test.com` (password: `password123`)
- `user2@test.com` (password: `password123`)
- `user3@test.com` (password: `password123`)

Each with 1000 USDT in their wallet.

---

## Quick Commands Reference

```bash
# Create database
npx sequelize-cli db:create

# Run migrations
npx sequelize-cli db:migrate

# Check status
npx sequelize-cli db:migrate:status

# Rollback last
npx sequelize-cli db:migrate:undo

# Rollback all
npx sequelize-cli db:migrate:undo:all

# Seed data
npx sequelize-cli db:seed:all

# Undo seeds
npx sequelize-cli db:seed:undo:all
```

---

## Next Steps

After successful migration:

1. ✅ Verify tables exist
2. ✅ (Optional) Seed demo data
3. ✅ Start the API server: `npm run dev`
4. ✅ Test endpoints
5. ✅ Test Socket.IO connections

