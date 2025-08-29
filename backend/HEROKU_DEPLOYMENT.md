# 🚀 Heroku Deployment Guide

## Prerequisites
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli
- MySQL database (ClearDB addon)
- Git repository

## Deployment Steps

### 1. Create Heroku App
```bash
cd d:\Ecom\backend
heroku create your-app-name
```

### 2. Add ClearDB MySQL Addon
```bash
heroku addons:create cleardb:ignite
```

### 3. Set Environment Variables
```bash
# Get database URL
heroku config:get CLEARDB_DATABASE_URL

# Set required environment variables
heroku config:set JWT_SECRET=your-jwt-secret-here
heroku config:set EMAIL_USERNAME=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set SPRING_PROFILES_ACTIVE=heroku
heroku config:set FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 4. Build and Deploy
```bash
# Ensure target folder exists
mvn clean package

# Deploy to Heroku
git add .
git commit -m "Prepare for Heroku deployment"
git push heroku main
```

### 5. View Logs (if needed)
```bash
heroku logs --tail
```

### 6. Open Application
```bash
heroku open
```

## Environment Variables Needed
- `CLEARDB_DATABASE_URL` (automatically set by ClearDB addon)
- `JWT_SECRET` (your secret key)
- `EMAIL_USERNAME` (your Gmail address)
- `EMAIL_PASSWORD` (your Gmail app password)
- `SPRING_PROFILES_ACTIVE=heroku`
- `FRONTEND_URL` (your frontend URL once deployed)

## Testing Endpoints
Once deployed, test with:
- GET {your-app-url}/api/health
- POST {your-app-url}/api/auth/register
- POST {your-app-url}/api/auth/login
