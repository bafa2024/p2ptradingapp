# Docker Setup Guide for P2P Crypto Trading Platform

This guide will help you set up and run the P2P Crypto Trading Platform locally using Docker.

## Prerequisites

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux) installed and running
- **Docker Compose** (usually included with Docker Desktop)
- At least **4GB RAM** available for Docker
- **Ports 80, 3000, 3002, 3003, 3306, 6379, 8080, 8081** available

## Quick Start

### Windows
```bash
cd docker
setup-docker.bat
```

### Linux/Mac
```bash
cd docker
chmod +x setup-docker.sh
./setup-docker.sh
```

### Manual Setup
```bash
cd docker
docker-compose -f docker-compose.dev.yml up --build -d
```

## What Gets Created

The Docker setup creates the following services:

### Core Services
- **MySQL Database** (Port 3306) - Main database for the platform
- **Redis Cache** (Port 6379) - Session and cache storage
- **API Service** (Port 3000) - Backend API with hot reload
- **Web App** (Port 3002) - Frontend web application
- **Admin Dashboard** (Port 3003) - Administrative interface
- **Nginx Proxy** (Port 80) - Reverse proxy and load balancer

### Management Tools
- **phpMyAdmin** (Port 8080) - Database management interface
- **Redis Commander** (Port 8081) - Redis management interface

## Access Points

Once all services are running, you can access:

- **Main Platform**: http://localhost
- **API Documentation**: http://localhost:3000/api/docs
- **Web Application**: http://localhost:3002
- **Admin Dashboard**: http://localhost:3003
- **Database Management**: http://localhost:8080
- **Redis Management**: http://localhost:8081

## Environment Configuration

The Docker environment uses the configuration from `docker/env.docker`. Key settings:

- **Database**: MySQL with user `p2p_user` and password `p2p_password`
- **Redis**: No authentication required
- **JWT Secret**: `dev-jwt-secret-key` (change in production)
- **Log Level**: `debug` for development

## Database Initialization

The MySQL container automatically:
1. Creates the `p2p_platform` database
2. Sets up the `p2p_user` with proper privileges
3. Creates basic table structure
4. Inserts a default admin user

### Default Admin User
- **Email**: admin@p2p-platform.com
- **Password**: admin123
- **Status**: Active, KYC approved

## Development Features

### Hot Reload
The API service runs with nodemon for automatic restart on code changes.

### Volume Mounting
Source code is mounted as volumes, so changes are reflected immediately.

### Debug Mode
All services run in development mode with verbose logging.

## Common Commands

### View Logs
```bash
# All services
docker-compose -f docker-compose.dev.yml logs -f

# Specific service
docker-compose -f docker-compose.dev.yml logs -f api
```

### Stop Services
```bash
docker-compose -f docker-compose.dev.yml down
```

### Restart Services
```bash
docker-compose -f docker-compose.dev.yml restart
```

### Rebuild Services
```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

### Access Container Shell
```bash
# API container
docker exec -it p2p_api_dev sh

# MySQL container
docker exec -it p2p_mysql_dev mysql -u p2p_user -p p2p_platform
```

## Troubleshooting

### Port Conflicts
If you get port conflicts, check what's using the ports:
```bash
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000
```

### Database Connection Issues
1. Wait for MySQL to fully start (can take 30-60 seconds)
2. Check MySQL logs: `docker logs p2p_mysql_dev`
3. Verify credentials in `docker/env.docker`

### Memory Issues
If Docker runs out of memory:
1. Increase Docker memory limit in Docker Desktop settings
2. Stop unnecessary containers: `docker system prune`

### Service Won't Start
1. Check logs: `docker logs <container_name>`
2. Verify Docker has enough resources
3. Check if ports are available

## Production Considerations

For production deployment:

1. **Change default passwords** in environment files
2. **Use production JWT secrets**
3. **Enable SSL/TLS** in Nginx configuration
4. **Set up proper logging** and monitoring
5. **Configure backup strategies** for databases
6. **Use production Docker images** and remove development tools

## File Structure

```
docker/
├── docker-compose.yml          # Production compose file
├── docker-compose.dev.yml      # Development compose file
├── env.docker                  # Docker environment variables
├── nginx/
│   └── nginx.conf             # Nginx configuration
├── mysql/
│   └── init/
│       └── 01-init.sql        # Database initialization
├── setup-docker.bat           # Windows setup script
├── setup-docker.sh            # Unix setup script
└── DOCKER_SETUP_GUIDE.md      # This guide
```

## Next Steps

After successful Docker setup:

1. **Test the API**: Visit http://localhost:3000/health
2. **Check database**: Access phpMyAdmin at http://localhost:8080
3. **Monitor logs**: Watch service logs for any errors
4. **Develop**: Start building your features with hot reload enabled

## Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review Docker and service logs
3. Verify all prerequisites are met
4. Check the main project documentation

Happy coding! 🚀


