const express = require("express");

const router = express.Router();

const {
  createOffer,
  getOffers,
  updateOffer,
  deleteOffer
} = require("../controllers/offerController");

const authMiddleware = require("../middlewares/auth.middleware");

const offerValidation = require("../validations/offer.validation");

const validation = require("../middlewares/validation.middleware");

router.get("/", getOffers);

router.post(
  "/",
  offerValidation,
  validation,
  authMiddleware,
  createOffer
);

router.put(
  "/:id",
  offerValidation,
  validation,
  authMiddleware,
  updateOffer
);

router.delete(
  "/:id",
  authMiddleware,
  deleteOffer
);

module.exports = router;