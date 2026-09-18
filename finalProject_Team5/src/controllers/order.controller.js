const Order = require("../models/order.model");
const Product = require("../models/productModel");
const User = require("../models/user.model");


/* =========================================================
   CREATE ORDER - BUYER
========================================================= */

const createOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const {
            items,
            shippingAddress,
            paymentMethod
        } = req.body;


        /* =====================================================
           VALIDATION
        ===================================================== */

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Order items are required"
            });
        }


        if (!shippingAddress) {
            return res.status(400).json({
                message: "Shipping address is required"
            });
        }


        if (!paymentMethod) {
            return res.status(400).json({
                message: "Payment method is required"
            });
        }


        /* =====================================================
           PAYMENT METHOD
        ===================================================== */

        const allowedPaymentMethods = [
            "COD",
            "Paymob"
        ];

        if (!allowedPaymentMethods.includes(paymentMethod)) {
            return res.status(400).json({
                message: "Invalid payment method"
            });
        }


        /* =====================================================
           PREPARE ORDER ITEMS
        ===================================================== */

        const orderItems = [];

        let subtotal = 0;


        for (const item of items) {

            if (!item.productId || !item.quantity) {
                return res.status(400).json({
                    message: "Product ID and quantity are required"
                });
            }


            if (item.quantity < 1) {
                return res.status(400).json({
                    message: "Quantity must be at least 1"
                });
            }


            const product = await Product.findById(
                item.productId
            );


            if (!product) {
                return res.status(404).json({
                    message: `Product not found: ${item.productId}`
                });
            }


            if (product.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for product: ${product.name}`
                });
            }


            const itemTotal =
                product.price * item.quantity;


            subtotal += itemTotal;


            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                price: product.price
            });
        }


        /* =====================================================
           DELIVERY FEE
        ===================================================== */

        const delivery =
            subtotal >= 100
                ? 0
                : 5;


        /* =====================================================
           FINAL TOTAL
        ===================================================== */

        const total =
            subtotal + delivery;


        /* =====================================================
           CREATE ORDER
        ===================================================== */

        const order = await Order.create({
            user: userId,

            items: orderItems,

            total,

            status: "Pending",

            shippingAddress,

            paymentMethod,

            paymentStatus: "Pending",

            paymobOrderId: null,

            paymobTransactionId: null
        });


        /* =====================================================
           DECREASE STOCK

           COD:
           Decrease stock immediately.

           Paymob:
           Do NOT decrease stock yet.
           Stock will be handled after successful payment.
        ===================================================== */

        if (paymentMethod === "COD") {

            for (const item of items) {

                await Product.findByIdAndUpdate(
                    item.productId,
                    {
                        $inc: {
                            stock: -item.quantity
                        }
                    }
                );
            }
        }


        /* =====================================================
           RESPONSE
        ===================================================== */

        return res.status(201).json({
            message: "Order created successfully",

            order
        });


    } catch (error) {

        console.error(
            "CREATE ORDER ERROR:",
            error
        );

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   GET MY ORDERS - BUYER
========================================================= */

const getMyOrders = async (req, res) => {
    try {
        const userId = req.user.id;


        const total = await Order.countDocuments({
            user: userId
        });


        const orders = await Order.find({
            user: userId
        })
            .select(
                "items status total shippingAddress paymentMethod paymentStatus createdAt"
            )
            .populate(
                "items.product",
                "name price images"
            )
            .sort({
                createdAt: -1
            });


        return res.status(200).json({
            total,
            orders
        });


    } catch (error) {

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   GET ORDER BY ID - BUYER
========================================================= */

const getOrderById = async (req, res) => {
    try {
        const userId = req.user.id;

        const { id } = req.params;


        const order = await Order.findOne({
            _id: id,

            user: userId
        })
            .populate(
                "items.product",
                "name price images"
            );


        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }


        return res.status(200).json({
            order
        });


    } catch (error) {

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   CANCEL ORDER - BUYER
========================================================= */

const cancelOrder = async (req, res) => {
    try {
        const userId = req.user.id;

        const { id } = req.params;


        const order = await Order.findOne({
            _id: id,

            user: userId
        });


        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }


        if (order.status !== "Pending") {
            return res.status(400).json({
                message: "Only pending orders can be canceled"
            });
        }


        order.status = "Canceled";


        await order.save();


        return res.status(200).json({
            message: "Order canceled successfully",

            order
        });


    } catch (error) {

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   GET ALL ORDERS - ADMIN
========================================================= */

const getAllOrders = async (req, res) => {
    try {
        const {
            page = 1,
            limit = 10,
            status,
            search
        } = req.query;


        const pageNumber = Number(page);

        const limitNumber = Number(limit);


        const filter = {};


        if (status) {
            filter.status = status;
        }


        /* =====================================================
           SEARCH BY ORDER ID
        ===================================================== */

        if (
            search &&
            search.match(/^[0-9a-fA-F]{24}$/)
        ) {
            filter._id = search;
        }


        /* =====================================================
           SEARCH BY BUYER NAME
        ===================================================== */

        if (
            search &&
            !search.match(/^[0-9a-fA-F]{24}$/)
        ) {

            const users = await User.find({
                name: {
                    $regex: search,

                    $options: "i"
                }
            })
                .select("_id");


            const userIds = users.map(
                user => user._id
            );


            filter.user = {
                $in: userIds
            };
        }


        /* =====================================================
           TOTAL FILTERED ORDERS
        ===================================================== */

        const total = await Order.countDocuments(
            filter
        );


        /* =====================================================
           PAGINATION
        ===================================================== */

        const skip =
            (pageNumber - 1) *
            limitNumber;


        /* =====================================================
           GET ORDERS
        ===================================================== */

        const orders = await Order.find(
            filter
        )
            .populate(
                "user",
                "name email"
            )
            .populate(
                "items.product",
                "name price images"
            )
            .sort({
                createdAt: -1
            })
            .skip(skip)
            .limit(limitNumber);


        return res.status(200).json({
            total,

            page: pageNumber,

            limit: limitNumber,

            orders
        });


    } catch (error) {

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   UPDATE ORDER STATUS - ADMIN
========================================================= */

const updateOrderStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const { status } = req.body;


        /* =====================================================
           VALID STATUSES
        ===================================================== */

        const allowedStatuses = [
            "Pending",
            "Shipped",
            "Delivered",
            "Canceled"
        ];


        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid order status"
            });
        }


        /* =====================================================
           FIND ORDER
        ===================================================== */

        const order = await Order.findById(id);


        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }


        /* =====================================================
           PAYMOB PAYMENT CHECK

           Paymob orders cannot be shipped
           before successful payment.
        ===================================================== */

        if (
            order.paymentMethod === "Paymob" &&
            order.paymentStatus !== "Paid"
        ) {
            return res.status(400).json({
                message:
                    "Paymob order must be paid before shipping"
            });
        }


        /* =====================================================
           CURRENT STATUS
        ===================================================== */

        const currentStatus = order.status;


        /* =====================================================
           PENDING
        ===================================================== */

        if (currentStatus === "Pending") {

            if (
                status !== "Shipped" &&
                status !== "Canceled"
            ) {
                return res.status(400).json({
                    message: "Invalid status transition"
                });
            }
        }


        /* =====================================================
           SHIPPED
        ===================================================== */

        if (currentStatus === "Shipped") {

            if (status !== "Delivered") {
                return res.status(400).json({
                    message: "Invalid status transition"
                });
            }
        }


        /* =====================================================
           DELIVERED
        ===================================================== */

        if (currentStatus === "Delivered") {

            return res.status(400).json({
                message:
                    "Delivered order cannot be changed"
            });
        }


        /* =====================================================
           CANCELED
        ===================================================== */

        if (currentStatus === "Canceled") {

            return res.status(400).json({
                message:
                    "Canceled order cannot be changed"
            });
        }


        /* =====================================================
           UPDATE STATUS
        ===================================================== */

        order.status = status;


        await order.save();


        /* =====================================================
           RESPONSE
        ===================================================== */

        return res.status(200).json({
            message:
                "Order status updated successfully",

            order
        });


    } catch (error) {

        console.error(
            "UPDATE ORDER STATUS ERROR:",
            error
        );

        return res.status(500).json({
            message: "Server error",

            error: error.message
        });
    }
};


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
};