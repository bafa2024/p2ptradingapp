#!/bin/bash

# =============================================================================
# Database Setup Script for P2P Crypto Trading Platform
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
DB_HOST=${DB_HOST:-"localhost"}
DB_PORT=${DB_PORT:-"3306"}
DB_USER=${DB_USER:-"root"}
DB_PASSWORD=${DB_PASSWORD:-""}
DB_NAME=${DB_NAME:-"okx_platform"}
SCHEMA_FILE="packages/api/src/database/migrations"

echo -e "${BLUE}🚀 Setting up P2P Crypto Trading Platform Database...${NC}"

# Check if MySQL client is installed
if ! command -v mysql &> /dev/null; then
    echo -e "${RED}❌ MySQL client is not installed. Please install MySQL client first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ MySQL client found${NC}"

# Check if schema file exists
if [ ! -f "$SCHEMA_FILE" ]; then
    echo -e "${RED}❌ Schema file not found: $SCHEMA_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Schema file found: $SCHEMA_FILE${NC}"

# Function to test database connection
test_connection() {
    if [ -z "$DB_PASSWORD" ]; then
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -e "SELECT 1;" > /dev/null 2>&1
    else
        mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "SELECT 1;" > /dev/null 2>&1
    fi
}

# Test database connection
echo -e "${BLUE}🔌 Testing database connection...${NC}"
if test_connection; then
    echo -e "${GREEN}✅ Database connection successful${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    echo -e "${YELLOW}Please check your database configuration:${NC}"
    echo -e "  Host: $DB_HOST"
    echo -e "  Port: $DB_PORT"
    echo -e "  User: $DB_USER"
    echo -e "  Password: ${DB_PASSWORD:+"***"}"
    exit 1
fi

# Create database if it doesn't exist
echo -e "${BLUE}📁 Creating database if it doesn't exist...${NC}"
if [ -z "$DB_PASSWORD" ]; then
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
else
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
fi
echo -e "${GREEN}✅ Database '$DB_NAME' ready${NC}"

# Run schema file
echo -e "${BLUE}📋 Running database schema...${NC}"
if [ -z "$DB_PASSWORD" ]; then
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" < "$SCHEMA_FILE"
else
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" < "$SCHEMA_FILE"
fi
echo -e "${GREEN}✅ Database schema applied successfully${NC}"

# Verify tables were created
echo -e "${BLUE}🔍 Verifying database setup...${NC}"
if [ -z "$DB_PASSWORD" ]; then
    TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" -s -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME';")
else
    TABLE_COUNT=$(mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -s -N -e "SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = '$DB_NAME';")
fi

echo -e "${GREEN}✅ Database setup completed successfully!${NC}"
echo -e "${BLUE}📊 Tables created: $TABLE_COUNT${NC}"

# Show table information
echo -e "${BLUE}📋 Database tables:${NC}"
if [ -z "$DB_PASSWORD" ]; then
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" "$DB_NAME" -e "SHOW TABLES;"
else
    mysql -h "$DB_HOST" -P "$DB_PORT" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" -e "SHOW TABLES;"
fi

echo -e "${GREEN}🎉 Database setup completed!${NC}"
echo -e "${BLUE}Next steps:${NC}"
echo -e "  1. Update your .env file with database credentials"
echo -e "  2. Run: npm run start:api"
echo -e "  3. Test the API endpoints"
