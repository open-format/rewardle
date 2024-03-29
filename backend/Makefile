# Default environment and action
ENV := local
ACTION := up -d

# Function to set environment and compose file based on the first argument
set-env = \
	$(eval ENV := $(1)) \
	$(eval COMPOSE_FILE := $(if $(filter $(1),local),docker-compose.ports.yml,docker-compose.expose.yml))

# Function to execute Docker Compose command
compose-cmd = \
	@echo "Performing '$(ACTION)' on $(ENV) environment..." ; \
	docker compose -f docker-compose.yml -f $(COMPOSE_FILE) --env-file docker/.env.$(ENV) $(ACTION)

# Pattern targets for environments and actions
local staging production:
	$(call set-env,$@)
	$(call compose-cmd)

# Catch-all target to handle actions passed as arguments
%:
	@: # No-op, allows any argument to be passed

# Dynamic rule to handle environment-action pairs
local% staging% production%:
	$(call set-env,$(firstword $(subst _, ,$@)))
	$(eval ACTION := $(word 2,$(subst _, ,$@)))
	$(call compose-cmd)


# Usage
# make local up
# make staging "up -d"
# make production down