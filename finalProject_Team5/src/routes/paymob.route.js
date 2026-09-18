const express = require("express");

const {
    createPaymentIntention,
    paymobWebhook
} = require("../controllers/paymob.controller");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();


/* =========================================================
   CREATE PAYMENT INTENTION
========================================================= */

router.post(
    "/create-intention",
    authMiddleware,
    createPaymentIntention
);


/* =========================================================
   PAYMOB WEBHOOK
========================================================= */

router.post(
    "/webhook",
    paymobWebhook
);


module.exports = router;