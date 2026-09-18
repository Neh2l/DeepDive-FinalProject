const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        /* =====================================================
           USER
        ===================================================== */

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },


        /* =====================================================
           ORDER ITEMS
        ===================================================== */

        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],


        /* =====================================================
           ORDER TOTAL
        ===================================================== */

        total: {
            type: Number,
            required: true,
            min: 0,
        },


        /* =====================================================
           ORDER STATUS
        ===================================================== */

        status: {
            type: String,

            enum: [
                "Pending",
                "Shipped",
                "Delivered",
                "Canceled"
            ],

            default: "Pending",
        },


        /* =====================================================
           SHIPPING ADDRESS
        ===================================================== */

        shippingAddress: {
            type: String,
            required: true,
        },


        /* =====================================================
           PAYMENT METHOD
        ===================================================== */

        paymentMethod: {
            type: String,

            enum: [
                "COD",
                "Paymob"
            ],

            required: true,
        },


        /* =====================================================
           PAYMENT STATUS
        ===================================================== */

        paymentStatus: {
            type: String,

            enum: [
                "Pending",
                "Paid",
                "Failed"
            ],

            default: "Pending",
        },


        /* =====================================================
           PAYMOB ORDER ID

           This connects our MongoDB Order
           with the Paymob payment order.
        ===================================================== */

        paymobOrderId: {
            type: String,
            default: null,
        },


        /* =====================================================
           PAYMOB TRANSACTION ID

           We will save the transaction ID
           after Paymob sends the payment callback.
        ===================================================== */

        paymobTransactionId: {
            type: String,
            default: null,
        },
    },


    /* =========================================================
       TIMESTAMPS
    ========================================================= */

    {
        timestamps: true,
    }
);


module.exports = mongoose.model(
    "Order",
    orderSchema
);