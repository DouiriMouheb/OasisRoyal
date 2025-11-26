import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Async thunks
export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/stats')
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch dashboard stats')
    }
  }
)

export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/admin/users')
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch users')
    }
  }
)

export const updateUserRole = createAsyncThunk(
  'admin/updateUserRole',
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/role`, { role })
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user role')
    }
  }
)

export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/users/${userId}`, userData)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update user')
    }
  }
)

export const toggleUserStatus = createAsyncThunk(
  'admin/toggleUserStatus',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/users/${userId}/status`)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle user status')
    }
  }
)

export const fetchAllOrders = createAsyncThunk(
  'admin/fetchAllOrders',
  async ({ page = 1, limit = 10, status }, { rejectWithValue }) => {
    try {
      let url = `/orders?page=${page}&limit=${limit}`
      if (status) url += `&status=${status}`
      const response = await api.get(url)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders')
    }
  }
)

export const updateOrderStatus = createAsyncThunk(
  'admin/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/orders/${orderId}/status`, { status })
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update order status')
    }
  }
)

export const markOrderAsPaid = createAsyncThunk(
  'admin/markOrderAsPaid',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.put(`/orders/${orderId}`, { 
        isPaid: true, 
        paidAt: new Date().toISOString() 
      })
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to mark order as paid')
    }
  }
)

export const createProduct = createAsyncThunk(
  'admin/createProduct',
  async (productData, { rejectWithValue }) => {
    try {
      const response = await api.post('/products', productData)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create product')
    }
  }
)

export const updateProduct = createAsyncThunk(
  'admin/updateProduct',
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/products/${productId}`, productData)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update product')
    }
  }
)

export const deleteProduct = createAsyncThunk(
  'admin/deleteProduct',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/products/${productId}`)
      return { productId, ...response }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete product')
    }
  }
)

export const createCategory = createAsyncThunk(
  'admin/createCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await api.post('/categories', categoryData)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create category')
    }
  }
)

export const updateCategory = createAsyncThunk(
  'admin/updateCategory',
  async ({ categoryId, categoryData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/categories/${categoryId}`, categoryData)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update category')
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'admin/deleteCategory',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/categories/${categoryId}`)
      return { categoryId, ...response }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete category')
    }
  }
)

const initialState = {
  // Dashboard
  stats: null,
  statsLoading: false,
  
  // Users
  users: [],
  usersLoading: false,
  
  // Orders
  orders: [],
  ordersPagination: null,
  ordersLoading: false,
  
  // General
  loading: false,
  error: null,
  successMessage: null
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null
    }
  },
  extraReducers: (builder) => {
    // Dashboard Stats
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.statsLoading = true
        state.error = null
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.statsLoading = false
        state.stats = action.payload.data
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.statsLoading = false
        state.error = action.payload
      })
    
    // Fetch All Users
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true
        state.error = null
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false
        state.users = action.payload.data
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersLoading = false
        state.error = action.payload
      })
    
    // Update User Role
    builder
      .addCase(updateUserRole.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload.data
        const index = state.users.findIndex(u => u._id === updatedUser._id)
        if (index !== -1) {
          state.users[index] = updatedUser
        }
        state.successMessage = action.payload.message
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Update User
      .addCase(updateUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false
        const index = state.users.findIndex(u => u._id === action.payload.data._id)
        if (index !== -1) {
          state.users[index] = action.payload.data
        }
        state.successMessage = action.payload.message
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Toggle User Status
    builder
      .addCase(toggleUserStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(toggleUserStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedUser = action.payload.data
        const index = state.users.findIndex(u => u._id === updatedUser._id)
        if (index !== -1) {
          state.users[index] = updatedUser
        }
        state.successMessage = action.payload.message
      })
      .addCase(toggleUserStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Fetch All Orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.ordersLoading = true
        state.error = null
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.ordersLoading = false
        state.orders = action.payload.data
        state.ordersPagination = action.payload.pagination
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.ordersLoading = false
        state.error = action.payload
      })
    
    // Update Order Status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrder = action.payload.data
        const index = state.orders.findIndex(o => o._id === updatedOrder._id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
        state.successMessage = action.payload.message
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Mark Order as Paid
    builder
      .addCase(markOrderAsPaid.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(markOrderAsPaid.fulfilled, (state, action) => {
        state.loading = false
        const updatedOrder = action.payload.data
        const index = state.orders.findIndex(o => o._id === updatedOrder._id)
        if (index !== -1) {
          state.orders[index] = updatedOrder
        }
        state.successMessage = 'Order marked as paid successfully'
      })
      .addCase(markOrderAsPaid.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Create Product
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Update Product
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Delete Product
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = 'Product deleted successfully'
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Create Category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Update Category
    builder
      .addCase(updateCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = action.payload.message
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Delete Category
    builder
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false
        state.successMessage = 'Category deleted successfully'
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError, clearSuccessMessage } = adminSlice.actions
export default adminSlice.reducer
