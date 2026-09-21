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
    authMiddleware,
    authorize("Admin"),
    upload.array("images", 5),
    productValidation,
    validation,
    createProduct
);

router.put(
    "/:id",
    authMiddleware,
    authorize("Admin"),
    upload.array("images", 5),
    productValidation,
    validation,
    updateProduct
);

router.delete(
    "/:id",
    authMiddleware,
    authorize("Admin"),
    deleteProduct
);

module.exports = router;