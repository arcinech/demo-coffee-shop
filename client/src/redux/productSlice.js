import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    reducer(state, action) {
      state.product.push(action.payload);
    },
    addProducts(state, action) {
      state.product.push(action.payload);
    },
  },
});

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('/api/products', options)
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => err.message);
    return response;
  },
);

export const allProducts = (state) => state.product.products;

export default productSlice;
