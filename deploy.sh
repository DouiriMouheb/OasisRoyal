#!/bin/bash

# Oasis Royal Deployment Script for DigitalOcean Droplet
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting Oasis Royal Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if .env file exists
if [ ! -f "./OasisRoyalBack/.env" ]; then
    print_error ".env file not found in OasisRoyalBack directory!"
    print_info "Please copy .env.example to OasisRoyalBack/.env and configure it"
    exit 1
fi

print_success ".env file found"

# Pull latest changes (if using git)
if [ -d ".git" ]; then
    print_info "Pulling latest changes from git..."
    git pull origin main || print_info "No git repository or changes to pull"
fi

# Stop existing containers
print_info "Stopping existing containers..."
docker-compose down || true

# Remove old images (optional, uncomment to save space)
# print_info "Removing old images..."
# docker image prune -af

# Build and start containers
print_info "Building and starting containers..."
docker-compose up -d --build

# Wait for services to be healthy
print_info "Waiting for services to be healthy..."
sleep 10

# Check backend health
print_info "Checking backend health..."
until $(curl --output /dev/null --silent --head --fail http://localhost:5000/health); do
    print_info "Waiting for backend..."
    sleep 5
done
print_success "Backend is healthy"

# Check frontend health
print_info "Checking frontend health..."
until $(curl --output /dev/null --silent --head --fail http://localhost/health); do
    print_info "Waiting for frontend..."
    sleep 5
done
print_success "Frontend is healthy"

# Show running containers
print_info "Running containers:"
docker-compose ps

# Show logs (optional)
# docker-compose logs -f

print_success "🎉 Deployment completed successfully!"
print_info "Frontend: http://your-droplet-ip"
print_info "Backend API: http://your-droplet-ip:5000/api"
print_info "API Docs: http://your-droplet-ip:5000/api-docs"
echo ""
print_info "To view logs: docker-compose logs -f"
print_info "To stop: docker-compose down"
