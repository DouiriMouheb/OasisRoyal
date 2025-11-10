# Oasis Royal - Frontend Architecture Plan

## 🎯 Project Goals

### User Experience Flow
1. **Browse Products** - No authentication required
2. **Add to Cart** - No authentication required (localStorage)
3. **View Cart** - No authentication required
4. **Proceed to Checkout** - **Authentication Required** ⚠️
5. **Place Order** - Authenticated users only
6. **View Order History** - Authenticated users only

---

## 📁 Folder Structure

```
src/
├── assets/              # Images, icons, fonts
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Card.jsx
│   │   ├── Modal.jsx
│   │   ├── Loader.jsx
│   │   ├── Badge.jsx
│   │   ├── Alert.jsx
│   │   └── Pagination.jsx
│   ├── layout/          # Layout components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── Sidebar.jsx
│   ├── products/        # Product-related components
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   ├── ProductGrid.jsx
│   │   ├── ProductFilters.jsx
│   │   ├── ProductSort.jsx
│   │   └── ProductDetails.jsx
│   ├── cart/            # Cart components
│   │   ├── CartDrawer.jsx
│   │   ├── CartItem.jsx
│   │   ├── CartSummary.jsx
│   │   └── CartButton.jsx
│   ├── auth/            # Authentication components
│   │   ├── LoginForm.jsx
│   │   ├── RegisterForm.jsx
│   │   ├── OAuthButtons.jsx
│   │   └── AuthGuard.jsx
│   ├── checkout/        # Checkout components
│   │   ├── CheckoutSteps.jsx
│   │   ├── ShippingForm.jsx
│   │   ├── PaymentForm.jsx
│   │   └── OrderSummary.jsx
│   └── orders/          # Order components
│       ├── OrderCard.jsx
│       ├── OrderList.jsx
│       └── OrderDetails.jsx
├── pages/
│   ├── Home.jsx         # Landing page with featured products
│   ├── Shop.jsx         # All products with filters
│   ├── ProductPage.jsx  # Single product details
│   ├── Cart.jsx         # Cart page (optional, can use drawer)
│   ├── Login.jsx        # Login page
│   ├── Register.jsx     # Register page
│   ├── AuthCallback.jsx # OAuth callback handler
│   ├── Checkout.jsx     # Checkout page (auth required)
│   ├── OrderSuccess.jsx # Order confirmation
│   ├── MyOrders.jsx     # User's order history
│   ├── Profile.jsx      # User profile
│   └── NotFound.jsx     # 404 page
├── store/
│   ├── store.js         # Redux store configuration
│   ├── slices/
│   │   ├── authSlice.js      # User authentication state
│   │   ├── productsSlice.js  # Products data
│   │   ├── cartSlice.js      # Shopping cart (localStorage)
│   │   ├── categoriesSlice.js
│   │   └── ordersSlice.js
│   └── api.js           # Axios instance with interceptors
├── hooks/               # Custom React hooks
│   ├── useAuth.js       # Authentication hook
│   ├── useCart.js       # Cart operations hook
│   ├── useLocalStorage.js
│   └── useDebounce.js
├── utils/               # Utility functions
│   ├── formatPrice.js
│   ├── formatDate.js
│   ├── validators.js
│   └── constants.js
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🛣️ Routing Structure

```jsx
// Public Routes (No Authentication)
/ ────────────────────── Home (featured products, categories)
/shop ───────────────── Shop (all products, filters, search)
/product/:id ─────────  Product Details
/cart ───────────────── Cart Page (optional, can use drawer)
/login ──────────────── Login
/register ───────────── Register
/auth/callback ──────── OAuth callback handler

// Protected Routes (Authentication Required)
/checkout ───────────── Checkout (redirects to /login if not authenticated)
/orders ─────────────── My Orders
/orders/:id ─────────── Order Details
/profile ────────────── User Profile

// Future Admin Routes (Phase 2)
/admin/dashboard
/admin/products
/admin/orders
/admin/customers
```

---

## 🎨 Component Architecture

### 1. **Common/Reusable Components**

#### Button Component
```jsx
<Button variant="primary|secondary|outline" size="sm|md|lg" loading={bool}>
  Click Me
</Button>
```

#### Card Component
```jsx
<Card hover shadow>
  <Card.Image src="..." />
  <Card.Body>
    <Card.Title>Title</Card.Title>
    <Card.Text>Description</Card.Text>
  </Card.Body>
</Card>
```

#### Input Component
```jsx
<Input 
  type="text|email|password" 
  label="Email" 
  error="Error message"
  icon={<MailIcon />}
/>
```

#### Modal Component
```jsx
<Modal isOpen={bool} onClose={fn} title="Modal Title">
  Content
