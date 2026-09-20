const { body } = require("express-validator");

const pendingUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Please provide a valid email"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters"),

    body("verificationCode")
        .trim()
        .notEmpty()
        .withMessage("Verification code is required"),

    body("verificationCodeExpires")
        .notEmpty()
        .withMessage("Verification code expiration is required")
        .isISO8601()
        .withMessage("Verification code expiration must be a valid date"),
];

module.exports = pendingUserValidation;