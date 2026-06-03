# ============================================================
# STAGE 1 — builder
# Install all deps and run `vite build`.
# Output: dist/ directory with index.html, JS bundles, CSS.
# ============================================================
FROM node:22-alpine AS builder

WORKDIR /app

# Copy manifests first — layer caching for npm install
COPY package.json package-lock.json ./

# Install all dependencies (including Vite, TypeScript, etc.)
RUN npm ci --legacy-peer-deps

# Copy the rest of the source
COPY . .

# Build for production.
# This runs: tsc -b && vite build
# Output goes to /app/dist
RUN npm run build

# ============================================================
# STAGE 2 — export
# A minimal image that just holds the built static files.
# The edge Nginx Dockerfile will COPY --from=frontend-export
# to get these files into itself.
#
# We use alpine here only as a base that's guaranteed
# to exist and is tiny. We are NOT running Nginx here — this
# stage exists solely to hold files so Docker can reference
# them with COPY --from=.
# ============================================================
FROM alpine:3.21 AS export

WORKDIR /static

# Copy only the built assets from the builder stage
COPY --from=builder /app/dist ./

# This image is never deployed as a container.
# It is only referenced during the Nginx image build.
