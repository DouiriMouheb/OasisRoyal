# Checkout Flow Documentation

## Overview
The checkout system supports three payment methods:
1. **Cash on Delivery (COD)** - Currently Active
2. **PayPal** - Coming Soon
3. **Stripe (Credit/Debit Card)** - Coming Soon

## Checkout Steps

### 1. Shipping Information
- User enters or confirms shipping address
- Pre-populates from user profile if available
- Fields: Street, City, Postal Code, Country, Phone
- Located in: `src/components/checkout/ShippingForm.jsx`

### 2. Payment Method Selection
- User selects payment method
- Default: Cash on Delivery (COD)
- PayPal and Stripe options are visible but disabled (Coming Soon)
- Located in: `src/components/checkout/PaymentMethod.jsx`

### 3. Order Review
- Displays complete order summary:
  - Order items with images and quantities
  - Shipping address
  - Payment method
  - Price breakdown (subtotal, shipping, tax, total)
- User confirms and places order
- Located in: `src/components/checkout/OrderSummary.jsx`

### 4. Order Confirmation
- After successful order placement:
  - Cart is cleared
  - User is redirected to order details page (`/orders/:id`)
  - Order status: "Pending" (waiting for shipment)
  - Payment status: "Not Paid" (for COD)

## Cash on Delivery Flow

### User Side:
1. User selects "Cash on Delivery" payment method
2. Places order and confirms
3. Order is created with `isPaid: false`
4. User waits for delivery

### Admin/Logistics Side:
1. Admin views order in admin dashboard
2. Marks order as "Shipped" when dispatched
3. Logistics service delivers the product
4. Customer pays in cash upon delivery
5. Logistics confirms payment
6. Admin updates order: `isPaid: true`, `paidAt: [current date]`
7. Order status: "Delivered"

## Integration Notes

### PayPal Integration (Future)
To enable PayPal:
1. Install PayPal SDK: `npm install @paypal/react-paypal-js`
2. Get PayPal Client ID from PayPal Developer Dashboard
3. Add Client ID to environment variables
4. Uncomment PayPal option in `PaymentMethod.jsx`
5. Implement PayPal button component
6. Handle payment success/failure callbacks

### Stripe Integration (Future)
To enable Stripe:
1. Install Stripe SDK: `npm install @stripe/stripe-js @stripe/react-stripe-js`
2. Get Stripe Publishable Key from Stripe Dashboard
3. Add key to environment variables
4. Uncomment Stripe option in `PaymentMethod.jsx`
5. Implement Stripe Elements component
6. Handle payment confirmation flow

## Files Structure

```
src/
├── components/
│   └── checkout/
│       ├── CheckoutSteps.jsx       # Visual progress indicator
│       ├── ShippingForm.jsx        # Address input form
│       ├── PaymentMethod.jsx       # Payment selection
│       └── OrderSummary.jsx        # Final review
├── pages/
│   └── Checkout.jsx                # Main checkout orchestrator
└── App.jsx                         # Route: /checkout (protected)
```

## State Management

### Redux Slices Used:
- `authSlice` - User authentication and profile data
- `cartSlice` - Shopping cart items and totals
- `ordersSlice` - Order creation and management

### Checkout State (Local):
- `currentStep` - Current step number (1-4)
- `shippingAddress` - User's delivery address
- `paymentMethod` - Selected payment method (cod/paypal/stripe)

## API Endpoints

### Used by Checkout:
- `POST /api/orders` - Create new order
- `DELETE /api/cart` - Clear cart after successful order
- `GET /api/users/profile` - Get user data for shipping pre-fill

### Order Data Structure:
```javascript
{
  items: [
    {
      product: "productId",
      name: "Product Name",
      quantity: 2,
      price: 25.99,
      image: "imageUrl"
    }
  ],
  shippingAddress: {
    street: "123 Main St",
    city: "City",
    postalCode: "12345",
    country: "Country",
    phone: "+1234567890"
  },
  paymentMethod: "cod",
  itemsPrice: 51.98,
  taxPrice: 0,
  shippingPrice: 0,
  totalPrice: 51.98,
  isPaid: false,
  paidAt: null
}
```

## User Experience

### Navigation:
1. User clicks "Proceed to Checkout" from cart drawer
2. Redirected to `/checkout` (protected route - login required)
3. If cart is empty, redirected to `/shop`
4. Completes checkout steps sequentially
5. After order placement, redirected to `/orders/:id`

### Visual Feedback:
- Progress indicator shows current step with check marks for completed steps
- Loading states during order submission
- Error messages for failed operations
- Success redirect to order details

## Testing Checklist

- [ ] Empty cart redirects to shop
- [ ] Shipping form pre-fills from user profile
- [ ] Payment method selection works
- [ ] Order summary displays correct totals
- [ ] Order placement creates order in database
- [ ] Cart clears after successful order
- [ ] Redirect to order details works
- [ ] Error handling displays messages
- [ ] Back navigation between steps works
- [ ] Protected route requires authentication

## Notes

- Tax and shipping calculations are currently set to 0
- Update `handlePlaceOrder` in `Checkout.jsx` to implement proper tax/shipping logic
- COD orders require manual payment confirmation by admin after delivery
- PayPal and Stripe integrations will require backend endpoint updates as well
