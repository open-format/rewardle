install: 
	bun install

db: 
	cd backend && npx prisma migrate dev

setup: install db