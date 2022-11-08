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
  totalAmount: totalAmount,
  totalQuantity: totalQuantity,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    reducer(state, action) {
      state.cart.push(action.payload);
    },

    // add item to cart
    addToCart(state, action) {
      const { id, price, quantity } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (!existingItem) {
        state.cartItems.push({
          id: id,
          price: price,
          quantity: quantity,
          notes: '',
        });
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }

          return item;
        });
      }

      state.totalQuantity = state.totalQuantity + quantity;
      state.totalAmount = state.totalAmount + price * quantity;

      localStorageFunction(
        state.cartItems,
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

      state.totalQuantity = state.cartItems.forEach(
        (item) => (state.totalQuantity += item.quantity),
      );
      state.totalAmount = state.cartItems.forEach(
        (item) => (state.totalAmount += item.price * item.quantity),
      );

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    updateItem(state, action) {
      const { id, notes, quantity } = action.payload;
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            notes: notes,
            quantity: quantity,
          };
        }
        return item;
      });

      state.totalQuantity = state.cartItems.forEach(
        (item) => (state.totalQuantity += item.quantity),
      );
      state.totalAmount = state.cartItems.forEach(
        (item) => (state.totalAmount += item.price * item.quantity),
      );

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    deleteItem(state, action) {
      const { id } = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id);

      if (state.cartItems.length > 0) {
        state.totalQuantity = state.cartItems.forEach(
          (item) => (state.totalQuantity += item.quantity),
        );
        state.totalAmount = state.cartItems.forEach(
          (item) => (state.totalAmount += item.price * item.quantity),
        );
      } else {
        state.totalQuantity = 0;
        state.totalAmount = 0;
      }

      localStorageFunction(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity,
      );
    },

    clearCart(state, action) {
      state.cartItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
      localStorageFunction([], 0, 0);
    },
  },
});

export const { addToCart, removeItem, updateItem, deleteItem, reducer } =
  cartSlice.actions;
export const cartReducer = cartSlice.reducer;
export const allItems = (state) => state.cart.cartItems;
