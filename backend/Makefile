# Define default environment as local
ENV ?= local

# Define docker compose command
COMPOSE_CMD = docker compose -f docker-compose.yml -f docker-compose.ports.yml --env-file docker/.env.$(ENV)

# Default target executed when no arguments are given to make
default: up

# Target for building the docker images
build:
	$(COMPOSE_CMD) build

# Target for running the docker containers
up:
	$(COMPOSE_CMD) up

# Target for stopping the docker containers
down:
	$(COMPOSE_CMD) down

# Target for seeing logs of the docker containers
logs:
	$(COMPOSE_CMD) logs

# To make build and up commands for specific environments
# Usage: make build ENV=staging
# Usage: make up ENV=production

