const Product = require('../models/productModel');
const Category = require("../models/category.model");
const cloudinary = require("../config/cloudinary");

exports.createProduct = async (req, res) => {
  try {
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(404).json({
        status: "fail",
        message: "Category not found",
      });
    }

    const images = req.files
      ? req.files.map((file) => ({
          url: file.path,
          public_id: file.filename,
        }))
      : [];

    const newProduct = new Product({
      ...req.body,
      images,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, count: products.length, data: products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let images = product.images;

    // لو المستخدم رفع صور جديدة
    if (req.files && req.files.length > 0) {

      // حذف الصور القديمة من Cloudinary
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          await cloudinary.uploader.destroy(image.public_id);
        }
      }

      // الصور الجديدة
      images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
    }

    product.name = req.body.name ?? product.name;
    product.description = req.body.description ?? product.description;
    product.price = req.body.price ?? product.price;
    product.discountPrice =
      req.body.discountPrice ?? product.discountPrice;
    product.category = req.body.category ?? product.category;
    product.branches = req.body.branches ?? product.branches;
    product.colors = req.body.colors ?? product.colors;
    product.sizes = req.body.sizes ?? product.sizes;

    product.images = images;

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      data: updatedProduct,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.images && product.images.length > 0) {
      for (const image of product.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};