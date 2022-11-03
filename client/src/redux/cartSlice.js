import { createSlice } from '@reduxjs/toolkit';

const items =
  localStorage.getItem('cartItems') !== null
    ? JSON.parse(localStorage.getItem('cartItems'))
    : [];

const totalAmount =
  localStorage.getItem('totalAmount') !== null
    ? JSON.parse(localStorage.getItem('totalAmount'))
    : 0;

const totalQuantity =
  localStorage.getItem('totalQuantity') !== null
    ? JSON.parse(localStorage.getItem('totalQuantity'))
    : 0;

const localStorageFunction = (items, totalAmount, totalQuantity) => {
  localStorage.setItem('cartItems', JSON.stringify(items));
  localStorage.setItem('totalAmount', JSON.stringify(totalAmount));
  localStorage.setItem('totalQuantity', JSON.stringify(totalQuantity));
};

const initialState = {
  cartItems: items,
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reducer(state, action) {
      state.cart.push(action.payload);
    },

    // add item to cart
    addItem(state, action) {
      const { id, name, price, quantity } = action.payload;
      const existingItem = state.cartItems((item) => item.id === id);
      state.totalQuantity = state.totalQuantity + quantity;

      if (!existingItem) {
        state.cartItems.push({
          id: id,
          name: name,
          price: price,
          quantity: quantity,
        });
      } else {
        existingItem.quantity = existingItem.quantity + quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0,
      );

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    // remove item from cart

    removeItem(state, action) {
      const { id, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem.quantity === quantity) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity = existingItem.quantity - quantity;
      }

      state.totalQuantity = state.totalQuantity - quantity;
      state.totalAmount = state.cartItems.reduce(
        (total, item) => total - Number(item.price) * Number(item.quantity),
        0,
      );

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    updateItem(state, action) {
      const { id, notes, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      existingItem.notes = notes;
      existingItem.quantity = quantity;

      state.totalQuantity = state.cartItems.reduce(
        (total, item) => total + Number(item.quantity),
        0,
      );

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total - Number(item.price) * Number(item.quantity),
        0,
      );

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    deleteItem(state, action) {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity = state.totalQuantity - existingItem.quantity;
      state.totalAmount = state.totalAmount - existingItem.price;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    clearCart(state) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorageFunction([], 0, 0);
    },
  },
});

export const { addItem, removeItem, updateItem, deleteItem } =
  cartSlice.actions;
export const allItems = (state) => state.cart.cartItems;
