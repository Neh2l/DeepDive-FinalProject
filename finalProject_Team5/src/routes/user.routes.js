const express = require("express");

const {
  getProfile,
  updateProfile,
  getAllUsers,
} = require("../controllers/user.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const router = express.Router();

router.get(
  "/",
  authMiddleware,
  authorize("Admin"),
  getAllUsers
);

router.get(
  "/me",
  authMiddleware,
  getProfile
);

router.patch(
  "/me",
  authMiddleware,
  updateProfile
);

module.exports = router;