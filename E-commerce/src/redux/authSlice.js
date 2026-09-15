import { createSlice } from "@reduxjs/toolkit";

const ADMIN_EMAIL = "ahmed123@gmail.com";

const ADMIN_PASSWORD = "123456";

const getStoredUser = () => {
  try {
    const savedUser = localStorage.getItem("shoplyUser");

    return savedUser ? JSON.parse(savedUser) : null;
  } catch {
    localStorage.removeItem("shoplyUser");
    return null;
  }
};

const getStoredUsers = () => {
  try {
    const savedUsers = localStorage.getItem("shoplyUsers");

    if (!savedUsers) {
      return [];
    }

    const parsedUsers = JSON.parse(savedUsers);

    return Array.isArray(parsedUsers) ? parsedUsers : [];
  } catch {
    localStorage.removeItem("shoplyUsers");
    return [];
  }
};

/*
========================================
MIGRATE OLD USER
========================================

لو كان عندك user متسجل بالنظام القديم
shoplyUser
هنضيفه تلقائيًا إلى
shoplyUsers
*/

const getInitialUsers = () => {
  const users = getStoredUsers();

  const oldUser = getStoredUser();

  if (
    oldUser &&
    oldUser.role !== "admin" &&
    oldUser.email
  ) {
    const exists = users.some(
      (user) =>
        user.email?.toLowerCase() ===
        oldUser.email?.toLowerCase()
    );

    if (!exists) {
      users.push({
        ...oldUser,
        role: "user",
      });

      localStorage.setItem(
        "shoplyUsers",
        JSON.stringify(users)
      );
    }
  }

  return users;
};

const initialState = {
  user: getStoredUser(),

  isLoggedIn:
    localStorage.getItem("shoplyLoggedIn") === "true",

  users: getInitialUsers(),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    /*
    ========================================
    REGISTER
    ========================================
    */

    registerUser: (state, action) => {
      const newUser = {
        name: action.payload.name.trim(),

        email: action.payload.email
          .trim()
          .toLowerCase(),

        password: action.payload.password,

        role: "user",
      };

      const existingUser = state.users.find(
        (user) =>
          user.email?.toLowerCase() ===
          newUser.email.toLowerCase()
      );

      if (!existingUser) {
        state.users.push(newUser);
      }

      /*
      المستخدم الجديد يبقى Logged In
      */

      state.user = newUser;

      state.isLoggedIn = true;

      /*
      Save ALL users
      */

      localStorage.setItem(
        "shoplyUsers",
        JSON.stringify(state.users)
      );

      /*
      Save CURRENT logged-in user
      */

      localStorage.setItem(
        "shoplyUser",
        JSON.stringify(newUser)
      );

      localStorage.setItem(
        "shoplyLoggedIn",
        "true"
      );
    },

    /*
    ========================================
    LOGIN
    ========================================
    */

    loginUser: (state, action) => {
      const loggedUser = {
        ...action.payload,

        email: action.payload.email
          ?.trim()
          .toLowerCase(),
      };

      state.user = loggedUser;

      state.isLoggedIn = true;

      /*
      لو Admin
      مش هنضيفه للعملاء
      */

      if (loggedUser.role !== "admin") {
        const existingIndex = state.users.findIndex(
          (user) =>
            user.email?.toLowerCase() ===
            loggedUser.email?.toLowerCase()
        );

        if (existingIndex === -1) {
          state.users.push(loggedUser);
        } else {
          state.users[existingIndex] = loggedUser;
        }

        localStorage.setItem(
          "shoplyUsers",
          JSON.stringify(state.users)
        );
      }

      localStorage.setItem(
        "shoplyUser",
        JSON.stringify(loggedUser)
      );

      localStorage.setItem(
        "shoplyLoggedIn",
        "true"
      );
    },

    /*
    ========================================
    UPDATE USER
    ========================================
    */

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

      /*
      Update customer inside users array
      */

      if (state.user.role !== "admin") {
        const index = state.users.findIndex(
          (user) =>
            user.email?.toLowerCase() ===
            state.user.email?.toLowerCase()
        );

        if (index !== -1) {
          state.users[index] = state.user;
        }

        localStorage.setItem(
          "shoplyUsers",
          JSON.stringify(state.users)
        );
      }
    },

    /*
    ========================================
    LOGOUT
    ========================================
    */

    logoutUser: (state) => {
      state.user = null;

      state.isLoggedIn = false;

      /*
      IMPORTANT:
      We DON'T delete shoplyUsers
      */

      localStorage.removeItem("shoplyUser");

      localStorage.removeItem(
        "shoplyLoggedIn"
      );
    },
  },
});

export const {
  registerUser,
  loginUser,
  updateUser,
  logoutUser,
} = authSlice.actions;

export default authSlice.reducer;