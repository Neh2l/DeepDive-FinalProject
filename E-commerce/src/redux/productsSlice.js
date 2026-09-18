import { createSlice } from "@reduxjs/toolkit";

const defaultProducts = [
  {
    id: 1,
    title: "Premium Laptop",
    category: "Computers",
    price: 1299,
    stock: 24,
    image: "/Lab.jpg",
    description: "Powerful laptop designed for work, study and creativity.",
    rating: 4.8,
  },
  {
    id: 2,
    title: "Wireless Headphones",
    category: "Electronics",
    price: 149,
    stock: 42,
    image: "/headphone.jpg",
    description: "Premium wireless headphones with immersive sound.",
    rating: 4.7,
  },
  {
    id: 3,
    title: "Classic Smart Watch",
    category: "Wearables",
    price: 229,
    stock: 18,
    image: "/watch.jpg",
    description: "Elegant smart watch with fitness and health tracking.",
    rating: 4.6,
  },
  {
    id: 4,
    title: "Professional Camera",
    category: "Cameras",
    price: 899,
    stock: 9,
    image: "/camera.jpg",
    description: "High-resolution camera for professional photography.",
    rating: 4.9,
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    category: "Accessories",
    price: 119,
    stock: 31,
    image: "/Keyboard.jpg",
    description: "Premium mechanical keyboard with a satisfying typing experience.",
    rating: 4.8,
  },
];

function getStoredProducts() {
  try {
    const savedProducts = localStorage.getItem("shoplyProducts");

    if (!savedProducts) {
      return defaultProducts;
    }

    const parsedProducts = JSON.parse(savedProducts);

    return Array.isArray(parsedProducts) && parsedProducts.length > 0
      ? parsedProducts
      : defaultProducts;
  } catch {
    return defaultProducts;
  }
}

const initialState = {
  items: getStoredProducts(),
  status: "idle",
};

const saveProducts = (products) => {
  localStorage.setItem("shoplyProducts", JSON.stringify(products));
};

const productsSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
        price: Number(action.payload.price),
        stock: Number(action.payload.stock),
        rating: Number(action.payload.rating || 4.5),
      };

      state.items.unshift(newProduct);

      saveProducts(state.items);
    },

    updateProduct: (state, action) => {
      const index = state.items.findIndex(
        (product) => product.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          price: Number(action.payload.price),
          stock: Number(action.payload.stock),
        };

        saveProducts(state.items);
      }
    },

    deleteProduct: (state, action) => {
      state.items = state.items.filter(
        (product) => product.id !== action.payload
      );

      saveProducts(state.items);
    },

    setProducts: (state, action) => {
      state.items = action.payload;

      saveProducts(state.items);
    },

    clearProducts: (state) => {
      state.items = [];

      localStorage.removeItem("shoplyProducts");
    },

    resetProducts: (state) => {
      state.items = defaultProducts;

      saveProducts(state.items);
    },
  },
});

export const {
  addProduct,
  updateProduct,
  deleteProduct,
  setProducts,
  clearProducts,
  resetProducts,
} = productsSlice.actions;

export default productsSlice.reducer;