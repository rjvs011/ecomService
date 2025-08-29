@echo off
echo 🚀 Starting E-Commerce Application Setup...

REM Check if Java is installed
java -version >nul 2>&1
if errorlevel 1 (
    echo ❌ Java is not installed. Please install Java 17 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed!

REM Start backend
echo 🔧 Starting Backend...
cd backend
if not exist "target" (
    echo 📦 Building backend dependencies...
    mvn clean install -DskipTests
)

echo 🚀 Starting Spring Boot application...
start "Backend" mvn spring-boot:run

REM Wait for backend to start
echo ⏳ Waiting for backend to start...
timeout /t 30 /nobreak >nul

REM Start frontend
echo 🔧 Starting Frontend...
cd ..\frontend
if not exist "node_modules" (
    echo 📦 Installing frontend dependencies...
    npm install
)

echo 🚀 Starting React development server...
start "Frontend" npm start

echo ✅ Application started successfully!
echo 📱 Frontend: http://localhost:3000
echo 🔧 Backend: http://localhost:8080
echo 📊 Admin Dashboard: http://localhost:3000/admin
echo.
echo 🔑 Default Admin Credentials:
echo    Email: admin@ecommerce.com
echo    Password: password
echo.
echo 📞 Contact: Raju Sharma - raju.s.sharma011@gmail.com
echo 📱 WhatsApp: +91 7348995264
echo.
echo Press any key to exit...
pause >nul
