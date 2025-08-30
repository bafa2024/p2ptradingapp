@echo off
echo ========================================
echo P2P Crypto Trading Platform - Docker Setup
echo ========================================

echo.
echo Checking Docker installation...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Docker is not installed or not running!
    echo Please install Docker Desktop and start it.
    pause
    exit /b 1
)

echo Docker is available.

echo.
echo Building and starting services...
echo.

cd /d "%~dp0"

echo Starting development environment...
docker-compose -f docker-compose.dev.yml up --build -d

echo.
echo Waiting for services to start...
timeout /t 10 /nobreak >nul

echo.
echo Checking service status...
docker-compose -f docker-compose.dev.yml ps

echo.
echo ========================================
echo Services are starting up!
echo ========================================
echo.
echo Access points:
echo - API: http://localhost:3000
echo - Web App: http://localhost:3002
echo - Admin Dashboard: http://localhost:3003
echo - phpMyAdmin: http://localhost:8080
echo - Redis Commander: http://localhost:8081
echo - Nginx Proxy: http://localhost
echo.
echo To view logs: docker-compose -f docker-compose.dev.yml logs -f
echo To stop services: docker-compose -f docker-compose.dev.yml down
echo.
pause


