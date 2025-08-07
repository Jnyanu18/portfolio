#!/bin/bash

echo "🚀 Starting Full Stack Portfolio Website..."
echo "=================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ] || [ ! -d "server/node_modules" ] || [ ! -d "client/node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm run install-deps
fi

# Check if .env file exists in server directory
if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file not found!"
    echo "Please copy server/.env.example to server/.env and configure your email settings."
    echo "You can continue without email functionality for now."
    read -p "Press Enter to continue..."
fi

echo "🖥️  Starting backend server..."
echo "🌐 Starting frontend development server..."
echo ""
echo "Backend will be available at: http://localhost:5000"
echo "Frontend will be available at: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================="

# Start both frontend and backend
npm run dev