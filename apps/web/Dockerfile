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
WORKDIR /app/apps/web
RUN pnpm run build

# Serve the static files using Nginx
FROM nginx:alpine AS production-stage

COPY --from=build-stage /app/apps/web/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
HEALTHCHECK CMD wget -q -O /dev/null http://localhost || exit 1
