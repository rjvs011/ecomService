#!/bin/bash

echo "🚀 Starting E-Commerce Application Setup..."

# Check if Java is installed
if ! command -v java &> /dev/null; then
    echo "❌ Java is not installed. Please install Java 17 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Check if MySQL is running
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 8.0."
    exit 1
fi

echo "✅ Prerequisites check passed!"

# Start backend
echo "🔧 Starting Backend..."
cd backend
if [ ! -d "target" ]; then
    echo "📦 Building backend dependencies..."
    mvn clean install -DskipTests
fi

echo "🚀 Starting Spring Boot application..."
mvn spring-boot:run &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 30

# Start frontend
echo "🔧 Starting Frontend..."
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    npm install
fi

echo "🚀 Starting React development server..."
npm start &
FRONTEND_PID=$!

echo "✅ Application started successfully!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:8080"
echo "📊 Admin Dashboard: http://localhost:3000/admin"
echo ""
echo "🔑 Default Admin Credentials:"
echo "   Email: admin@ecommerce.com"
echo "   Password: password"
echo ""
echo "📞 Contact: Raju Sharma - raju.s.sharma011@gmail.com"
echo "📱 WhatsApp: +91 7348995264"
echo ""
echo "Press Ctrl+C to stop the application"

# Wait for user to stop
wait
