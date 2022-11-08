import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  order: {},
  status: 'idle' || 'pending' || 'succeeded' || 'failed',
};

export const postOrder = createAsyncThunk('order/postOrder', async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credials: true,
    body: JSON.stringify(data),
  };

  const response = await fetch(
    'http://localhost:5000/api/orders',
    options,
  ).then((res) => res.json());
  return response;
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(postOrder.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(postOrder.fulfilled, (state, action) => {
        state.order.id = action.payload.id;
        state.status = 'succeeded';
      })
      .addCase(postOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const orderReducer = orderSlice.reducer;
