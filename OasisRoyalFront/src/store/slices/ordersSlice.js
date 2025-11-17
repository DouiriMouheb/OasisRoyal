import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Async thunks
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await api.post('/orders', orderData)
      console.log('📦 CREATE ORDER: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create order')
    }
  }
)

export const fetchMyOrders = createAsyncThunk(
  'orders/fetchMyOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/orders/me')
      console.log('📦 FETCH MY ORDERS: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/orders/${orderId}`)
      console.log('📦 FETCH ORDER BY ID: response:', response)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch order')
    }
  }
)

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
  createLoading: false,
  createError: null
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null
    },
    clearCreateError: (state) => {
      state.createError = null
    }
  },
  extraReducers: (builder) => {
    // Create Order
    builder
      .addCase(createOrder.pending, (state) => {
        state.createLoading = true
        state.createError = null
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createLoading = false
        console.log('📦 CREATE ORDER REDUCER: action.payload:', action.payload)
        const order = action.payload?.data || action.payload
        state.currentOrder = order
        // Only add to orders list if order exists and has _id
        if (order && order._id) {
          state.orders.unshift(order)
        }
        state.createError = null
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createLoading = false
        state.createError = action.payload
      })
    
    // Fetch My Orders
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.loading = false
        console.log('📦 FETCH MY ORDERS REDUCER: action.payload:', action.payload)
        const payload = action.payload?.data || action.payload || []
        state.orders = Array.isArray(payload) ? payload : []
        state.error = null
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Fetch Order by ID
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false
        console.log('📦 FETCH ORDER BY ID REDUCER: action.payload:', action.payload)
        state.currentOrder = action.payload?.data || action.payload
        state.error = null
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCurrentOrder, clearCreateError } = ordersSlice.actions
export default ordersSlice.reducer
