const { body } = require("express-validator");

const CategoryValidation=[
    body("name")
        .notEmpty()
        .withMessage("Title is required")
        .trim(),

]
module.exports=CategoryValidation;