# ============================================================
# STAGE 1 — deps
# Install only production dependencies in a clean environment.
# We separate this from the build stage so that if only source
# code changes, we reuse the npm install cache layer.
# ============================================================
FROM node:22-alpine AS deps

# Set working directory inside the container
WORKDIR /app

# Copy only the files needed to install dependencies.
# If package.json hasn't changed, Docker reuses the cached
# layer — npm install does NOT re-run. This is layer caching.
COPY package.json package-lock.json ./

# --omit=dev installs only production dependencies.
# --frozen-lockfile ensures reproducible installs.
RUN npm ci --omit=dev --frozen-lockfile

# ============================================================
# STAGE 2 — builder
# Install ALL deps (including devDeps for TypeScript compiler),
# copy source, and compile TypeScript to JavaScript.
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package.json package-lock.json ./

# Install ALL dependencies (including TypeScript, tsx, etc.)
RUN npm ci --frozen-lockfile

# Copy the TypeScript source code and config
COPY tsconfig.json ./
COPY src/ ./src/

# Compile TypeScript → JavaScript into dist/
RUN npm run build

# ============================================================
# STAGE 3 — runtime
# The final image. Small and secure.
# Contains: Node.js runtime + compiled JS + prod node_modules.
# Does NOT contain: TypeScript source, dev dependencies,
# compilers, or any build tooling.
# ============================================================
FROM node:22-alpine AS runtime

# Security: do not run as root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy production node_modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy compiled JavaScript from the builder stage
COPY --from=builder /app/dist ./dist

# Copy package.json (needed by Node for module resolution)
COPY package.json ./

# Own the files as our non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Tell Docker this container listens on port 5000
EXPOSE 5000

# Healthcheck: hit the /api/health endpoint every 30s.
# If it fails 3 times in a row, container is "unhealthy".
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget -qO- http://localhost:5000/api/health || exit 1

# Start the compiled server
CMD ["node", "dist/server.js"]
