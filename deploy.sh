#!/bin/bash

# 🚀 Quick Deployment Script for AI Therapy Platform
# This script helps you deploy the application on a fresh Ubuntu VPS

set -e  # Exit on error

echo "🏥 AI Therapy Platform - Deployment Script"
echo "=========================================="
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
   echo "Please run as root (use: sudo bash deploy.sh)"
   exit 1
fi

# Update system
echo "📦 Updating system packages..."
apt update && apt upgrade -y

# Install Docker
echo "🐳 Installing Docker..."
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
else
    echo "✅ Docker already installed"
fi

# Install Docker Compose
echo "🐳 Installing Docker Compose..."
if ! command -v docker-compose &> /dev/null; then
    apt install docker-compose -y
else
    echo "✅ Docker Compose already installed"
fi

# Clone repository (if not already in repo directory)
if [ ! -f "docker-compose.yml" ]; then
    echo "📥 Cloning repository..."
    read -p "Enter GitHub repository URL: " REPO_URL
    git clone $REPO_URL app
    cd app
fi

# Check for .env file
if [ ! -f "backend/.env" ]; then
    echo ""
    echo "⚠️  backend/.env file not found!"
    echo "Creating template from .env.example..."
    
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo "✅ Created backend/.env - PLEASE EDIT IT WITH YOUR CREDENTIALS"
        echo ""
        read -p "Press Enter to open nano editor (or Ctrl+C to edit manually later)..." 
        nano backend/.env
    else
        echo "❌ backend/.env.example not found. Please create backend/.env manually."
        exit 1
    fi
fi

# Build and start containers
echo ""
echo "🏗️  Building Docker containers..."
docker-compose build

echo ""
echo "🚀 Starting services..."
docker-compose up -d

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Service Status:"
docker-compose ps

echo ""
echo "🌐 Access your application:"
echo "   Frontend: http://$(hostname -I | awk '{print $1}'):3000"
echo "   Admin Panel: http://$(hostname -I | awk '{print $1}'):3001"
echo "   Backend API: http://$(hostname -I | awk '{print $1}'):4000"
echo ""
echo "📝 Useful commands:"
echo "   View logs: docker-compose logs -f"
echo "   Stop services: docker-compose down"
echo "   Restart services: docker-compose restart"
echo "   Update code: git pull && docker-compose up -d --build"
echo ""
echo "🔒 Next steps:"
echo "   1. Setup Nginx reverse proxy (optional)"
echo "   2. Configure SSL certificate with Certbot"
echo "   3. Setup domain DNS records"
echo ""
