
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUser as registerUserApi,
  loginUser as loginUserApi,
} from "../Apis/authApi";


// ==================== REGISTER ====================

export const registerUser = createAsyncThunk(
  "auth/registerUser",

  async (userData, { rejectWithValue }) => {
    try {
      const data = await registerUserApi(userData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }
);


// ==================== LOGIN ====================

export const loginUser = createAsyncThunk(
  "auth/loginUser",

  async (userData, { rejectWithValue }) => {
    try {
      const data = await loginUserApi(userData);

      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  }
);


// ==================== INITIAL STATE ====================

const savedUser = localStorage.getItem("shoplyUser");
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,

  token: savedToken || null,

  isLoggedIn: !!savedToken,

  loading: false,

  error: null,
};


// ==================== SLICE ====================

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {

    // ==================== UPDATE USER ====================

    updateUser: (state, action) => {
      if (!state.user) return;

      state.user = {
        ...state.user,
        ...action.payload,
      };

      localStorage.setItem(
        "shoplyUser",
        JSON.stringify(state.user)
      );
    },


    // ==================== LOGOUT ====================

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;

      localStorage.removeItem("shoplyUser");
      localStorage.removeItem("token");
    },


    // ==================== CLEAR ERROR ====================

    clearAuthError: (state) => {
      state.error = null;
    },
  },


  // ==================== ASYNC ACTIONS ====================

  extraReducers: (builder) => {

    // ==================== REGISTER ====================

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;

        localStorage.setItem(
          "shoplyUser",
          JSON.stringify(action.payload.user)
        );

        localStorage.setItem(
          "token",
          action.payload.token
        );
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });


    // ==================== LOGIN ====================

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;

        localStorage.setItem(
          "shoplyUser",
          JSON.stringify(action.payload.user)
        );

        localStorage.setItem(
          "token",
          action.payload.token
        );
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


// ==================== EXPORT ACTIONS ====================

export const {
  updateUser,
  logoutUser,
  clearAuthError,
} = authSlice.actions;


export default authSlice.reducer;
