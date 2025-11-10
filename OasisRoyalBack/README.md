# Oasis Royal — Backend

Full-featured Express.js API for premium date products e-commerce with MongoDB, JWT authentication, Cloudinary uploads, and Swagger documentation.

## Setup

1. Copy `.env.example` to `.env` and fill in your credentials:
```powershell
cp .env.example .env
```

Minimum required:
```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/oasisroyal
JWT_SECRET=your-secret-key-change-this
FRONTEND_URL=http://localhost:5173
```

2. Install dependencies:
```powershell
cd c:\WEB\OasisRoyal\OasisRoyalBack
npm install
```

3. Seed the database with sample data:
```powershell
npm run seed
```

This will create:
- Admin user: `admin@oasisroyal.com` / `admin123`
- Customer user: `customer@example.com` / `customer123`
- 4 Categories (Premium Dates, Gift Boxes, Date Derivatives, Organic Dates)
- 8 Sample date products

4. Start the server:
```powershell
npm start          # production
npm run dev        # development (with nodemon)
```

## API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:3000/api-docs

Interactive API documentation with all endpoints, schemas, and the ability to test requests directly.

## API Endpoints

### 🔐 Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user (returns JWT token)
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### 📦 Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### 🌴 Products (Date Products)
- `GET /api/products` - Get all products (with pagination, search, filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### 📋 Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/me` - Get user orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### 🖼️ Upload
- `POST /api/upload` - Upload image to Cloudinary (Admin only)

### 👨‍💼 Admin Dashboard
- `GET /api/admin/stats` - Dashboard statistics (Admin only)
  - Total orders, products, users
  - Revenue stats
  - Top products
  - Sales trends (last 7 days)
  - Recent orders
- `GET /api/admin/users` - Get all users (Admin only)
- `PUT /api/admin/users/:id/role` - Update user role (Admin only)
- `PUT /api/admin/users/:id/status` - Toggle user active status (Admin only)

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get the token by logging in via `/api/users/login`.

## Folder Structure

```
├── config/          # Database, Cloudinary, and Swagger config
├── controllers/     # Route controllers (user, product, order, admin, etc.)
├── middlewares/     # Auth, validation, error handling
├── models/          # Mongoose models (User, Product, Order, Category)
├── routes/          # API routes
├── utils/           # Logger and utilities
├── seed.js          # Database seed script
└── server.js        # App entry point
```

## Testing the API

Use the Swagger UI at http://localhost:3000/api-docs or tools like Postman/Thunder Client.

Example: Login as admin
```powershell
$body = @{
  email = "admin@oasisroyal.com"
  password = "admin123"
} | ConvertTo-Json

Invoke-RestMethod -Uri 'http://localhost:3000/api/users/login' -Method POST -Body $body -ContentType "application/json"
```
