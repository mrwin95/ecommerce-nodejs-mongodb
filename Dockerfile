# Stage 1: Build the app
FROM node:18-alpine AS builder

# Create app directory
WORKDIR /app
# COPY package.json and package-lock.json
COPY package*.json pnpm-lock.yaml ./

# Install app dependencies with frozen-lockfile for consistency

RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Build the app
RUN pnpm run build && pnpm prune --prod && rm -rf /usr/share/doc /usr/share/man /var/cache/apk/*

# Stage 2: Run the app
FROM node:18-alpine AS runner
# FROM gcr.io/distroless/nodejs:18 AS runner

# Create app directory
WORKDIR /app
# Copy only the nessary files from the builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock*.yaml ./

COPY .env ./

# Install pnpm globally
# RUN npm install -g pnpm && pnpm install --prod --frozen-lockfile && addgroup -S appgroup && adduser -S appuser -G appgroup
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Create a non-root user for security
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup

USER appuser

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "dist/server.js"]

