import { createSlice } from "@reduxjs/toolkit";

const savedWishlist = localStorage.getItem("shoplyWishlist");

const initialState = {
  items: savedWishlist ? JSON.parse(savedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
      }

      localStorage.setItem(
        "shoplyWishlist",
        JSON.stringify(state.items)
      );
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        "shoplyWishlist",
        JSON.stringify(state.items)
      );
    },

    toggleWishlist: (state, action) => {
      const exists = state.items.some(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem(
        "shoplyWishlist",
        JSON.stringify(state.items)
      );
    },

    clearWishlist: (state) => {
      state.items = [];

      localStorage.removeItem("shoplyWishlist");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;