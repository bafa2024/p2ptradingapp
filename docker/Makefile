# P2P Crypto Trading Platform Docker Makefile

.PHONY: help build up down restart logs clean status shell-api shell-mysql shell-redis

# Default target
help:
	@echo "P2P Crypto Trading Platform Docker Commands:"
	@echo ""
	@echo "  build     - Build all Docker images"
	@echo "  up        - Start all services in background"
	@echo "  up-dev    - Start development environment"
	@echo "  down      - Stop and remove all services"
	@echo "  restart   - Restart all services"
	@echo "  logs      - Show logs for all services"
	@echo "  logs-api  - Show API service logs"
	@echo "  status    - Show status of all services"
	@echo "  clean     - Remove all containers, networks, and volumes"
	@echo "  shell-api - Open shell in API container"
	@echo "  shell-mysql - Open MySQL shell"
	@echo "  shell-redis - Open Redis shell"
	@echo "  test      - Run tests in API container"
	@echo "  migrate   - Run database migrations"
	@echo "  seed      - Run database seeds"

# Build all images
build:
	docker-compose -f docker-compose.dev.yml build

# Start production environment
up:
	docker-compose -f docker-compose.yml up -d

# Start development environment
up-dev:
	docker-compose -f docker-compose.dev.yml up -d

# Stop all services
down:
	docker-compose -f docker-compose.dev.yml down

# Restart all services
restart:
	docker-compose -f docker-compose.dev.yml restart

# Show logs for all services
logs:
	docker-compose -f docker-compose.dev.yml logs -f

# Show API service logs
logs-api:
	docker-compose -f docker-compose.dev.yml logs -f api

# Show status of all services
status:
	docker-compose -f docker-compose.dev.yml ps

# Clean up everything
clean:
	docker-compose -f docker-compose.dev.yml down -v --remove-orphans
	docker system prune -f

# Open shell in API container
shell-api:
	docker exec -it p2p_api_dev sh

# Open MySQL shell
shell-mysql:
	docker exec -it p2p_mysql_dev mysql -u p2p_user -p p2p_platform

# Open Redis shell
shell-redis:
	docker exec -it p2p_redis_dev redis-cli

# Run tests in API container
test:
	docker exec -it p2p_api_dev npm test

# Run database migrations
migrate:
	docker exec -it p2p_api_dev npm run migrate

# Run database seeds
seed:
	docker exec -it p2p_api_dev npm run seed

# Quick setup (build + start)
setup: build up-dev
	@echo "Waiting for services to start..."
	@sleep 10
	@echo "Services are starting up!"
	@echo "Access points:"
	@echo "- API: http://localhost:3000"
	@echo "- Web App: http://localhost:3002"
	@echo "- Admin Dashboard: http://localhost:3003"
	@echo "- phpMyAdmin: http://localhost:8080"
	@echo "- Redis Commander: http://localhost:8081"
	@echo "- Nginx Proxy: http://localhost"

# Development workflow
dev: up-dev
	@echo "Development environment started!"
	@echo "API logs: make logs-api"
	@echo "Shell access: make shell-api"


