# E-Commerce Full Stack Application

A complete e-commerce platform built with Java Spring Boot backend, MySQL database, and React frontend.

## Features

- **User Authentication**
  - Login/Register with OAuth (Google, Facebook)
  - OTP verification
  - Password reset functionality

- **Product Management**
  - Product catalog with images
  - Search functionality
  - Product categories
  - Product details with ratings and comments

- **Shopping Cart**
  - Add/remove items
  - Quantity management
  - Cart persistence

- **Payment Integration**
  - Multiple payment options
  - Secure payment processing

- **User Management**
  - User profiles
  - Order history
  - Admin dashboard

- **Admin Features**
  - Product management
  - User monitoring
  - Order management
  - Analytics dashboard

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL 8.0
- JWT Authentication
- OAuth2

### Frontend
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Axios

## Project Structure

```
Ecom/
├── backend/                 # Spring Boot application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── frontend/               # React application
│   ├── src/
│   ├── package.json
│   └── public/
├── database/              # SQL scripts
└── docs/                  # Documentation
```

## Contact Information

- **Developer**: Raju Sharma
- **Email**: raju.s.sharma011@gmail.com
- **WhatsApp**: +91 7348995264

## Social Media

- Instagram: [@ecomstore](https://instagram.com/ecomstore)
- Facebook: [E-Commerce Store](https://facebook.com/ecomstore)
- WhatsApp: +91 7348995264

## Setup Instructions

### Prerequisites
- Java 17 or higher
- Node.js 18 or higher
- MySQL 8.0
- Maven 3.6+

### Backend Setup
1. Navigate to `backend/` directory
2. Update `application.properties` with your MySQL credentials
3. Run: `mvn spring-boot:run`

### Frontend Setup
1. Navigate to `frontend/` directory
2. Install dependencies: `npm install`
3. Start development server: `npm start`

### Database Setup
1. Create MySQL database: `ecommerce_db`
2. Run SQL scripts from `database/` directory

## Deployment

### Production Stack
- **Backend**: Heroku (Spring Boot)
- **Frontend**: Vercel (React TypeScript)
- **Database**: Supabase (PostgreSQL)

### Quick Deploy
1. **Follow the guide**: [`FULL_STACK_DEPLOYMENT.md`](FULL_STACK_DEPLOYMENT.md)
2. **Backend**: [`backend/HEROKU_DEPLOYMENT.md`](backend/HEROKU_DEPLOYMENT.md)
3. **Frontend**: [`frontend/VERCEL_DEPLOYMENT.md`](frontend/VERCEL_DEPLOYMENT.md)
4. **Database**: Run `database/supabase-schema.sql` in Supabase SQL Editor

### Environment Variables
See deployment guides for complete environment variable setup.

## License

MIT License
