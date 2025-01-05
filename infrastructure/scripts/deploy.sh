#!/bin/bash

echo "Starting deployment..."

cd ..

echo "Pulling latest changes from git..."
git pull | cat

echo "Pulling latest images..."
docker compose -f compose.prod.yaml pull

echo "Restarting containers..."
docker compose -f compose.prod.yaml down
docker compose -f compose.prod.yaml up -d

echo "Deployment completed successfully"
