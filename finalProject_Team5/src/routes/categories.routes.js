const express=require('express');
const router = express.Router();
const category=require('../controllers/categories.controller');
const {body}=require("express-validator");
const validation = require("../middlewares/validation.middleware");
const authentication = require("../middlewares/auth.middleware");
const authorization = require("../middlewares/role.middleware");

router.post("/",body("name")
                .notEmpty()
                .withMessage("name is require")
                .isLength({min:3})
                .withMessage("name at least 3 length")
                ,validation,authentication,authorization("Admin"), category.createCategory);
router.get("/", category.getCategories);
router.patch("/:categoryId",body("name")
                .notEmpty()
                .withMessage("name is require")
                .isLength({min:3})
                .withMessage("name at least 3 length")
                ,validation,authentication,authorization("Admin"), category.updateCategory);
router.delete("/:categoryId",authentication,authorization("Admin"), category.deleteCategory);

module.exports=router;