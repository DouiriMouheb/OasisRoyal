import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Async thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', credentials)
      const { data } = response.data // Backend returns { success, data: { user, token }, message }
      // Store token and user in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed')
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register', userData)
      const { data } = response.data // Backend returns { success, data: { user, token }, message }
      // Store token and user in localStorage
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      return data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed')
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'auth/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile')
      return response.data
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
      // Update user in localStorage
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
      const updatedUser = { ...currentUser, ...response.data }
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return response.data
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
        state.user = { ...state.user, ...action.payload }
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
        state.user = { ...state.user, ...action.payload }
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
