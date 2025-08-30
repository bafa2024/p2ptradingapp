@echo off
REM P2P Crypto Trading Platform Health Check Script (Windows)

echo ========================================
echo P2P Platform Health Check
echo ========================================

echo.
echo Container Status:
echo -----------------

REM Check container status
echo Checking MySQL Database container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_mysql_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking Redis Cache container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_redis_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking API Service container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_api_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking Web App container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_web_app_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking Admin Dashboard container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_admin_dashboard_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking Nginx Proxy container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_nginx_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking phpMyAdmin container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_phpmyadmin_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo Checking Redis Commander container... 
docker ps --format "table {{.Names}}\t{{.Status}}" | findstr "p2p_redis_commander_dev.*Up" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Running
) else (
    echo ✗ Not running
)

echo.
echo Port Availability:
echo ------------------

REM Check port availability
echo Checking MySQL port (3306)... 
netstat -an | findstr ":3306 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking Redis port (6379)... 
netstat -an | findstr ":6379 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking API port (3000)... 
netstat -an | findstr ":3000 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking Web App port (3002)... 
netstat -an | findstr ":3002 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking Admin Dashboard port (3003)... 
netstat -an | findstr ":3003 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking Nginx port (80)... 
netstat -an | findstr ":80 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking phpMyAdmin port (8080)... 
netstat -an | findstr ":8080 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo Checking Redis Commander port (8081)... 
netstat -an | findstr ":8081 " >nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ Available
) else (
    echo ✗ Not available
)

echo.
echo Service Health:
echo ---------------

REM Check service health (only if containers are running)
docker ps --format "table {{.Names}}" | findstr "p2p_api_dev" >nul 2>&1
if %errorlevel% equ 0 (
    echo Checking API Health... 
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:3000/health' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✓ OK' } else { Write-Host '✗ Failed (HTTP ' $response.StatusCode ')' } } catch { Write-Host '✗ Failed (Connection error)' }" 2>nul
) else (
    echo ⚠ API container not running - skipping health checks
)

docker ps --format "table {{.Names}}" | findstr "p2p_nginx_dev" >nul 2>&1
if %errorlevel% equ 0 (
    echo Checking Nginx Proxy... 
    powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost' -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✓ OK' } else { Write-Host '✗ Failed (HTTP ' $response.StatusCode ')' } } catch { Write-Host '✗ Failed (Connection error)' }" 2>nul
) else (
    echo ⚠ Nginx container not running - skipping proxy check
)

echo.
echo Database Connection:
echo -------------------

REM Check database connection
docker ps --format "table {{.Names}}" | findstr "p2p_mysql_dev" >nul 2>&1
if %errorlevel% equ 0 (
    echo Testing MySQL connection... 
    docker exec p2p_mysql_dev mysql -u p2p_user -pp2p_password -e "SELECT 1;" p2p_platform >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ Connected
    ) else (
        echo ✗ Connection failed
    )
) else (
    echo ⚠ MySQL container not running - skipping connection test
)

echo.
echo Redis Connection:
echo ----------------

REM Check Redis connection
docker ps --format "table {{.Names}}" | findstr "p2p_redis_dev" >nul 2>&1
if %errorlevel% equ 0 (
    echo Testing Redis connection... 
    docker exec p2p_redis_dev redis-cli ping >nul 2>&1
    if %errorlevel% equ 0 (
        echo ✓ Connected
    ) else (
        echo ✗ Connection failed
    )
) else (
    echo ⚠ Redis container not running - skipping connection test
)

echo.
echo ========================================
echo Health Check Complete
echo ========================================

echo.
echo Summary:
echo --------
echo Run 'docker-compose -f docker-compose.dev.yml ps' to see all container statuses
echo Run 'docker-compose -f docker-compose.dev.yml logs -f' to see all logs
echo Run 'make status' or 'make logs' if you have the Makefile available

pause


