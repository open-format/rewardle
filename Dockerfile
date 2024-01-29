FROM node:20-slim

WORKDIR /app

# Install needed libs for prisma, e.g. openssl, etc..
RUN apt-get update -qq && apt-get install -y build-essential openssl pkg-config python-is-python3

# Install bun
RUN npm install -g bun

# Install node modules
COPY bun.lockb package.json ./

# Copy the entire monorepo
COPY . .

# Clean install. Install TurboRepo and dependencies
RUN bun install --ci

#RUN cd backend && npx prisma generate && cd ..
RUN cd backend && npx migrate dev && cd ..

# Expose ports for frontend and backend
EXPOSE 3000 8080

# Start commands for frontend and backend
CMD ["bun", "run", "dev"]
