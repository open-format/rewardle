FROM node:18-slim

WORKDIR /app/backend

# Install needed libs for prisma, e.g. openssl, etc..
RUN apt-get update -qq && apt-get install -y build-essential openssl pkg-config python-is-python3

# Install bun
RUN npm install -g bun

# Copy the entire monorepo
COPY . .

ARG CACHEBUST=2

# Clean install. Install TurboRepo and dependencies
RUN bun install --ci

#RUN cd backend && npx prisma generate && cd ..
RUN npx prisma generate && npx prisma migrate dev

# Start command for backend
CMD ["bun", "run", "start"]
