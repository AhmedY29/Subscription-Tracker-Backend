# Subscription Tracker API

A comprehensive RESTful API for managing subscriptions with user authentication, email notifications, and advanced security features built with Node.js, Express, TypeScript, and MongoDB.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)
- [Security Features](#security-features)
- [Data Models](#data-models)

## ✨ Features

### Authentication & Authorization
- **User Registration & Login**: Complete authentication system with JWT
- **Token Management**: Access tokens (15m) and refresh tokens (7d)
- **Secure Password Storage**: bcryptjs hashing
- **Cookie-based Authentication**: HTTPOnly secure cookies

### Subscription Management
- **CRUD Operations**: Full subscription lifecycle management
- **Multiple Frequencies**: Daily, weekly, monthly, yearly subscriptions
- **Auto-renewal Calculation**: Automatic renewal date calculation
- **Status Tracking**: Active, cancelled, expired statuses
- **Multi-currency Support**: USD, EUR, GBP, SAR

### Email Notifications
- **Welcome Emails**: Automatic welcome email on registration
- **Subscription Alerts**: Email notifications for new subscriptions
- **HTML Templates**: Beautiful, responsive email templates

### Security & Protection
- **Rate Limiting**: Token bucket algorithm (5 requests/10s)
- **Bot Detection**: Arcjet-powered bot protection
- **Shield Protection**: Advanced security layer
- **JWT Security**: Signed tokens with expiration

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript 5.9.3
- **Framework**: Express.js 5.1.0
- **Database**: MongoDB (via Mongoose 8.19.1)
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcryptjs 3.0.2
- **Email Service**: Nodemailer 7.0.9
- **Security**: Arcjet 1.0.0-beta.13
- **Development**: Nodemon, ts-node

## 📦 Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB instance
- Gmail account for email functionality
- Arcjet API key (optional, for security features)
- npm or yarn package manager

## 🚀 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd subscription-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

## 🔐 Environment Variables

Create a `.env` file with the following variables:

```env
# Server Configuration
PORT=3000

# Database
DB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-min-32-characters

# Email Configuration (Gmail)
EMAIL_PASSWORD=your-gmail-app-password

# Security (Optional)
ARCJET_KEY=your-arcjet-api-key
```

### Setting Up Gmail App Password
1. Enable 2-Step Verification on your Google Account
2. Go to Google Account > Security > App passwords
3. Generate a new app password
4. Use this password in `EMAIL_PASSWORD`

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Base URL
```
http://localhost:3000/api
```

---

### 🔐 Authentication Endpoints

#### Register New User
```http
POST /auth/sign-up
Content-Type: application/json

{
    "name": "Ahmed Ali",
    "email": "ahmed@example.com",
    "password": "securePassword123"
}
```

**Response:**
```json
{
    "success": true,
    "message": {
        "en": "User created successfully.",
        "ar": "تم انشاء المستخدم بنجاح."
    },
    "user": {
        "_id": "...",
        "name": "Ahmed Ali",
        "email": "ahmed@example.com"
    },
    "accessToken": "...",
    "refreshToken": "..."
}
```

#### Login
```http
POST /auth/sign-in
Content-Type: application/json

{
    "email": "ahmed@example.com",
    "password": "securePassword123"
}
```

#### Logout
```http
POST /auth/sign-out
```

#### Refresh Access Token
```http
POST /auth/refresh-token
Content-Type: application/json

{
    "refreshToken": "your-refresh-token"
}
```

---

### 👥 User Endpoints

#### Get All Users
```http
GET /users
```

#### Get User by ID
```http
GET /users/:id
```

---

### 📝 Subscription Endpoints

#### Get All Subscriptions
```http
GET /subscriptions
```

#### Get Subscription by ID
```http
GET /subscriptions/:id
Authorization: Bearer <access-token>
```

#### Get User's Subscriptions
```http
GET /subscriptions/user/:userId
Authorization: Bearer <access-token>
```

#### Create New Subscription
```http
POST /subscriptions
Authorization: Bearer <access-token>
Content-Type: application/json

{
    "name": "Netflix Premium",
    "price": 49.99,
    "currency": "SAR",
    "frequency": "monthly",
    "category": "entertainment",
    "paymentMethod": "Credit Card",
    "startDate": "2025-10-01T00:00:00.000Z"
}
```

**Response:**
```json
{
    "success": true,
    "message": {
        "en": "Subscription created successfully",
        "ar": "تم انشاء الاشتراك بنجاح"
    },
    "subscription": {
        "_id": "...",
        "name": "Netflix Premium",
        "price": 49.99,
        "currency": "SAR",
        "frequency": "monthly",
        "status": "active",
        "renewalDate": "2025-11-01T00:00:00.000Z"
    }
}
```

---

## 📁 Project Structure

```
subscription-tracker/
├── src/
│   ├── config/
│   │   ├── arject.ts          # Arcjet security configuration
│   │   ├── db.ts              # MongoDB connection
│   │   ├── env.ts             # Environment variables
│   │   ├── jwt.ts             # JWT configuration
│   │   └── nodemailer.ts      # Email configuration
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── subscription.controller.ts
│   │   └── users.controller.ts
│   ├── middlewares/
│   │   ├── arject.middleware.ts
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   ├── subscription.model.ts
│   │   └── user.model.ts
│   ├── routers/
│   │   ├── auth.route.ts
│   │   ├── subscription.route.ts
│   │   └── users.route.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── subscription.service.ts
│   │   └── users.service.ts
│   ├── utils/
│   │   ├── appError.ts
│   │   ├── generateToken.ts
│   │   └── send-email.ts
│   └── app.ts                 # Application entry point
├── .env                       # Environment variables
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🔒 Security Features

### Arcjet Protection
The API is protected by Arcjet with the following features:

1. **Shield Protection**: Advanced security layer against common attacks
2. **Bot Detection**: Allows search engine bots, blocks malicious bots
3. **Rate Limiting**: Token bucket algorithm
   - Capacity: 10 tokens
   - Refill Rate: 5 tokens per 10 seconds

### JWT Security
- **Access Tokens**: 15-minute expiration
- **Refresh Tokens**: 7-day expiration
- **Algorithm**: HS256
- **HTTPOnly Cookies**: Prevents XSS attacks

### Password Security
- **Hashing**: bcryptjs with salt rounds
- **Minimum Length**: 6 characters
- **Never Stored Plaintext**: All passwords hashed before storage

---

## 📊 Data Models

### User Schema
```typescript
{
    name: String (required, min: 3 chars),
    email: String (required, unique, lowercase),
    password: String (required, hashed),
    createdAt: Date,
    updatedAt: Date
}
```

### Subscription Schema
```typescript
{
    name: String (required, 2-100 chars),
    price: Number (required, min: 0),
    currency: String (USD/EUR/GBP/SAR),
    frequency: String (daily/weekly/monthly/yearly),
    category: String (sports/news/entertainment/...),
    paymentMethod: String (required),
    status: String (active/cancelled/expired),
    startDate: Date (required, must be in past),
    renewalDate: Date (auto-calculated),
    user: ObjectId (ref: User),
    createdAt: Date,
    updatedAt: Date
}
```

---

## 🔍 Subscription Features

### Auto-Renewal Calculation
The system automatically calculates renewal dates based on frequency:
- **Daily**: +1 day
- **Weekly**: +7 days
- **Monthly**: +30 days
- **Yearly**: +365 days

### Auto-Status Update
Subscriptions automatically expire when renewal date passes.

### Categories
- Sports
- News
- Entertainment
- Lifestyle
- Technology
- Finance
- Politics
- Other

---

## 📧 Email Templates

### Welcome Email
Sent automatically when a new user registers:
- Professional HTML design
- User personalization
- Dashboard link
- Responsive layout

### Subscription Confirmation
Sent when a new subscription is created:
- Subscription details (name, price, frequency)
- Start and renewal dates
- View subscription link
- Professional styling

---

## 🌐 Response Format

### Success Response
```json
{
    "success": true,
    "message": {
        "en": "English message",
        "ar": "الرسالة بالعربية"
    },
    "data": { }
}
```

### Error Response
```json
{
    "success": false,
    "message": {
        "en": "Error message",
        "ar": "رسالة الخطأ بالعربية"
    }
}
```

---

## ⚠️ Error Handling

The API includes comprehensive error handling for:
- **Invalid ObjectId**: 404 - Resource not found
- **Duplicate Keys**: 400 - Duplicate value error
- **Validation Errors**: 400 - Field validation messages
- **Token Expiration**: 401 - Session expired
- **Authentication Errors**: 401 - Unauthorized
- **General Errors**: 500 - Server error

All errors are returned in both English and Arabic.


Built with ❤️ for efficient subscription management
