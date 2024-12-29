# Stage 1: Dependencies
FROM oven/bun:1 AS deps
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
COPY apps/web/package.json ./apps/web/
COPY apps/arena-server/package.json ./apps/arena-server/
COPY apps/lobby-server/package.json ./apps/lobby-server/
COPY games/tanks/package.json ./games/tanks/
COPY games/volley/package.json ./games/volley/
COPY packages/utils/package.json ./packages/utils/
RUN bun install --frozen-lockfile --production

# Stage 2: Builder
FROM oven/bun:1 AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

# Stage 3: Runner
FROM oven/bun:1 AS runner
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app .
RUN chown -R bun:bun /usr/src/app
USER bun