# syntax=docker/dockerfile:1

# ==========================================
# STAGE 1: Base Alpine Node Environment
# ==========================================
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat
WORKDIR /app

# ==========================================
# STAGE 2: Dependency Cache Layer
# ==========================================
FROM base AS deps
WORKDIR /app

# Copy dependency manifests
COPY package.json package-lock.json* ./

# Install exact production & dev dependencies needed for compilation
RUN npm ci

# ==========================================
# STAGE 3: Build & Compile Next.js Application
# ==========================================
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Disable Next.js anonymous telemetry
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Compile static & dynamic pages with Next.js standalone optimization
RUN npm run build

# ==========================================
# STAGE 4: Ultra-Lean Production Runner (~130 MB)
# ==========================================
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create unprivileged system user for hardened security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy static public assets
COPY --from=builder /app/public ./public

# Set correct permission for prerender cache
RUN mkdir .next && chown nextjs:nodejs .next

# Leverage Next.js standalone output tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
