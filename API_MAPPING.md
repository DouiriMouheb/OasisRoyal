# API Endpoint Mapping - Frontend to Backend

## ✅ MATCHING ENDPOINTS

### Authentication
| Frontend Call | Backend Route | Status |
|--------------|---------------|--------|
| `POST /users/login` | `POST /api/users/login` | ✅ Match |
| `POST /users/register` | `POST /api/users/register` | ✅ Match |
| `GET /users/profile` | `GET /api/users/profile` | ✅ Match |
| `PUT /users/profile` | `PUT /api/users/profile` | ✅ Match |

### Products
| Frontend Call | Backend Route | Status |
|--------------|---------------|--------|
| `GET /products` | `GET /api/products` | ✅ Match |
| `GET /products/:id` | `GET /api/products/:id` | ✅ Match |

### Categories
| Frontend Call | Backend Route | Status |
|--------------|---------------|--------|
| `GET /categories` | `GET /api/categories` | ✅ Match |
| `GET /categories/:id` | `GET /api/categories/:id` | ✅ Match |

### Orders
| Frontend Call | Backend Route | Status |
|--------------|---------------|--------|
| `POST /orders` | `POST /api/orders` | ✅ Match |
| `GET /orders/me` | `GET /api/orders/me` | ✅ Match |
| `GET /orders/:id` | `GET /api/orders/:id` | ✅ Match |

---

## 📋 BACKEND ENDPOINTS (Full List)

### Users (Public)
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user

### Users (Protected)
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update current user profile

### Users (Admin Only)
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Products (Public)
- `GET /api/products` - Get all products (with filters)
  - Query params: `?category=xxx&featured=true&search=xxx&sort=xxx&page=1&limit=12`
- `GET /api/products/:id` - Get product by ID

### Products (Admin Only)
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Categories (Public)
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get category by ID

### Categories (Admin Only)
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category

### Orders (Protected)
- `POST /api/orders` - Create order
- `GET /api/orders/me` - Get current user's orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id` - Update order
- `DELETE /api/orders/:id` - Delete order

### Orders (Admin Only)
- `GET /api/orders` - Get all orders
- `PUT /api/orders/:id/status` - Update order status

### OAuth (Public)
- `GET /api/auth/google` - Start Google OAuth
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/facebook` - Start Facebook OAuth
- `GET /api/auth/facebook/callback` - Facebook OAuth callback
- `GET /api/auth/failure` - OAuth failure redirect

### Admin (Admin Only)
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/role` - Update user role
- `PUT /api/admin/users/:id/status` - Toggle user status

### Upload (Admin Only)
- `POST /api/upload` - Upload image

---

## ✅ VERIFICATION RESULTS

All frontend API calls are correctly mapped to backend endpoints!

**Note:** The API client (`src/store/api.js`) automatically prepends `/api` to all requests, so:
- Frontend: `api.get('/products')` 
- Actually calls: `GET http://localhost:3000/api/products`

This matches the backend route structure perfectly.
