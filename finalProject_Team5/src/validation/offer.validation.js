const { body } = require("express-validator");

const offerValidation = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Title is required"),

    body("discountPercentage")
        .notEmpty()
        .withMessage("Discount percentage is required")
        .isFloat({ min: 0, max: 100 })
        .withMessage("Discount percentage must be between 0 and 100"),

    body("expiryDate")
        .notEmpty()
        .withMessage("Expiry date is required")
        .isISO8601()
        .withMessage("Expiry date must be a valid date"),
];

module.exports = offerValidation;