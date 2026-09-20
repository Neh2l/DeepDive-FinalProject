const express = require("express");

const router = express.Router();

const {
  register,
  verifyEmail,
  resendVerificationCode,
  login,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller");

const userValidation = require("../validations/user.validation");
const validationMiddleware = require("../middlewares/validation.middleware");

router.post(
  "/register",
  userValidation,
  validationMiddleware,
  register
);

router.post(
  "/resend-verification",
  resendVerificationCode
);
router.post("/verify-email", verifyEmail);

router.post("/login", login);

// Forgot Password

router.post("/forgot-password", forgotPassword);

// Reset Password

router.post("/reset-password/:token", resetPassword);

module.exports = router;

