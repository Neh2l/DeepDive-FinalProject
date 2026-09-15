import { createSlice } from "@reduxjs/toolkit";

const savedCart = localStorage.getItem("shoplyCart");

const initialState = {
  items: savedCart ? JSON.parse(savedCart) : [],
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;

      const existingProduct = state.items.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }

      localStorage.setItem(
        "shoplyCart",
        JSON.stringify(state.items)
      );
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        "shoplyCart",
        JSON.stringify(state.items)
      );
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem(
        "shoplyCart",
        JSON.stringify(state.items)
      );
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.id === action.payload
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      localStorage.setItem(
        "shoplyCart",
        JSON.stringify(state.items)
      );
    },

    clearCart: (state) => {
      state.items = [];

      localStorage.removeItem("shoplyCart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;