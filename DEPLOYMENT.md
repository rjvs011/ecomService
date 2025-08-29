# Deployment Guide - E-Commerce Application

## Prerequisites

Before deploying, ensure you have the following installed:
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0
- Maven 3.6+
- Git

## Local Development Setup

### 1. Database Setup

1. Start MySQL server
2. Create database:
```sql
CREATE DATABASE ecommerce_db;
```

3. Update database credentials in `backend/src/main/resources/application.properties`:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

4. Run the initialization script:
```sql
source database/init.sql
```

### 2. Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
mvn clean install
```

3. Start the application:
```bash
mvn spring-boot:run
```

The backend will be available at `http://localhost:8080`

### 3. Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will be available at `http://localhost:3000`

## Production Deployment

### Backend Deployment (Heroku)

1. Create a Heroku account and install Heroku CLI
2. Create a new Heroku app:
```bash
heroku create your-ecommerce-app
```

3. Add MySQL addon:
```bash
heroku addons:create cleardb:ignite
```

4. Configure environment variables:
```bash
heroku config:set SPRING_PROFILES_ACTIVE=prod
heroku config:set JWT_SECRET=your-secure-jwt-secret
```

5. Deploy:
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Frontend Deployment (Vercel)

1. Create a Vercel account
2. Install Vercel CLI:
```bash
npm i -g vercel
```

3. Deploy:
```bash
cd frontend
vercel
```

4. Configure environment variables in Vercel dashboard:
- `REACT_APP_API_URL`: Your backend URL

### Database Deployment (AWS RDS)

1. Create an RDS MySQL instance
2. Configure security groups
3. Update application.properties with RDS endpoint
4. Run migration scripts

## Environment Variables

### Backend (.env)
```env
SPRING_DATASOURCE_URL=jdbc:mysql://your-db-url:3306/ecommerce_db
SPRING_DATASOURCE_USERNAME=your_username
SPRING_DATASOURCE_PASSWORD=your_password
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRATION=86400000
```

### Frontend (.env)
```env
REACT_APP_API_URL=https://your-backend-url.com
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
REACT_APP_FACEBOOK_CLIENT_ID=your-facebook-client-id
```

## Security Considerations

1. **JWT Secret**: Use a strong, unique secret key
2. **Database**: Use strong passwords and restrict access
3. **HTTPS**: Always use HTTPS in production
4. **CORS**: Configure CORS properly for your domains
5. **Rate Limiting**: Implement rate limiting for API endpoints
6. **Input Validation**: Validate all user inputs
7. **SQL Injection**: Use parameterized queries
8. **XSS Protection**: Sanitize user inputs

## Monitoring and Logging

1. **Application Logs**: Use proper logging levels
2. **Error Tracking**: Implement error tracking (Sentry, LogRocket)
3. **Performance Monitoring**: Use APM tools
4. **Database Monitoring**: Monitor database performance
5. **Uptime Monitoring**: Set up uptime monitoring

## Backup Strategy

1. **Database Backups**: Regular automated backups
2. **File Backups**: Backup uploaded files
3. **Configuration Backups**: Version control configuration
4. **Disaster Recovery**: Plan for disaster recovery

## SSL/TLS Configuration

1. **SSL Certificate**: Obtain SSL certificate
2. **HTTPS Redirect**: Redirect HTTP to HTTPS
3. **Security Headers**: Configure security headers
4. **HSTS**: Enable HTTP Strict Transport Security

## Performance Optimization

1. **Caching**: Implement Redis caching
2. **CDN**: Use CDN for static assets
3. **Image Optimization**: Optimize product images
4. **Database Indexing**: Optimize database queries
5. **Code Splitting**: Implement code splitting in frontend

## Contact Information

For deployment support:
- **Developer**: Raju Sharma
- **Email**: raju.s.sharma011@gmail.com
- **WhatsApp**: +91 7348995264

## Troubleshooting

### Common Issues

1. **Database Connection**: Check database credentials and network access
2. **CORS Errors**: Verify CORS configuration
3. **JWT Issues**: Check JWT secret and expiration
4. **Build Failures**: Check Node.js and Java versions
5. **Memory Issues**: Increase heap size for Java application

### Logs

- Backend logs: Check application logs in console or log files
- Frontend logs: Check browser console and network tab
- Database logs: Check MySQL error logs
