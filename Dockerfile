FROM oven/bun:1

# Copy the entire monorepo
WORKDIR /app
COPY . .

# Install TurboRepo and dependencies
RUN bun install

# Install Prisma CLI
RUN bun install @prisma/cli --save-dev
RUN cd backend && npx prisma generate && cd ..

# npx prisma migrate dev

# Expose ports for frontend and backend
EXPOSE 3000 8080

# Start commands for frontend and backend
CMD ["bun", "run", "dev"]