</Modal>
```

---

### 2. **Product Components**

#### ProductCard
```jsx
<ProductCard 
  product={product}
  onAddToCart={fn}
  showQuickView={bool}
/>
```

**Features:**
- Product image with hover effect
- Product name, price, rating
- "Add to Cart" button
- "Quick View" icon
- "Sold Out" badge if stock === 0

#### ProductGrid
```jsx
<ProductGrid 
  products={products}
  loading={bool}
  columns={3|4}
/>
```

#### ProductFilters
```jsx
<ProductFilters 
  categories={categories}
  priceRange={[min, max]}
  onFilterChange={fn}
/>
```

**Features:**
- Category filter (checkboxes)
- Price range slider
- Search input
- "Featured only" toggle
- Clear filters button

---

### 3. **Cart Components**

#### CartDrawer (Slide-in from right)
```jsx
<CartDrawer isOpen={bool} onClose={fn}>
  <CartItem />
  <CartItem />
  <CartSummary />
  <Button>Proceed to Checkout</Button>
</CartDrawer>
```

#### CartItem
```jsx
<CartItem 
  item={item}
  onUpdateQuantity={fn}
  onRemove={fn}
/>
```

**Features:**
- Product image, name, price
- Quantity selector (+/-)
- Remove button
- Subtotal calculation

#### CartButton (Header)
```jsx
<CartButton itemCount={5} onClick={fn} />
```

---

### 4. **Authentication Components**

#### LoginForm
```jsx
<LoginForm 
  onSuccess={fn}
  redirectTo="/checkout"
/>
```

**Features:**
- Email/Password inputs
- "Remember me" checkbox
- Validation
- Loading state
- Error display

#### OAuthButtons
```jsx
<OAuthButtons />
```

**Features:**
- "Continue with Google" button
- "Continue with Facebook" button
- Proper branding colors

#### AuthGuard (HOC or Component)
```jsx
<AuthGuard redirectTo="/login">
  <ProtectedComponent />
</AuthGuard>
```

---

### 5. **Checkout Components**

#### CheckoutSteps
```jsx
<CheckoutSteps currentStep={1|2|3}>
  1. Shipping
  2. Payment
  3. Review
</CheckoutSteps>
```

#### ShippingForm
```jsx
<ShippingForm 
  initialData={data}
  onSubmit={fn}
/>
```

**Fields:**
- Full Name
- Address, City, Postal Code, Country
- Phone Number

---

## 🗄️ Redux Store Structure

### Auth Slice
```javascript
{
  user: { _id, name, email, role, avatar },
  token: "jwt_token",
  isAuthenticated: bool,
  loading: bool,
  error: null
}
```

### Products Slice
```javascript
{
  items: [],
  categories: [],
  filters: { category: '', search: '', priceRange: [] },
  pagination: { page: 1, limit: 12, total: 0 },
  loading: bool,
  error: null
}
```

### Cart Slice (Persisted to localStorage)
```javascript
{
  items: [
    { 
      product: { _id, name, price, images },
      quantity: 2,
      subtotal: 69.98
    }
  ],
  subtotal: 0,
  shipping: 5.00,
  tax: 0,
  total: 0,
  itemCount: 0
}
```

### Orders Slice
```javascript
{
  orders: [],
  currentOrder: null,
  loading: bool,
  error: null
}
```

---

## 🔄 User Flow Diagrams

### Browse & Add to Cart (No Auth)
```
User visits → Home Page
            ↓
    Browses Products (Shop page)
            ↓
    Clicks Product → Product Details
            ↓
    Clicks "Add to Cart"
            ↓
    Cart stored in localStorage
            ↓
    Cart icon updates (badge with count)
            ↓
    User can continue shopping
```

### Checkout Flow (Auth Required)
```
User clicks "Checkout"
            ↓
    Check if authenticated?
            ↓
    NO → Redirect to /login
         (save intended destination)
            ↓
         User logs in
            ↓
         Redirect back to /checkout
            ↓
    YES → Proceed to Checkout
            ↓
         Step 1: Shipping Address
            ↓
         Step 2: Payment Method
            ↓
         Step 3: Review Order
            ↓
         Place Order (API call)
            ↓
         Clear cart
            ↓
         Redirect to /order-success/:orderId
