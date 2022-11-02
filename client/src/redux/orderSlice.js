import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  order: {},
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reducer(state, action) {
      state.order.push(action.payload);
    },
  },
});

export const post = createAsyncThunk('cart/fetchCart', async (data) => {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credials: true,
    body: JSON.stringify(data),
  };

  const response = await fetch('/api/order', options).then((res) => res.json());
  return response.data;
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credials: true,
  };
  const response = await fetch('/orders/all', options).then((res) =>
    res.json(),
  );
  return response.data;
});
