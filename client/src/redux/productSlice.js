import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { SITE_URL } from '../config/config';

const initialState = {
  products: [],
  loading: 'idle' | 'pending' | 'succeeded' | 'failed',
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(`${SITE_URL}/api/products`, options)
      .then((res) => res.json())
      .catch((err) => err.message);
    return response;
  },
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.loading = 'succeeded';
        state.products = payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export const allProducts = (state) => state.product.products;
export const findProduct = (state, id) =>
  state.product.products.find((product) => id === product.id);

export const productReducer = productSlice.reducer;
