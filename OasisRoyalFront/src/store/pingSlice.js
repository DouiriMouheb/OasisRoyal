import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPing = createAsyncThunk('ping/fetch', async () => {
  const res = await fetch('/api/ping')
  if (!res.ok) throw new Error('network')
  const data = await res.json()
  return data.message
})

const pingSlice = createSlice({
  name: 'ping',
  initialState: { message: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPing.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPing.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.message = action.payload
      })
      .addCase(fetchPing.rejected, (state) => {
        state.status = 'failed'
        state.message = null
      })
  }
})

export default pingSlice.reducer
