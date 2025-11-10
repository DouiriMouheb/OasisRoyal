# Oasis Royal API - Complete CRUD Endpoints

## 🔐 Authentication

### Public Routes
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### User Profile (Protected)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile

---

## 👥 Users (Admin Only)

### List & Search
- `GET /api/users` - Get all users with pagination
  - Query params: `page`, `limit`, `search`, `role`

### Individual User Management
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user details
- `DELETE /api/users/:id` - Delete user

---

## 📦 Categories

### Public Routes
- `GET /api/categories` - Get all active categories
- `GET /api/categories/:id` - Get category by ID

### Admin Routes
- `POST /api/categories` - Create new category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

**Category Fields:**
```json
{
  "name": "Premium Dates",
  "description": "High-quality premium dates from Morocco",
  "image": {
    "url": "https://...",
    "publicId": "premium-dates"
  },
  "isActive": true
}
```

---

## 🌴 Products

### Public Routes
- `GET /api/products` - Get all products with filters
  - Query params: `category`, `featured`, `search`, `sort`, `page`, `limit`
- `GET /api/products/:id` - Get product by ID

### Admin Routes
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

**Product Fields:**
```json
{
  "name": "Medjool Dates Premium 500g",
  "description": "Premium Medjool dates from Morocco",
  "price": 34.99,
  "category": "category_id",
  "images": [
    {
      "url": "https://...",
      "publicId": "medjool-1"
    }
  ],
  "stock": 150,
  "weight": 500,
  "featured": true,
  "isActive": true
}
```

---

## 🛒 Orders

### Customer Routes (Protected)
- `POST /api/orders` - Create new order
- `GET /api/orders/me` - Get current user's orders
- `GET /api/orders/:id` - Get order by ID

### Admin Routes
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id` - Update order details
- `PUT /api/orders/:id/status` - Update order status
- `DELETE /api/orders/:id` - Delete order (cancelled/pending only)

**Order Fields:**
```json
{
  "items": [
    {
      "product": "product_id",
      "quantity": 2,
      "price": 34.99
    }
  ],
  "shippingAddress": {
    "name": "John Doe",
    "street": "123 Main St",
    "city": "Casablanca",
    "postalCode": "20000",
    "country": "Morocco",
    "phone": "+212612345678"
  },
  "paymentMethod": "stripe",
  "subtotal": 69.98,
  "shippingCost": 5.00,
  "tax": 7.50,
  "total": 82.48
}
```

**Order Status Flow:**
- `pending` → `processing` → `shipped` → `delivered`
- Can be cancelled at any stage

---

## 📊 Admin Dashboard

- `GET /api/admin/stats` - Get dashboard statistics
  - Revenue stats (total, last 30 days, growth)
  - Top 5 products by sales
  - 7-day sales trend
  - Orders by status count

- `GET /api/admin/users` - Get all users (same as `/api/users`)
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/status` - Toggle user active status

---

## 📤 File Upload

- `POST /api/upload` - Upload image to Cloudinary (Admin only)
  - Form data: `image` (file)
  - Returns: `{ url, publicId }`

---

## 📝 Response Format

All responses follow this structure:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful",
  "pagination": { /* if applicable */
    "page": 1,
    "limit": 10,
    "total": 100,
    "pages": 10
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 🔑 Authentication

Add JWT token to requests:
```
Authorization: Bearer <your_jwt_token>
```

### Test Credentials

**Admin:**
- Email: `admin@oasisroyal.com`
- Password: `admin123`

**Customer:**
- Email: `customer@example.com`
- Password: `customer123`

---

## 🚀 Quick Start

1. **Start the server:**
   ```bash
   npm run dev
   ```

2. **Access Swagger UI:**
   - http://localhost:3000/api-docs

3. **Login and get token:**
   ```bash
   POST http://localhost:3000/api/users/login
   {
     "email": "admin@oasisroyal.com",
     "password": "admin123"
   }
   ```

4. **Use the token in Swagger:**
   - Click "Authorize" button
   - Enter: `Bearer <your_token>`
   - Click "Authorize"

---

## 📊 Complete CRUD Matrix

| Resource   | Create (C) | Read (R)           | Update (U)     | Delete (D)     |
|------------|------------|--------------------|----------------|----------------|
| **Users**  | POST /register | GET /users, /users/:id | PUT /users/:id | DELETE /users/:id |
| **Categories** | POST /categories | GET /categories, /categories/:id | PUT /categories/:id | DELETE /categories/:id |
| **Products** | POST /products | GET /products, /products/:id | PUT /products/:id | DELETE /products/:id |
| **Orders** | POST /orders | GET /orders, /orders/:id, /orders/me | PUT /orders/:id, /orders/:id/status | DELETE /orders/:id |

✅ **All CRUD operations are now fully implemented!**
