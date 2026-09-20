
const express = require("express");

const router = express.Router();

const {
  createContactMessage,
  getContactMessages
} = require("../controllers/contactController");

const authMiddleware = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

const contactValidation = require("../validations/contact.validation");

const validation = require("../middlewares/validation.middleware");

// Public

router.post(
  "/",
  contactValidation,
  validation,
  createContactMessage
);

// Admin only

router.get(
  "/",
  authMiddleware,
  authorize("Admin"),
  getContactMessages
);

module.exports = router;

