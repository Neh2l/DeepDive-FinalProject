const express = require("express");

const {
  getProfile,
  updateProfile,
  changePassword
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

router.get("/me", authMiddleware, getProfile);
router.patch("/me", authMiddleware, updateProfile);

router.patch("/change-password", authMiddleware, changePassword);

module.exports = router;