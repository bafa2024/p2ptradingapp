#!/bin/bash

# P2P Crypto Trading Platform Health Check Script

echo "========================================"
echo "P2P Platform Health Check"
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check service health
check_service() {
    local service_name=$1
    local url=$2
    local expected_status=$3
    
    echo -n "Checking $service_name... "
    
    if command -v curl &> /dev/null; then
        response=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null)
        if [ "$response" = "$expected_status" ]; then
            echo -e "${GREEN}✓ OK${NC}"
            return 0
        else
            echo -e "${RED}✗ Failed (HTTP $response)${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠ Skipped (curl not available)${NC}"
        return 0
    fi
}

# Function to check container status
check_container() {
    local container_name=$1
    local service_name=$2
    
    echo -n "Checking $service_name container... "
    
    if docker ps --format "table {{.Names}}\t{{.Status}}" | grep -q "$container_name.*Up"; then
        echo -e "${GREEN}✓ Running${NC}"
        return 0
    else
        echo -e "${RED}✗ Not running${NC}"
        return 1
    fi
}

# Function to check port availability
check_port() {
    local port=$1
    local service_name=$2
    
    echo -n "Checking $service_name port ($port)... "
    
    if command -v netstat &> /dev/null; then
        if netstat -tuln 2>/dev/null | grep -q ":$port "; then
            echo -e "${GREEN}✓ Available${NC}"
            return 0
        else
            echo -e "${RED}✗ Not available${NC}"
            return 1
        fi
    elif command -v ss &> /dev/null; then
        if ss -tuln 2>/dev/null | grep -q ":$port "; then
            echo -e "${GREEN}✓ Available${NC}"
            return 0
        else
            echo -e "${RED}✗ Not available${NC}"
            return 1
        fi
    else
        echo -e "${YELLOW}⚠ Skipped (netstat/ss not available)${NC}"
        return 0
    fi
}

echo ""
echo "Container Status:"
echo "-----------------"

# Check container status
check_container "p2p_mysql_dev" "MySQL Database"
check_container "p2p_redis_dev" "Redis Cache"
check_container "p2p_api_dev" "API Service"
check_container "p2p_web_app_dev" "Web App"
check_container "p2p_admin_dashboard_dev" "Admin Dashboard"
check_container "p2p_nginx_dev" "Nginx Proxy"
check_container "p2p_phpmyadmin_dev" "phpMyAdmin"
check_container "p2p_redis_commander_dev" "Redis Commander"

echo ""
echo "Port Availability:"
echo "------------------"

# Check port availability
check_port 3306 "MySQL"
check_port 6379 "Redis"
check_port 3000 "API"
check_port 3002 "Web App"
check_port 3003 "Admin Dashboard"
check_port 80 "Nginx"
check_port 8080 "phpMyAdmin"
check_port 8081 "Redis Commander"

echo ""
echo "Service Health:"
echo "---------------"

# Check service health (only if containers are running)
if docker ps --format "table {{.Names}}" | grep -q "p2p_api_dev"; then
    check_service "API Health" "http://localhost:3000/health" "200"
    check_service "API Base" "http://localhost:3000" "200"
else
    echo -e "${YELLOW}⚠ API container not running - skipping health checks${NC}"
fi

if docker ps --format "table {{.Names}}" | grep -q "p2p_nginx_dev"; then
    check_service "Nginx Proxy" "http://localhost" "200"
else
    echo -e "${YELLOW}⚠ Nginx container not running - skipping proxy check${NC}"
fi

echo ""
echo "Database Connection:"
echo "-------------------"

# Check database connection
if docker ps --format "table {{.Names}}" | grep -q "p2p_mysql_dev"; then
    echo -n "Testing MySQL connection... "
    if docker exec p2p_mysql_dev mysql -u p2p_user -pp2p_password -e "SELECT 1;" p2p_platform >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Connected${NC}"
    else
        echo -e "${RED}✗ Connection failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠ MySQL container not running - skipping connection test${NC}"
fi

echo ""
echo "Redis Connection:"
echo "----------------"

# Check Redis connection
if docker ps --format "table {{.Names}}" | grep -q "p2p_redis_dev"; then
    echo -n "Testing Redis connection... "
    if docker exec p2p_redis_dev redis-cli ping >/dev/null 2>&1; then
        echo -e "${GREEN}✓ Connected${NC}"
    else
        echo -e "${RED}✗ Connection failed${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Redis container not running - skipping connection test${NC}"
fi

echo ""
echo "========================================"
echo "Health Check Complete"
echo "========================================"

# Summary
echo ""
echo "Summary:"
echo "--------"
echo "Run 'docker-compose -f docker-compose.dev.yml ps' to see all container statuses"
echo "Run 'docker-compose -f docker-compose.dev.yml logs -f' to see all logs"
echo "Run 'make status' or 'make logs' if you have the Makefile available"


