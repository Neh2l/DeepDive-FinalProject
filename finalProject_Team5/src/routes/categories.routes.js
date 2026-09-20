
const express = require("express");

const router = express.Router();

const category = require("../controllers/categories.controller");

const categoryValidation = require("../validations/category.validation");

const validation = require("../middlewares/validation.middleware");

const authentication = require("../middlewares/auth.middleware");

const authorization = require("../middlewares/role.middleware");

router.post(
    "/",
    categoryValidation,
    validation,
    authentication,
    authorization("Admin"),
    category.createCategory
);

router.get("/", category.getCategories);

router.patch(
    "/:categoryId",
    categoryValidation,
    validation,
    authentication,
    authorization("Admin"),
    category.updateCategory
);

router.delete(
    "/:categoryId",
    authentication,
    authorization("Admin"),
    category.deleteCategory
);

module.exports = router;

