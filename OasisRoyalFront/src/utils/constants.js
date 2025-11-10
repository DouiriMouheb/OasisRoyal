// API Base URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
}

// Order Status Labels
export const ORDER_STATUS_LABELS = {
  pending: 'Pending',
  processing: 'Processing',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
}

// Order Status Colors
export const ORDER_STATUS_COLORS = {
  pending: 'yellow',
  processing: 'blue',
  shipped: 'purple',
  delivered: 'green',
  cancelled: 'red'
}

// Payment Methods
export const PAYMENT_METHODS = {
  STRIPE: 'stripe',
  PAYPAL: 'paypal',
  CASH: 'cash'
}

// Payment Method Labels
export const PAYMENT_METHOD_LABELS = {
  stripe: 'Credit Card (Stripe)',
  paypal: 'PayPal',
  cash: 'Cash on Delivery'
}

// Shipping Cost
export const SHIPPING_COST = 5.00

// Tax Rate (percentage)
export const TAX_RATE = 0.10 // 10%

// Free Shipping Threshold
export const FREE_SHIPPING_THRESHOLD = 100.00

// Pagination
export const PRODUCTS_PER_PAGE = 12
export const ORDERS_PER_PAGE = 10

// Image Placeholder
export const IMAGE_PLACEHOLDER = 'https://via.placeholder.com/400x400?text=Product+Image'

// Product Sort Options
export const SORT_OPTIONS = [
  { value: '-createdAt', label: 'Newest First' },
  { value: 'createdAt', label: 'Oldest First' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: 'name', label: 'Name: A-Z' },
  { value: '-name', label: 'Name: Z-A' }
]

// Countries
export const COUNTRIES = [
  'Tunisia',
  'Algeria',
  'Libya',
  'Morocco',
  'Egypt',
  'France',
  'Germany',
  'Italy',
  'Spain',
  'United Kingdom',
  'United States',
  'Canada'
]
