# 🚀 Railway Deployment Fix

## Issue: Java Not Found Error

### Solution 1: Use Heroku Instead (Simpler)

Railway sometimes has issues with Java detection. Heroku works more reliably:

1. **Create Heroku Account**: [heroku.com](https://heroku.com)
2. **Install Heroku CLI**
3. **Deploy Backend**:

```bash
cd backend
heroku login
heroku create your-ecom-backend
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
heroku config:set EMAIL_USERNAME=raju.s.sharma011@gmail.com
heroku config:set EMAIL_PASSWORD=your-gmail-app-password

# Add database
heroku addons:create cleardb:ignite

# Deploy
git init
git add .
git commit -m "Deploy backend"
heroku git:remote -a your-ecom-backend
git push heroku main
```

### Solution 2: Fix Railway (If you prefer Railway)

1. **Delete current Railway service**
2. **Create new service** with these settings:
   - **Source**: GitHub repo `rjvs011/ecomService`
   - **Root Directory**: `/backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/*.jar`

3. **Environment Variables**:
```
SPRING_PROFILES_ACTIVE=prod
DATABASE_URL=mysql://user:pass@host:port/database
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
EMAIL_USERNAME=raju.s.sharma011@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
```

### Solution 3: Use Render (Alternative)

1. **Go to**: [render.com](https://render.com)
2. **New Web Service** → Connect GitHub
3. **Settings**:
   - **Root Directory**: `backend`
   - **Build Command**: `mvn clean package -DskipTests`
   - **Start Command**: `java -Dserver.port=$PORT -jar target/*.jar`

## Quick Test After Deployment

Your backend URL should respond to:
- `GET /api/health` → Should return "Auth service is running"
- `GET /api/` → Should return service info
