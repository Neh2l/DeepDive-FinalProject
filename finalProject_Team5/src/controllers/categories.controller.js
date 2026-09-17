const Category = require('../models/category.model');
const Product = require('../models/productModel');
const createCategory = async (req,res)=>{
    try{
        const newCategory = new Category(req.body);
        await newCategory.save();
        res.status(201).json({
            status:"success",
            data:newCategory
        })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};
const getCategories = async (req,res)=>{
    try{
        const query=req.query;
        const page=Number(query.page)||1;
        const limit=Number(query.limit)||10;
        const skip=(page-1)*limit;
        const categories =await Category.find({},{'__v':0}).limit(limit).skip(skip);
        if(categories.length === 0){
            return res.json("There aren't category");
        }
        res.status(200).json({
            status:"success",
            results: categories.length,
            data:categories
        })
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        });
    }
};
const updateCategory=async(req,res)=>{
    try{
        const category = await Category.findByIdAndUpdate(req.params.categoryId,req.body,{new:true,runValidators: true})
        if(!category){
            return res.status(404).json({
                status:"fail",
                message: "Category not found"
            })
        }
        res.status(200).json({
                    status:"success",
                    data:category
                });
    }catch(err){
        res.status(500).json({
            status:"error",
            message:err.message
        })
    }
};
const deleteCategory = async (req, res) => {
    try {

        // التأكد أن القسم موجود
        const category = await Category.findById(req.params.categoryId);

        if (!category) {
            return res.status(404).json({
                status: "fail",
                message: "Category not found"
            });
        }

        // التأكد أن القسم لا يحتوي على منتجات
        const product = await Product.findOne({
            category: req.params.categoryId
        });

        if (product) {
            return res.status(400).json({
                status: "fail",
                message: "Cannot delete category because it contains products"
            });
        }

        // حذف القسم
        await Category.findByIdAndDelete(req.params.categoryId);

        res.status(200).json({
            status: "success",
            data: null
        });

    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        });
    }
};module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
};