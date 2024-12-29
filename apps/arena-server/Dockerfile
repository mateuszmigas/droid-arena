# syntax=docker/dockerfile:1.7-labs

# Build the static files
FROM node:20-slim AS build-stage

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml /app/
COPY --parents **/package.json /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile

COPY . /app
WORKDIR /app/apps/arena-server
RUN pnpm run build

# Run the server using Bun
FROM oven/bun:1 AS production-stage

WORKDIR /usr/src/app/apps/arena-server
COPY --from=build-stage /app/apps/arena-server/dist /usr/src/app/apps/arena-server/dist
ENTRYPOINT [ "bun", "run", "dist/index.js" ]
