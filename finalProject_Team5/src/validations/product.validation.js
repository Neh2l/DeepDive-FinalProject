const { body } = require("express-validator");

const productValidation = [
    body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

    body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

    body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a number greater than or equal to 0"),

    body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be an integer greater than or equal to 0"),

    body("rate")
    .optional()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rate must be between 0 and 5"),

    body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

    body("images")
    .optional()
    .isArray()
    .withMessage("Images must be an array"),

    body("images.*.url")
    .if(body("images").exists())
    .notEmpty()
    .withMessage("Image URL is required")
    .isURL()
    .withMessage("Image URL must be a valid URL"),

    body("images.*.public_id")
    .if(body("images").exists())
    .trim()
    .notEmpty()
    .withMessage("Image public_id is required"),
];

module.exports = productValidation;