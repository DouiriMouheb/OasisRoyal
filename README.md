# 🌴 Oasis Royal - Premium Tunisian Dates E-Commerce Platform

A full-stack MERN e-commerce application for selling premium Tunisian dates and date products.

![Tech Stack](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### Customer Features
- 🛒 **Guest Browsing** - Browse products and add to cart without login
- 🔐 **Authentication Required** - Login/Register required only at checkout
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 🔍 **Product Search & Filters** - Search, filter by category, sort options
- 🛍️ **Shopping Cart** - Persistent cart with localStorage
- 💳 **Checkout Flow** - Multi-step checkout with shipping & payment
- 📦 **Order Tracking** - View order history and status
- 👤 **User Profile** - Manage account information
- 🌐 **OAuth Login** - Login with Google or Facebook
- 🎨 **Modern UI** - Clean design with Tailwind CSS v4

### Admin Features (Coming Soon)
- 📊 Dashboard with analytics
- 📦 Product management (CRUD)
- 👥 User management
- 📋 Order management
- 🏷️ Category management

## 🛠️ Tech Stack

### Frontend
- **React 19.2** - UI library
- **Vite 7.2** - Build tool & dev server
- **React Router 7.9** - Client-side routing
- **Redux Toolkit 2.10** - State management
- **Tailwind CSS 4.1** - Utility-first CSS
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Yup** - Schema validation
- **React Hot Toast** - Notifications
- **Framer Motion** - Animations
- **Lucide React** - Icons

### Backend
- **Node.js 20+** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Passport.js** - OAuth (Google, Facebook)
- **bcryptjs** - Password hashing
- **Swagger/OpenAPI** - API documentation
- **Morgan** - HTTP request logger
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

## 📋 Prerequisites

- Node.js 20+ and npm
- MongoDB Atlas account (or local MongoDB)
- Git

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/oasis-royal.git
cd oasis-royal
```

### 2. Backend Setup

```bash
cd OasisRoyalBack

# Install dependencies
npm install

# Create .env file from example
cp .env.example .env

# Edit .env with your credentials
# - Add your MongoDB connection string
# - Set JWT_SECRET
# - (Optional) Add Google/Facebook OAuth credentials

# Seed the database with sample data
npm run seed

# Start the development server
npm run dev
```

The backend will run on http://localhost:3000

### 3. Frontend Setup

```bash
cd ../OasisRoyalFront

# Install dependencies
npm install

# Create .env file (optional)
# VITE_API_URL=http://localhost:3000/api

# Start the development server
npm run dev
```

The frontend will run on http://localhost:5173 (or 5174 if 5173 is in use)

## 📁 Project Structure

```
OasisRoyal/
├── OasisRoyalBack/          # Backend (Express + MongoDB)
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middlewares/         # Custom middlewares
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── seeders/             # Database seeders
│   └── server.js            # Entry point
│
├── OasisRoyalFront/         # Frontend (React + Vite)
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── common/      # Reusable UI components
│   │   │   ├── layout/      # Header, Footer
│   │   │   ├── products/    # Product components
│   │   │   ├── cart/        # Cart components
│   │   │   ├── auth/        # Auth components
│   │   │   └── checkout/    # Checkout components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store
│   │   │   ├── slices/      # Redux slices
│   │   │   └── api.js       # API client
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   └── main.jsx         # Entry point
│
├── API_MAPPING.md           # API endpoint documentation
└── README.md                # This file
```

## 🔑 Environment Variables

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Optional OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_APP_ID=your_facebook_app_id
FACEBOOK_APP_SECRET=your_facebook_app_secret
```

### Frontend (.env - optional)
```env
VITE_API_URL=http://localhost:3000/api
```

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs

Or see [API_MAPPING.md](./API_MAPPING.md) for detailed endpoint documentation.

## 🧪 Test Accounts

After running the seed script, you can login with:

**Admin:**
- Email: `admin@oasisroyal.com`
- Password: `admin123`

**Customer:**
- Email: `user@example.com`
- Password: `user123`

## 📦 Sample Products

The seed script creates:
- 4 Product Categories
- 8 Date Products (Medjool, Deglet Noor, Gift Boxes, etc.)

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcryptjs
- ✅ Protected routes & middleware
- ✅ Input validation & sanitization
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Rate limiting (planned)

## 🎯 Future Enhancements

- [ ] Admin Dashboard
- [ ] Payment Integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Multi-language support (Arabic/French)
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Discount codes & promotions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Date images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI inspired by modern e-commerce platforms

---

**Note:** This is a learning/portfolio project. OAuth credentials and payment integration are optional for development.
