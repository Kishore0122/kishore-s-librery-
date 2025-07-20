# 📚 Library Management System

A modern, full-stack library management system built with React, Node.js, and MongoDB. This application provides comprehensive book management, user authentication, borrowing system, and admin dashboard with real-time notifications.

## ✨ Features

### 🔐 Authentication & Security
- **User Registration & Login** with email verification
- **OTP Verification** for account activation
- **Password Reset** functionality with email tokens
- **JWT-based Authentication** with secure token management
- **Role-based Access Control** (Admin/User)
- **Auto-logout** functionality for security
- **Multi-tab session management**

### 📖 Book Management
- **Book Catalog** with search and filtering
- **Add/Edit/Delete Books** (Admin only)
- **Book Details** with descriptions, authors, and availability
- **Book Cover Management** with Cloudinary integration
- **Quantity Tracking** and availability status

### 🔄 Borrowing System
- **Borrow Requests** with approval workflow
- **Due Date Management** with automatic calculations
- **Return Book** functionality
- **Fine Calculation** for overdue books
- **Borrowing History** tracking

### 👥 User Management
- **User Profiles** with avatar support
- **Admin Dashboard** with comprehensive statistics
- **User Management** (Admin only)
- **Account Verification** system

### 📊 Admin Dashboard
- **Real-time Statistics** with Chart.js integration
- **User Analytics** and book usage metrics
- **Borrowing Reports** and overdue tracking
- **System Health Monitoring**

### 🎨 User Interface
- **Modern UI** with Tailwind CSS
- **Responsive Design** for all devices
- **Smooth Animations** with Framer Motion
- **Toast Notifications** for user feedback
- **Loading States** and error handling
- **Dark/Light Theme** support

### 🔧 Technical Features
- **Real-time Notifications** for overdue books
- **Email Notifications** for account verification and password reset
- **Automatic Cleanup** of unverified accounts
- **File Upload** support for book covers
- **API Rate Limiting** and error handling
- **CORS Configuration** for security

## 🏗️ Architecture

### Frontend (React + Vite)
```
client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Page components
│   ├── popups/             # Modal components
│   ├── layout/             # Layout components (Header, Sidebar)
│   ├── store/              # Redux store and slices
│   ├── hooks/              # Custom React hooks
│   ├── api/                # API configuration
│   ├── utils/              # Utility functions
│   └── assets/             # Static assets and animations
```

### Backend (Node.js + Express)
```
server/
├── controllers/            # Request handlers
├── models/                 # MongoDB schemas
├── routes/                 # API routes
├── middlewares/            # Custom middleware
├── services/               # Business logic services
├── utils/                  # Utility functions
├── config/                 # Configuration files
└── database/               # Database connection
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (v5 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd library
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Setup**

   Create `.env` file in the `server/config/` directory:
   ```env
   PORT=4000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   
   # Email Configuration (for notifications)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   
   # Cloudinary Configuration (for file uploads)
   CLOUDINARY_CLIENT_NAME=your_cloudinary_name
   CLOUDINARY_CLIENT_API=your_cloudinary_api_key
   CLOUDINARY_CLIENT_SECRET=your_cloudinary_secret
   ```

4. **Start the application**
   ```bash
   # Start the server (from server directory)
   npm run dev
   
   # Start the client (from client directory)
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000

## 📋 API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/me` - Get current user
- `POST /api/v1/auth/verify-email` - Email verification
- `POST /api/v1/auth/forgot-password` - Forgot password
- `POST /api/v1/auth/reset-password` - Reset password

### Books
- `GET /api/v1/books` - Get all books
- `POST /api/v1/books` - Add new book (Admin)
- `PUT /api/v1/books/:id` - Update book (Admin)
- `DELETE /api/v1/books/:id` - Delete book (Admin)

### Borrowing
- `GET /api/v1/borrow` - Get borrowings
- `POST /api/v1/borrow` - Create borrowing
- `PUT /api/v1/borrow/:id` - Update borrowing
- `GET /api/v1/borrow-requests` - Get borrow requests
- `POST /api/v1/borrow-requests` - Create borrow request
- `PUT /api/v1/borrow-requests/:id` - Update borrow request

### Users
- `GET /api/v1/user` - Get all users (Admin)
- `PUT /api/v1/user/:id` - Update user
- `DELETE /api/v1/user/:id` - Delete user (Admin)
- `GET /api/v1/admin/stats` - Get admin statistics

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Chart.js** - Data visualization
- **Axios** - HTTP client
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **Nodemailer** - Email sending
- **Cloudinary** - File upload service
- **node-cron** - Scheduled tasks
- **express-fileupload** - File upload middleware

## 📱 Features by User Role

### 👤 Regular User
- Browse book catalog
- Request book borrowing
- View borrowing history
- Manage profile
- Reset password
- Email verification

### 👨‍💼 Admin User
- All regular user features
- Manage books (CRUD operations)
- Approve/reject borrow requests
- View all users and their data
- Access admin dashboard with statistics
- Manage user accounts
- System monitoring

## 🔒 Security Features

- **Password Hashing** with bcrypt
- **JWT Token Authentication**
- **CORS Protection**
- **Input Validation** and sanitization
- **Rate Limiting**
- **Secure File Uploads**
- **Environment Variable Protection**
- **Error Handling** without exposing sensitive data

## 📧 Email Notifications

The system sends automated emails for:
- Account verification (OTP)
- Password reset tokens
- Overdue book notifications
- Account cleanup notifications

## 🗄️ Database Schema

### User Model
- Basic info (name, email, password)
- Role (Admin/User)
- Account verification status
- Borrowed books array
- Avatar (Cloudinary)
- Verification codes and tokens

### Book Model
- Title, author, description
- Charge (fine amount)
- Quantity and availability
- Timestamps

### Borrowing Models
- Book references
- User references
- Borrow and due dates
- Return status
- Fine calculations

## 🚀 Deployment

### Frontend Deployment
```bash
cd client
npm run build
# Deploy the dist/ folder to your hosting service
```

### Backend Deployment
```bash
cd server
npm start
# Deploy to your server or cloud platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

Library Management System - A comprehensive solution for modern libraries.

## 🆘 Support

For support and questions, please open an issue in the repository or contact the development team.

---

**Note**: Make sure to configure all environment variables properly before running the application. The system requires MongoDB, email service (SMTP), and Cloudinary for full functionality. 
