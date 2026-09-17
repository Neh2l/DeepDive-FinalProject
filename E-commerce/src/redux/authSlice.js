import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  registerUser as registerUserApi,
  verifyEmail as verifyEmailApi,
  loginUser as loginUserApi,
} from "../Apis/authApi";

// REGISTER
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

// VERIFY EMAIL
export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async (verificationData, { rejectWithValue }) => {
    try {
      const data = await verifyEmailApi(verificationData);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Verification failed. Please try again."
      );
    }
  }
);

// LOGIN
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

const savedUser = localStorage.getItem("shoplyUser");
const savedToken = localStorage.getItem("token");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  token: savedToken || null,
  isLoggedIn: !!savedToken,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
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

    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;

      localStorage.removeItem("shoplyUser");
      localStorage.removeItem("token");
    },

    clearAuthError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // =========================
      // REGISTER
      // =========================

      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        // User must verify email first
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // VERIFY EMAIL
      // =========================

      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

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

      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // LOGIN
      // =========================

      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

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

export const {
  updateUser,
  logoutUser,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;