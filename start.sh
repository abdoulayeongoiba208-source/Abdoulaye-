#!/bin/bash
# 🚀 Quick Start Script

echo "🚀 Agent IA E-Commerce - Quick Start"
echo "====================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not installed. Please install it first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ npm install failed"
    exit 1
fi

echo "✅ Dependencies installed"

# Check environment file
if [ ! -f "config/credentials.env" ]; then
    echo ""
    echo "⚠️  config/credentials.env not found!"
    echo "📋 Creating from template..."
    cp config/credentials.env.example config/credentials.env
    echo "📝 Please edit config/credentials.env with your API keys"
    exit 1
fi

echo "✅ Environment configured"

# Start development server
echo ""
echo "🚀 Starting development server..."
echo "🌐 API: http://localhost:3000"
echo "📊 Dashboard: http://localhost:3000/dashboard"
echo ""
echo "Press Ctrl+C to stop"
echo ""

npm run dev