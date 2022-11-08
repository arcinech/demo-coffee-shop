import { configureStore } from '@reduxjs/toolkit';
import { orderReducer } from './orderSlice';
import { cartReducer } from './cartSlice';
import { productReducer } from './productSlice';

export const store = configureStore({
  reducer: {
    order: orderReducer,
    cart: cartReducer,
    product: productReducer,
  },
});
