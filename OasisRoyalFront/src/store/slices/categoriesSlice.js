import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/categories')
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories')
    }
  }
)

export const fetchCategoryById = createAsyncThunk(
  'categories/fetchCategoryById',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/categories/${categoryId}`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch category')
    }
  }
)

const initialState = {
  items: [],
  currentCategory: null,
  loading: false,
  error: null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCurrentCategory: (state) => {
      state.currentCategory = null
    }
  },
  extraReducers: (builder) => {
    // Fetch Categories
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false
        state.items = action.payload
        state.error = null
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Fetch Category by ID
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false
        state.currentCategory = action.payload
        state.error = null
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearCurrentCategory } = categoriesSlice.actions
export default categoriesSlice.reducer
