const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} = require("../controllers/productController");

const authMiddleware = require("../middlewares/auth.middleware");

const authorize = require("../middlewares/role.middleware");

const upload = require("../middlewares/upload.middleware");

const productValidation = require("../validations/product.validation");

const validation = require("../middlewares/validation.middleware");

// Public

router.get("/", getAllProducts);

router.get("/:id", getProductById);

// Admin only

router.post(
    "/",
    productValidation,
    validation,
    authMiddleware,
    authorize("Admin"),
    upload.array("images", 5),
    createProduct
);

router.put(
    "/:id",
    productValidation,
    validation,
    authMiddleware,
    authorize("Admin"),
    upload.array("images", 5),
    updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("Admin"),
    deleteProduct
);

module.exports = router;