# 🚀 Live Deployment Guide

## Quick Deployment (Free Tier)

### 1. Backend Deployment (Railway/Render)

#### Option A: Railway (Recommended)
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `rjvs011/ecomService` repository
5. Choose "Deploy from main branch"
6. Railway will automatically detect Spring Boot and deploy

#### Environment Variables (Add in Railway Dashboard):
```
DATABASE_URL=mysql://user:pass@host:port/database
JWT_SECRET=your-super-secret-jwt-key-at-least-32-characters
EMAIL_USERNAME=raju.s.sharma011@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://your-frontend.vercel.app
```

### 2. Database Setup (Free MySQL)

#### Option A: PlanetScale (Free)
1. Go to [planetscale.com](https://planetscale.com)
2. Create account and new database
3. Get connection string
4. Add to Railway environment variables

#### Option B: Railway MySQL (Paid but integrated)
1. In Railway dashboard, click "Add Service" → "MySQL"
2. Connection will be automatic via DATABASE_URL

### 3. Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "New Project"
4. Select `rjvs011/ecomService` repository
5. Configure:
   - Framework Preset: Create React App
   - Root Directory: frontend
   - Build Command: npm run build
   - Output Directory: build

#### Environment Variables (Add in Vercel):
```
REACT_APP_API_URL=https://your-backend.railway.app
```

## 🎯 Alternative: One-Click Deploy

### Heroku (If you prefer)
1. Create Heroku account
2. Install Heroku CLI
3. Run deployment commands:

```bash
# For Backend
cd backend
heroku create your-app-backend
heroku addons:create cleardb:ignite
git subtree push --prefix=backend heroku main

# For Frontend  
cd ../frontend
heroku create your-app-frontend
heroku buildpacks:set mars/create-react-app
git subtree push --prefix=frontend heroku main
```

## 🔧 After Deployment

1. **Test your live application**
2. **Update CORS settings** in backend
3. **Test registration/login** with real emails
4. **Monitor logs** for any issues
5. **Set up custom domain** (optional)

## 📞 Support
If you need help: raju.s.sharma011@gmail.com
