import { createSlice } from '@reduxjs/toolkit'
import { SHIPPING_COST, TAX_RATE, FREE_SHIPPING_THRESHOLD } from '../../utils/constants'

// Load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const cart = localStorage.getItem('cart')
    return cart ? JSON.parse(cart) : { items: [] }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error)
    return { items: [] }
  }
}

// Save cart to localStorage
const saveCartToStorage = (cart) => {
  try {
    localStorage.setItem('cart', JSON.stringify(cart))
  } catch (error) {
    console.error('Error saving cart to localStorage:', error)
  }
}

// Calculate totals
const calculateTotals = (items) => {
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const tax = subtotal * TAX_RATE
  const total = subtotal + shipping + tax
  const itemCount = items.reduce((count, item) => count + item.quantity, 0)
  
  return {
    subtotal: Number(subtotal.toFixed(2)),
    shipping: Number(shipping.toFixed(2)),
    tax: Number(tax.toFixed(2)),
    total: Number(total.toFixed(2)),
    itemCount
  }
}

const initialCart = loadCartFromStorage()
const initialState = {
  items: initialCart.items || [],
  ...calculateTotals(initialCart.items || [])
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id, name, price, images, stock } = action.payload
      const existingItem = state.items.find(item => item.product._id === _id)
      
      if (existingItem) {
        // Check stock before incrementing
        if (existingItem.quantity < stock) {
          existingItem.quantity += 1
        }
      } else {
        state.items.push({
          product: { _id, name, price, images, stock },
          quantity: 1,
          price
        })
      }
      
      // Recalculate totals
      const totals = calculateTotals(state.items)
      Object.assign(state, totals)
      
      // Save to localStorage
      saveCartToStorage({ items: state.items })
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.product._id !== productId)
      
      // Recalculate totals
      const totals = calculateTotals(state.items)
      Object.assign(state, totals)
      
      // Save to localStorage
      saveCartToStorage({ items: state.items })
    },
    
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload
      const item = state.items.find(item => item.product._id === productId)
      
      if (item) {
        // Ensure quantity doesn't exceed stock
        item.quantity = Math.min(Math.max(1, quantity), item.product.stock)
        
        // Recalculate totals
        const totals = calculateTotals(state.items)
        Object.assign(state, totals)
        
        // Save to localStorage
        saveCartToStorage({ items: state.items })
      }
    },
    
    incrementQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.product._id === productId)
      
      if (item && item.quantity < item.product.stock) {
        item.quantity += 1
        
        // Recalculate totals
        const totals = calculateTotals(state.items)
        Object.assign(state, totals)
        
        // Save to localStorage
        saveCartToStorage({ items: state.items })
      }
    },
    
    decrementQuantity: (state, action) => {
      const productId = action.payload
      const item = state.items.find(item => item.product._id === productId)
      
      if (item && item.quantity > 1) {
        item.quantity -= 1
        
        // Recalculate totals
        const totals = calculateTotals(state.items)
        Object.assign(state, totals)
        
        // Save to localStorage
        saveCartToStorage({ items: state.items })
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.shipping = 0
      state.tax = 0
      state.total = 0
      state.itemCount = 0
      
      // Clear localStorage
      localStorage.removeItem('cart')
    }
  }
})

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
