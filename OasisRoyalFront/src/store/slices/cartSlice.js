import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { SHIPPING_COST, TAX_RATE, FREE_SHIPPING_THRESHOLD } from '../../utils/constants'
import api from '../api'

// Async thunks for API calls
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart')
      console.log('🛒 FETCH CART: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart')
    }
  }
)

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart', { productId, quantity })
      console.log('🛒 ADD TO CART: Raw response:', response)
      console.log('🛒 ADD TO CART: response.data:', response.data)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add item')
    }
  }
)

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/cart/${productId}`, { quantity })
      console.log('🛒 UPDATE CART: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update item')
    }
  }
)

export const removeFromCartAsync = createAsyncThunk(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/cart/${productId}`)
      console.log('🛒 REMOVE FROM CART: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove item')
    }
  }
)

export const clearCartAsync = createAsyncThunk(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/cart')
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to clear cart')
    }
  }
)

export const syncCartAsync = createAsyncThunk(
  'cart/syncCart',
  async (localCart, { rejectWithValue }) => {
    try {
      const response = await api.post('/cart/sync', { items: localCart.items })
      console.log('🛒 SYNC CART: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to sync cart')
    }
  }
)

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
  ...calculateTotals(initialCart.items || []),
  loading: false,
  error: null,
  isAuthenticated: false // Will be set when user logs in
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Local cart actions (for guest users)
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
      
      // Save to localStorage only if not authenticated
      if (!state.isAuthenticated) {
        saveCartToStorage({ items: state.items })
      }
    },
    
    removeFromCart: (state, action) => {
      const productId = action.payload
      state.items = state.items.filter(item => item.product._id !== productId)
      
      // Recalculate totals
      const totals = calculateTotals(state.items)
      Object.assign(state, totals)
      
      // Save to localStorage only if not authenticated
      if (!state.isAuthenticated) {
        saveCartToStorage({ items: state.items })
      }
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
        
        // Save to localStorage only if not authenticated
        if (!state.isAuthenticated) {
          saveCartToStorage({ items: state.items })
        }
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
        
        // Save to localStorage only if not authenticated
        if (!state.isAuthenticated) {
          saveCartToStorage({ items: state.items })
        }
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
        
        // Save to localStorage only if not authenticated
        if (!state.isAuthenticated) {
          saveCartToStorage({ items: state.items })
        }
      }
    },
    
    clearCart: (state) => {
      state.items = []
      state.subtotal = 0
      state.shipping = 0
      state.tax = 0
      state.total = 0
      state.itemCount = 0
      state.isAuthenticated = false
      
      // Clear localStorage
      localStorage.removeItem('cart')
    },

    setAuthenticatedCart: (state, action) => {
      state.isAuthenticated = action.payload
    }
  },
  extraReducers: (builder) => {
    // Fetch Cart
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        console.log('🛒 FETCH CART REDUCER: action.payload:', action.payload)
        const payload = action.payload?.data || action.payload || {}
        state.items = payload.items || []
        state.subtotal = payload.subtotal || 0
        state.shipping = payload.shipping || 0
        state.tax = payload.tax || 0
        state.total = payload.total || 0
        state.itemCount = payload.itemCount || 0
        state.isAuthenticated = true
        // Clear localStorage cart
        localStorage.removeItem('cart')
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Add to Cart
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false
        console.log('🛒 REDUCER: action.payload:', action.payload)
        const payload = action.payload?.data || action.payload || {}
        console.log('🛒 REDUCER: extracted payload:', payload)
        state.items = payload.items || []
        state.subtotal = payload.subtotal || 0
        state.shipping = payload.shipping || 0
        state.tax = payload.tax || 0
        state.total = payload.total || 0
        state.itemCount = payload.itemCount || 0
      })
      .addCase(addToCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Update Cart Item
    builder
      .addCase(updateCartItemAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.loading = false
        console.log('🛒 UPDATE REDUCER: action.payload:', action.payload)
        const payload = action.payload?.data || action.payload || {}
        state.items = payload.items || []
        state.subtotal = payload.subtotal || 0
        state.shipping = payload.shipping || 0
        state.tax = payload.tax || 0
        state.total = payload.total || 0
        state.itemCount = payload.itemCount || 0
      })
      .addCase(updateCartItemAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Remove from Cart
    builder
      .addCase(removeFromCartAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false
        console.log('🛒 REMOVE REDUCER: action.payload:', action.payload)
        const payload = action.payload?.data || action.payload || {}
        state.items = payload.items || []
        state.subtotal = payload.subtotal || 0
        state.shipping = payload.shipping || 0
        state.tax = payload.tax || 0
        state.total = payload.total || 0
        state.itemCount = payload.itemCount || 0
      })
      .addCase(removeFromCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Clear Cart
    builder
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.loading = false
        state.items = []
        state.subtotal = 0
        state.shipping = 0
        state.tax = 0
        state.total = 0
        state.itemCount = 0
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

    // Sync Cart
    builder
      .addCase(syncCartAsync.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(syncCartAsync.fulfilled, (state, action) => {
        state.loading = false
        const payload = action.payload || {}
        state.items = payload.items || []
        state.subtotal = payload.subtotal || 0
        state.shipping = payload.shipping || 0
        state.tax = payload.tax || 0
        state.total = payload.total || 0
        state.itemCount = payload.itemCount || 0
        state.isAuthenticated = true
        // Clear localStorage after sync
        localStorage.removeItem('cart')
      })
      .addCase(syncCartAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

// Listen for auth logout action to clear cart
export const handleLogout = () => (dispatch) => {
  dispatch(clearCart())
}

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
  setAuthenticatedCart
} = cartSlice.actions

export default cartSlice.reducer
