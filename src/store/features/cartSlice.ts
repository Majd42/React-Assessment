import { createSlice } from "@reduxjs/toolkit";
import { cartStateTypes } from "../../types";

const initialState: cartStateTypes = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.categoryItem.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload.categoryItem, quantity: 1 });
      }

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item) {
        item.quantity = quantity;

        if (item.quantity <= 0) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }
      }

      state.totalPrice = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
