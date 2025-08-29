# Heroku-optimized Dockerfile for Spring Boot
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the pre-built jar file
COPY target/*.jar app.jar

# Expose port (Heroku will set the PORT environment variable)
EXPOSE $PORT

# Run the application with Heroku-specific settings
ENTRYPOINT ["java", "-Dserver.port=$PORT", "-Dspring.profiles.active=heroku", "-jar", "app.jar"]
