@echo off
REM =============================================================================
REM Database Setup Script for P2P Crypto Trading Platform (Windows)
REM =============================================================================

setlocal enabledelayedexpansion

REM Configuration
set DB_HOST=%DB_HOST%
if "%DB_HOST%"=="" set DB_HOST=localhost

set DB_PORT=%DB_PORT%
if "%DB_PORT%"=="" set DB_PORT=3306

set DB_USER=%DB_USER%
if "%DB_USER%"=="" set DB_USER=root

set DB_PASSWORD=%DB_PASSWORD%
if "%DB_PASSWORD%"=="" set DB_PASSWORD=

set DB_NAME=%DB_NAME%
if "%DB_NAME%"=="" set DB_NAME=p2p_platform

set SCHEMA_FILE=packages\api\src\database\migrations

echo 🚀 Setting up P2P Crypto Trading Platform Database...

REM Check if MySQL client is installed
mysql --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ MySQL client is not installed. Please install MySQL client first.
    pause
    exit /b 1
)

echo ✅ MySQL client found

REM Check if schema file exists
if not exist "%SCHEMA_FILE%" (
    echo ❌ Schema file not found: %SCHEMA_FILE%
    pause
    exit /b 1
)

echo ✅ Schema file found: %SCHEMA_FILE%

REM Test database connection
echo 🔌 Testing database connection...
if "%DB_PASSWORD%"=="" (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -e "SELECT 1;" >nul 2>&1
) else (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -p"%DB_PASSWORD%" -e "SELECT 1;" >nul 2>&1
)

if %errorlevel% neq 0 (
    echo ❌ Database connection failed
    echo Please check your database configuration:
    echo   Host: %DB_HOST%
    echo   Port: %DB_PORT%
    echo   User: %DB_USER%
    echo   Password: %DB_PASSWORD%
    pause
    exit /b 1
)

echo ✅ Database connection successful

REM Create database if it doesn't exist
echo 📁 Creating database if it doesn't exist...
if "%DB_PASSWORD%"=="" (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -e "CREATE DATABASE IF NOT EXISTS \`%DB_NAME%\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
) else (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -p"%DB_PASSWORD%" -e "CREATE DATABASE IF NOT EXISTS \`%DB_NAME%\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
)

echo ✅ Database '%DB_NAME%' ready

REM Run schema file
echo 📋 Running database schema...
if "%DB_PASSWORD%"=="" (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" "%DB_NAME%" < "%SCHEMA_FILE%"
) else (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -p"%DB_PASSWORD%" "%DB_NAME%" < "%SCHEMA_FILE%"
)

echo ✅ Database schema applied successfully

REM Verify tables were created
echo 🔍 Verifying database setup...
if "%DB_PASSWORD%"=="" (
    for /f "tokens=*" %%i in ('mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" "%DB_NAME%" -s -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '%DB_NAME%';"') do set TABLE_COUNT=%%i
) else (
    for /f "tokens=*" %%i in ('mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -p"%DB_PASSWORD%" "%DB_NAME%" -s -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '%DB_NAME%';"') do set TABLE_COUNT=%%i
)

echo ✅ Database setup completed successfully!
echo 📊 Tables created: %TABLE_COUNT%

REM Show table information
echo 📋 Database tables:
if "%DB_PASSWORD%"=="" (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" "%DB_NAME%" -e "SHOW TABLES;"
) else (
    mysql -h "%DB_HOST%" -P "%DB_PORT%" -u "%DB_USER%" -p"%DB_PASSWORD%" "%DB_NAME%" -e "SHOW TABLES;"
)

echo 🎉 Database setup completed!
echo Next steps:
echo   1. Update your .env file with database credentials
echo   2. Run: npm run start:api
echo   3. Test the API endpoints

pause
