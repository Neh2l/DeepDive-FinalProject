const { body } = require("express-validator");

const orderValidation = [
    body("items")
        .notEmpty()
        .withMessage("Items are required")
        .isArray({ min: 1 })
        .withMessage("Items must be a non-empty array"),

    body("shippingAddress")
        .trim()
        .notEmpty()
        .withMessage("Shipping address is required"),

    body("paymentMethod")
        .trim()
        .notEmpty()
        .withMessage("Payment method is required"),
];

module.exports = orderValidation;