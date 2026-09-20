const { body } = require("express-validator");

const contactValidation = [
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

    body("message")
        .trim()
        .notEmpty()
        .withMessage("Message is required"),
];

module.exports = contactValidation;