```

---

## 🎨 UI/UX Features

### Header
- Logo (clickable → Home)
- Search bar
- Navigation: Home | Shop | Categories
- Cart button with item count badge
- User menu (if logged in) or Login button

### Product Card Hover Effects
- Image zoom
- Quick view icon appears
- Shadow increases
- "Add to Cart" button animates

### Cart Drawer
- Slide-in animation from right
- Backdrop overlay
- Smooth transitions
- Scroll if many items

### Loading States
- Skeleton loaders for products
- Spinner for button actions
- Shimmer effect for images

### Empty States
- Empty cart illustration
- No products found
- No orders yet

---

## 🔐 Authentication Strategy

### Login/Register Flow
1. User clicks "Login" or tries to checkout
2. Redirected to `/login` with `?redirect=/checkout` param
3. User can:
   - Login with email/password
   - Register new account
   - Use Google OAuth
   - Use Facebook OAuth
4. On success:
   - Store JWT token in localStorage
   - Update Redux auth state
   - Redirect to intended page or home

### Protected Routes
```jsx
// AuthGuard wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const location = useLocation()
  
  if (!isAuthenticated) {
    return <Navigate to={`/login?redirect=${location.pathname}`} />
  }
  
  return children
}
```

---

## 📦 Cart Persistence

### localStorage Strategy
```javascript
// Save cart to localStorage on every change
localStorage.setItem('cart', JSON.stringify(cartState))

// Load cart on app initialization
const persistedCart = localStorage.getItem('cart')
const initialState = persistedCart ? JSON.parse(persistedCart) : defaultCart

// Clear cart after successful order
localStorage.removeItem('cart')
```

---

## 🎯 Key Features

### Customer Features
✅ Browse products without login
✅ Search and filter products
✅ Add to cart (localStorage)
✅ View cart anytime
✅ Update quantities
✅ Remove items
✅ Guest browsing experience
✅ Login/Register with OAuth
✅ Checkout (authenticated only)
✅ View order history
✅ Update profile

### Technical Features
✅ Responsive design (mobile-first)
✅ Lazy loading images
✅ Optimistic UI updates
✅ Error handling with retry
✅ Loading states everywhere
✅ Form validation
✅ Toast notifications
✅ SEO-friendly routing

---

## 🚀 Development Phases

### Phase 1: Foundation (Week 1)
- [ ] Folder structure setup
- [ ] Redux store configuration
- [ ] API client setup
- [ ] Common components (Button, Input, Card, Modal)
- [ ] Layout components (Header, Footer)
- [ ] Routing setup

### Phase 2: Products & Cart (Week 2)
- [ ] Product components (Card, List, Details)
- [ ] Product filtering and search
- [ ] Cart slice and localStorage
- [ ] Cart drawer UI
- [ ] Add/Remove/Update cart items

### Phase 3: Authentication (Week 3)
- [ ] Auth slice
- [ ] Login/Register pages
- [ ] OAuth integration (Google/Facebook)
- [ ] Protected routes
- [ ] Auth persistence

### Phase 4: Checkout & Orders (Week 4)
- [ ] Checkout page with steps
- [ ] Shipping form
- [ ] Payment integration
- [ ] Order placement
- [ ] Order confirmation
- [ ] Order history page

### Phase 5: Polish & Admin (Week 5)
- [ ] Responsive design refinement
- [ ] Error handling improvements
- [ ] Loading states polish
- [ ] Admin panel (basic CRUD)

---

## 📱 Responsive Breakpoints

```css
/* Mobile First */
sm: 640px   /* Small devices */
md: 768px   /* Tablets */
lg: 1024px  /* Laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Layout Grid
- **Mobile**: 1 column
- **Tablet**: 2 columns
- **Desktop**: 3-4 columns

---

## 🎨 Design System

### Colors (Using Tailwind)
- **Primary**: Dates brown/gold theme
- **Secondary**: Complementary color
- **Success**: Green
- **Error**: Red
- **Warning**: Orange
- **Info**: Blue

### Typography
- **Headings**: Font-bold, larger sizes
- **Body**: Font-normal
- **Small**: Font-sm for captions

### Spacing
- Consistent padding/margin using Tailwind scale (4, 8, 12, 16, 24, 32)

---

## 🔧 Tools & Libraries

### Already Installed
✅ React 19.2
✅ Vite 7.2
✅ React Router 7.9
✅ Redux Toolkit 2.10
✅ Tailwind CSS 4.1
✅ Lucide React Icons

### To Install
- [ ] `axios` - API calls
- [ ] `react-hot-toast` - Notifications
- [ ] `framer-motion` - Animations
- [ ] `react-hook-form` - Form handling
- [ ] `yup` or `zod` - Validation

---

## 📝 Next Steps

1. **Install additional dependencies**
2. **Create folder structure**
3. **Build common components**
4. **Setup Redux slices**
5. **Build product listing**
6. **Build cart system**
7. **Build authentication**
8. **Build checkout flow**

Ready to start implementing? Let's begin! 🚀
