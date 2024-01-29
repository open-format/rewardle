FROM oven/bun:1

# Install Node.js (and npm, npx)
RUN apt-get update && apt-get install -y nodejs npm

# Copy the entire monorepo
WORKDIR /app
COPY . .

# Install TurboRepo and dependencies
RUN bun install

# Install Prisma CLI
RUN bun add @prisma/cli --save-dev
#RUN cd backend && npx prisma generate && cd ..
RUN cd backend && npx migrate dev && cd ..

# Expose ports for frontend and backend
EXPOSE 3000 8080

# Start commands for frontend and backend
CMD ["bun", "run", "dev"]
