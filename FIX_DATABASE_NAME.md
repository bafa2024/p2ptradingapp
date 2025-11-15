# Fix Database Name Issue

## Problem
Server is still trying to connect to `p2p_platform` instead of `okx_platform`.

## Solution

### Step 1: Stop the Server
Press `Ctrl+C` in the terminal where the server is running to stop it.

### Step 2: Verify .env File
Check that `packages/api/.env` has:
```bash
DB_NAME=okx_platform
```

### Step 3: Create/Update Database
```bash
# Create the database
mysql -u root -p
CREATE DATABASE IF NOT EXISTS okx_platform CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
```

### Step 4: Run Migrations
```bash
cd packages/api
npx sequelize-cli db:migrate
```

### Step 5: Restart Server
```bash
cd packages/api
npm run dev
```

## Verify It's Working

After restart, check the console - you should see:
```
✅ Sequelize database connection established successfully.
```

NOT:
```
❌ Sequelize database connection failed: Unknown database 'p2p_platform'
```

## If Still Not Working

1. **Check for cached environment variables:**
   ```powershell
   $env:DB_NAME
   ```
   If it shows `p2p_platform`, unset it:
   ```powershell
   Remove-Item Env:\DB_NAME
   ```

2. **Verify .env file location:**
   - Should be at: `packages/api/.env`
   - Should contain: `DB_NAME=okx_platform`

3. **Clear any cached modules:**
   - Stop server completely
   - Delete `node_modules/.cache` if it exists
   - Restart server

4. **Check database.js is loading correct .env:**
   - File: `packages/api/src/config/database.js`
   - Should load from both `packages/api/.env` and root `.env`

