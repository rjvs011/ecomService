#!/bin/bash
# Railway startup script

echo "Starting E-commerce Backend..."
echo "Java Version:"
java -version

echo "Building application..."
mvn clean package -DskipTests

echo "Starting Spring Boot application..."
java -Dspring.profiles.active=prod -Dserver.port=${PORT:-8080} -jar target/*.jar
