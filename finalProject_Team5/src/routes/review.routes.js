const express = require("express");

const {
  createReview,
  getApprovedReviews,
  getPendingReviews,
  approveReview,
  rejectReview,
} = require("../controllers/review.controller");

const authMiddleware = require("../middlewares/auth.middleware");
const authorize = require("../middlewares/role.middleware");

const router = express.Router();

router.get("/", getApprovedReviews);

router.post("/", authMiddleware, createReview);

router.get(
  "/admin/pending",
  authMiddleware,
  authorize("Admin"),
  getPendingReviews
);

router.patch(
  "/admin/:id/approve",
  authMiddleware,
  authorize("Admin"),
  approveReview
);

router.patch(
  "/admin/:id/reject",
  authMiddleware,
  authorize("Admin"),
  rejectReview
);

module.exports = router;