#!/bin/bash

# Micro Frontend Startup Script
# This script helps you start both applications easily

echo "🚀 Starting Micro Frontend Applications..."
echo ""
echo "This will open two terminal windows:"
echo "  1. chart-app (port 5001)"
echo "  2. container-app (port 5000)"
echo ""

# Function to check if running on macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "Starting on macOS..."
    
    # Build chart-app first (required for Module Federation)
    echo "🔨 Building chart-app..."
    cd chart-app
    npm run build
    if [ $? -ne 0 ]; then
        echo "❌ Failed to build chart-app"
        exit 1
    fi
    cd ..
    echo "✅ chart-app built successfully"
    echo ""
    
    # Start chart-app in preview mode (built) in a new terminal tab
    osascript -e 'tell application "Terminal" to do script "cd \"'"$(pwd)"'/chart-app\" && npm run preview"' > /dev/null
    
    # Wait a bit for chart-app to start
    echo "⏳ Starting chart-app (remote in preview mode)..."
    sleep 3
    
    # Start container-app in a new terminal tab
    osascript -e 'tell application "Terminal" to do script "cd \"'"$(pwd)"'/container-app\" && npm run dev"' > /dev/null
    
    echo "⏳ Starting container-app (host)..."
    sleep 2
    
    echo ""
    echo "✅ Both applications are starting!"
    echo ""
    echo "📊 Chart App (preview): http://localhost:5001"
    echo "🏠 Container App (dev): http://localhost:5000"
    echo ""
    echo "ℹ️  Note: chart-app runs in preview mode (built) for Module Federation to work"
    echo "   To rebuild chart-app after changes, restart this script"
    echo ""
    echo "Open your browser and navigate to: http://localhost:5000"
    
else
    echo "⚠️  This script is optimized for macOS."
    echo ""
    echo "Please start the applications manually:"
    echo ""
    echo "Terminal 1:"
    echo "  cd chart-app && npm run dev"
    echo ""
    echo "Terminal 2:"
    echo "  cd container-app && npm run dev"
fi
