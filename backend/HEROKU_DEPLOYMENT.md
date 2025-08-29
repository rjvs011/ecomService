# 🚀 Heroku + Supabase Deployment Guide

## Prerequisites
- Heroku CLI installed: https://devcenter.heroku.com/articles/heroku-cli
- Supabase account: https://supabase.com
- Git repository

## Database Setup (Supabase)

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization and fill project details
4. Wait for setup to complete

### 2. Run Database Schema
1. Go to SQL Editor in Supabase dashboard
2. Copy contents of `database/supabase-schema.sql`
3. Run the SQL script to create tables and sample data

### 3. Get Database Connection Details
1. Go to Settings → Database in Supabase
2. Copy the connection string under "Connection string"
3. Note: Use the "URI" format for Spring Boot

## Backend Deployment Steps

### 1. Create Heroku App
```bash
cd d:\Ecom\backend
heroku create your-ecommerce-backend
```

### 2. Set Environment Variables
```bash
# Supabase Database Configuration
heroku config:set SUPABASE_DB_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
heroku config:set SUPABASE_DB_USER=postgres
heroku config:set SUPABASE_DB_PASSWORD=your-supabase-password

# JWT Configuration
heroku config:set JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long

# Email Configuration
heroku config:set EMAIL_USERNAME=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-gmail-app-password

# Frontend URL (will be set after Vercel deployment)
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app

# Spring Profile
heroku config:set SPRING_PROFILES_ACTIVE=prod
```

### 3. Build and Deploy
```bash
# Ensure target folder exists and build
mvn clean package -DskipTests

# Deploy to Heroku
git add .
git commit -m "Deploy to Heroku with Supabase"
git push heroku dev:main
```

### 4. View Logs (if needed)
```bash
heroku logs --tail
```

### 5. Open Application
```bash
heroku open
```

## Environment Variables Summary

### Required Environment Variables:
- `SUPABASE_DB_URL` - Supabase PostgreSQL connection URL
- `SUPABASE_DB_USER` - Usually 'postgres'
- `SUPABASE_DB_PASSWORD` - Your Supabase password
- `JWT_SECRET` - Strong secret key for JWT tokens
- `EMAIL_USERNAME` - Your Gmail address
- `EMAIL_PASSWORD` - Gmail app password
- `FRONTEND_URL` - Your Vercel frontend URL
- `SPRING_PROFILES_ACTIVE=prod` - Spring profile

## Testing Endpoints
Once deployed, test with:
- GET {your-app-url}/api/health
- GET {your-app-url}/api/ 
- POST {your-app-url}/api/auth/register
- POST {your-app-url}/api/auth/login

## Notes
- Supabase provides a generous free tier with 500MB database
- PostgreSQL is more robust than MySQL for production
- Automatic backups included with Supabase
- Built-in monitoring and performance insights
