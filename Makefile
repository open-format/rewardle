install: 
	@bun install

db: 
	@cd backend && npx prisma migrate dev

generate-env-files:
	@cp backend/.env.example backend/.env
	@cp frontend/.env.local.example frontend/.env.local
	@echo "Environment files copied..."
	@echo "Update backend/.env and frontend/.env.local"

setup: install db generate-env-files 