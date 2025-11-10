import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api'

// Async thunks
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params = {}, { rejectWithValue }) => {
    try {
      const { page = 1, limit = 12, category, featured, search, sort } = params
      
      const queryParams = new URLSearchParams()
      if (page) queryParams.append('page', page)
      if (limit) queryParams.append('limit', limit)
      if (category) queryParams.append('category', category)
      if (featured) queryParams.append('featured', 'true')
      if (search) queryParams.append('search', search)
      if (sort) queryParams.append('sort', sort)
      
      const response = await api.get(`/products?${queryParams.toString()}`)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products')
    }
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/products/${productId}`)
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product')
    }
  }
)

export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/products?featured=true&limit=8')
      return response // api.js already returns response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch featured products')
    }
  }
)

const initialState = {
  products: [],
  featuredProducts: [],
  selectedProduct: null,
  filters: {
    category: '',
    search: '',
    sort: '-createdAt',
    featured: false,
    page: 1,
    limit: 12
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
    pages: 0
  },
  loading: false,
  error: null
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
      if (action.payload.category !== undefined || action.payload.search !== undefined || action.payload.featured !== undefined) {
        state.filters.page = 1 // Reset to first page when filters change
      }
    },
    clearFilters: (state) => {
      state.filters = {
        category: '',
        search: '',
        sort: '-createdAt',
        featured: false,
        page: 1,
        limit: 12
      }
    },
    setPage: (state, action) => {
      state.filters.page = action.payload
    },
    clearCurrentProduct: (state) => {
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    // Fetch Products
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false
        state.products = action.payload.data || []
        state.pagination = action.payload.pagination || state.pagination
        state.error = null
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Fetch Product by ID
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload.data
        state.error = null
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
    
    // Fetch Featured Products
    builder
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false
        state.featuredProducts = action.payload.data
        state.error = null
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { setFilters, clearFilters, setPage, clearCurrentProduct } = productsSlice.actions
export default productsSlice.reducer
