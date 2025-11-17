import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'
import { syncCartAsync } from './cartSlice'

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue, dispatch }) => {
    try {
      console.log('🔐 LOGIN: Sending credentials:', { email: credentials.email })
      const response = await api.post('/users/login', credentials)
      console.log('🔐 LOGIN: Raw API response:', response)
      // api.js returns response.data, which is { success, data: { _id, name, email, role, token }, message }
      // Extract the user data from the data property
      const userData = response.data // This is { _id, name, email, role, token }
      console.log('🔐 LOGIN: Extracted user data:', userData)
      // Store token and user in localStorage
      localStorage.setItem('token', userData.token)
      localStorage.setItem('user', JSON.stringify(userData))
      console.log('🔐 LOGIN: Stored in localStorage')
      
      // Sync cart after successful login
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        const cart = JSON.parse(localCart)
        console.log('🔐 LOGIN: Syncing cart with', cart.items?.length || 0, 'items')
        dispatch(syncCartAsync(cart))
      }
      
      return userData
    } catch (error) {
      console.error('🔐 LOGIN ERROR:', error)
      console.error('🔐 LOGIN ERROR Response:', error.response)
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      console.log('📝 REGISTER: Sending user data:', { ...userData, password: '***' })
      const response = await api.post('/users/register', userData)
      console.log('📝 REGISTER: Raw API response:', response)
      // api.js returns response.data, which is { success, data: { _id, name, email, role, token }, message }
      const userInfo = response.data // This is { _id, name, email, role, token }
      console.log('📝 REGISTER: Extracted user data:', userInfo)
      // Store token and user in localStorage
      localStorage.setItem('token', userInfo.token)
      localStorage.setItem('user', JSON.stringify(userInfo))
      console.log('📝 REGISTER: Stored in localStorage')
      
      // Sync cart after successful registration
      const localCart = localStorage.getItem('cart')
      if (localCart) {
        const cart = JSON.parse(localCart)
        console.log('📝 REGISTER: Syncing cart with', cart.items?.length || 0, 'items')
        dispatch(syncCartAsync(cart))
      }
      
      return userInfo
    } catch (error) {
      console.error('📝 REGISTER ERROR:', error)
      console.error('📝 REGISTER ERROR Response:', error.response)
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile')
      // api.js returns response.data, backend returns { success, data: user }
      // response is { success, data: user }
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile')
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.put('/users/profile', userData)
      // api.js returns response.data, backend returns { success, data: user }
      // response is { success, data: user }
      // Update user in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = { ...currentUser, ...response.data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return response
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile')
    }
  }
)

// Load initial state from localStorage
const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token || null,
  isAuthenticated: !!token,
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('cart')
    },
    clearError: (state) => {
      state.error = null
    },
    setCredentials: (state, action) => {
      state.user = action.payload.user
      state.token = action.payload.token
      state.isAuthenticated = true
      // Save to localStorage
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    }
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        // action.payload is { _id, name, email, role, token }
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        // action.payload is { _id, name, email, role, token }
        state.user = action.payload
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Get Profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false
        // Backend returns { success, data: user }, api.js returns response.data
        state.user = { ...state.user, ...action.payload.data }
        state.error = null
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Update Profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false
        // Backend returns { success, data: user }, api.js returns response.data
        state.user = { ...state.user, ...action.payload.data }
        state.error = null
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { logout, clearError, setCredentials } = authSlice.actions
export default authSlice.reducer
