#!/bin/bash
echo "🍛 Starting TanjoreEats..."
echo ""

# Start backend
echo "📦 Starting Backend (port 5000)..."
cd backend && npm install && npm start &
BACKEND_PID=$!

# Wait for backend
sleep 3

# Start frontend
echo "🌐 Starting Frontend (port 3000)..."
cd ../frontend && npm install && npm start &
FRONTEND_PID=$!

echo ""
echo "✅ TanjoreEats is running!"
echo "   Frontend: http://localhost:3000"
echo "   Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

wait
