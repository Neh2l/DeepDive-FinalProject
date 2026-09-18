const express = require("express");

const router = express.Router();

const {
  register,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/verify-email", verifyEmail);

router.post("/login", login);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);

module.exports = router;