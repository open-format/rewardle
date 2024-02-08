# Default action
ACTION = up -d

# Use argument for environment, default to 'local'
ENV = local

# Define docker compose command based on the environment
ifeq ($(ENV), local)
	COMPOSE_FILE = docker-compose.ports.yml
else
	COMPOSE_FILE = docker-compose.expose.yml
endif

COMPOSE_CMD = docker compose -f docker-compose.yml -f $(COMPOSE_FILE) --env-file docker/.env.$(ENV)

default:
	@echo "Usage: make [ENV=environment] action"
	@echo "* environment: local (default), staging, production"
	@echo "* action: build, up, down, logs, etc."
	@echo "Example: make ENV=production action=up -d"

# Dynamic target to handle various Docker Compose actions
action:
	@echo "Performing '$(ACTION)' on $(ENV) environment..."
	$(COMPOSE_CMD) $(ACTION)

# Usage
# make ENV=local ACTION=up
# make ENV=staging ACTION="up -d"
# make ENV=production ACTION=down