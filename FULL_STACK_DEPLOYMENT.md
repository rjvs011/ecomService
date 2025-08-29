# 🚀 Full Stack Deployment Guide
### Heroku (Backend) + Vercel (Frontend) + Supabase (Database)

## 🗂️ Tech Stack
- **Backend**: Spring Boot (Java 17) → Heroku
- **Frontend**: React TypeScript → Vercel  
- **Database**: PostgreSQL → Supabase
- **Authentication**: JWT + OTP Email verification

## 📋 Prerequisites

### Required Accounts
1. **Heroku Account**: [heroku.com](https://heroku.com)
2. **Vercel Account**: [vercel.com](https://vercel.com) 
3. **Supabase Account**: [supabase.com](https://supabase.com)
4. **Gmail App Password**: For email OTP functionality

### Required Tools
- **Heroku CLI**: [devcenter.heroku.com/articles/heroku-cli](https://devcenter.heroku.com/articles/heroku-cli)
- **Vercel CLI**: `npm install -g vercel`
- **Git**: Version control

## 🎯 Deployment Steps

### Step 1: Database Setup (Supabase)

1. **Create Supabase Project**
   ```
   - Go to supabase.com
   - Click "New Project"
   - Fill project details and wait for setup
   ```

2. **Run Database Schema**
   ```sql
   -- Go to SQL Editor in Supabase dashboard
   -- Copy and run contents of: database/supabase-schema.sql
   -- This creates all tables and sample data
   ```

3. **Get Connection Details**
   ```
   - Go to Settings → Database
   - Copy PostgreSQL connection string
   - Format: postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
   ```

### Step 2: Backend Deployment (Heroku)

1. **Create Heroku App**
   ```bash
   cd d:\Ecom\backend
   heroku login
   heroku create your-ecommerce-backend
   ```

2. **Set Environment Variables**
   ```bash
   # Database (replace with your Supabase connection details)
   heroku config:set SUPABASE_DB_URL="postgresql://postgres:YOUR_PASSWORD@db.PROJECT_REF.supabase.co:5432/postgres"
   heroku config:set SUPABASE_DB_USER=postgres
   heroku config:set SUPABASE_DB_PASSWORD=your-supabase-password
   
   # JWT Secret (generate a strong 32+ character secret)
   heroku config:set JWT_SECRET=your-super-secure-jwt-secret-key-at-least-32-characters-long
   
   # Email Configuration (Gmail App Password required)
   heroku config:set EMAIL_USERNAME=your-email@gmail.com
   heroku config:set EMAIL_PASSWORD=your-gmail-app-password
   
   # Spring Profile
   heroku config:set SPRING_PROFILES_ACTIVE=prod
   
   # Frontend URL (will update after Vercel deployment)
   heroku config:set FRONTEND_URL=http://localhost:3000
   ```

3. **Build and Deploy Backend**
   ```bash
   # Build the application
   mvn clean package -DskipTests
   
   # Commit and deploy
   git add .
   git commit -m "Deploy backend to Heroku"
   git push heroku dev:main
   ```

4. **Test Backend**
   ```bash
   heroku open
   # Should show your API at: https://your-app.herokuapp.com/api/
   ```

### Step 3: Frontend Deployment (Vercel)

1. **Deploy to Vercel**
   ```bash
   cd d:\Ecom\frontend
   vercel login
   vercel --prod
   ```

2. **Configure Environment Variables in Vercel Dashboard**
   ```
   - Go to vercel.com → Your Project → Settings → Environment Variables
   - Add: REACT_APP_API_URL = https://your-backend.herokuapp.com
   ```

3. **Update Backend CORS**
   ```bash
   # Update Heroku environment with your Vercel URL
   heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
   ```

### Step 4: Final Configuration

1. **Update API Base URL**
   - Frontend will automatically use production API URL
   - Test frontend at: https://your-frontend.vercel.app

2. **Test Complete Flow**
   - Registration with OTP verification
   - Login with email/OTP
   - Product browsing and cart functionality

## 🔧 Environment Variables Summary

### Heroku (Backend)
```bash
SUPABASE_DB_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-password
JWT_SECRET=your-32-character-secret-key
EMAIL_USERNAME=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://your-frontend.vercel.app
SPRING_PROFILES_ACTIVE=prod
```

### Vercel (Frontend)
```bash
REACT_APP_API_URL=https://your-backend.herokuapp.com
```

## 🧪 Testing Your Deployment

### Backend API Endpoints
- **Health Check**: `GET https://your-backend.herokuapp.com/api/health`
- **Register**: `POST https://your-backend.herokuapp.com/api/auth/register`
- **Login**: `POST https://your-backend.herokuapp.com/api/auth/login`
- **Products**: `GET https://your-backend.herokuapp.com/api/products`

### Frontend Application
- **Home**: `https://your-frontend.vercel.app`
- **Login**: `https://your-frontend.vercel.app/login`
- **Register**: `https://your-frontend.vercel.app/register`
- **Admin**: `https://your-frontend.vercel.app/admin`

## 🔒 Security Notes

1. **JWT Secret**: Use a strong, unique secret (32+ characters)
2. **Gmail App Password**: Enable 2FA and create app password
3. **Supabase**: Row Level Security enabled by default
4. **HTTPS**: Both Heroku and Vercel provide HTTPS automatically
5. **CORS**: Properly configured for your domains only

## 🎉 Success!

Your full-stack e-commerce application is now live:
- ✅ **Backend**: Spring Boot API on Heroku
- ✅ **Frontend**: React TypeScript on Vercel
- ✅ **Database**: PostgreSQL on Supabase
- ✅ **Authentication**: JWT with OTP email verification

## 📞 Support

Need help? Contact:
- **Developer**: Raju Sharma
- **Email**: raju.s.sharma011@gmail.com
- **WhatsApp**: +91 7348995264

## 🚀 Next Steps

1. **Custom Domain**: Add custom domain to Vercel
2. **Email Templates**: Enhance OTP email design
3. **Payment Integration**: Add Stripe/Razorpay
4. **Analytics**: Add Google Analytics
5. **SEO**: Optimize for search engines
