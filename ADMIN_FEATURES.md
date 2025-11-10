# Admin Panel Features

## Admin User Menu

When a user with `role: 'admin'` logs in, they will see a different menu under their profile with the following options:

### Desktop Menu (Dropdown)
- **Dashboard** - Admin statistics and overview (`/admin/dashboard`)
- **Manage Users** - View and manage all users (`/admin/users`)
- **Manage Products** - CRUD operations for products (`/admin/products`)
- **Manage Orders** - View and manage all orders (`/admin/orders`)
- **Manage Categories** - CRUD operations for categories (`/admin/categories`)
- **My Profile** - Personal profile settings (`/profile`)
- **Logout** - Sign out

### Visual Indicators
- Admin users have a **Shield icon** (🛡️) instead of the regular User icon
- The dropdown shows an "ADMIN PANEL" header with amber background
- All menu items have relevant icons for better UX

### Mobile Menu
Same admin options are available in the mobile hamburger menu with icons

## Backend Admin Endpoints

### Admin Routes (`/api/admin/*`)
All require `protect` and `authorize('admin')` middleware:

1. **GET /api/admin/stats**
   - Dashboard statistics

2. **GET /api/admin/users**
   - Get all users with pagination and filters

3. **PUT /api/admin/users/:id/role**
   - Update user role (user/admin)

4. **PUT /api/admin/users/:id/status**
   - Toggle user active/inactive status

### User Management (`/api/users/*`)
Admin-only routes:

1. **GET /api/users**
   - Get all users (with pagination, search, role filter)

2. **GET /api/users/:id**
   - Get user by ID

3. **PUT /api/users/:id**
   - Update any user

4. **DELETE /api/users/:id**
   - Delete user (cannot delete own account)

### Product Management (`/api/products/*`)
Admin routes:

1. **POST /api/products**
   - Create new product

2. **PUT /api/products/:id**
   - Update product

3. **DELETE /api/products/:id**
   - Delete product

### Order Management (`/api/orders/*`)
Admin routes:

1. **GET /api/orders**
   - Get all orders with pagination

2. **PUT /api/orders/:id/status**
   - Update order status

### Category Management (`/api/categories/*`)
Admin routes:

1. **POST /api/categories**
   - Create new category

2. **PUT /api/categories/:id**
   - Update category

3. **DELETE /api/categories/:id**
   - Delete category

## Test Admin Account

- **Email:** `admin@oasisroyal.com`
- **Password:** `admin123`
- **Role:** `admin`

## Regular User Account (for comparison)

- **Email:** `customer@example.com`
- **Password:** `customer123`
- **Role:** `user`

Regular users see:
- My Profile
- My Orders
- Logout

## Next Steps

To complete the admin panel, you need to create these pages:

1. **Dashboard Page** (`/admin/dashboard`)
   - Stats cards (total users, products, orders, revenue)
   - Recent orders table
   - Charts/graphs

2. **Users Management Page** (`/admin/users`)
   - Users table with search/filter
   - Edit user role
   - Activate/deactivate users
   - Delete users

3. **Products Management Page** (`/admin/products`)
   - Products table
   - Create/Edit product form
   - Delete products
   - Upload images

4. **Orders Management Page** (`/admin/orders`)
   - Orders table with status filter
   - Update order status
   - View order details

5. **Categories Management Page** (`/admin/categories`)
   - Categories table
   - Create/Edit category form
   - Delete categories

All admin pages should be protected with `AuthGuard` and check for admin role.
