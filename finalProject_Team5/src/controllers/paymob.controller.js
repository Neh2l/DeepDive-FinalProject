const axios = require("axios");
const crypto = require("crypto");

const Order = require("../models/order.model");
const User = require("../models/user.model");
const Product = require("../models/productModel");


/* =========================================================
   VERIFY PAYMOB HMAC
========================================================= */

const verifyPaymobHmac = (obj, receivedHmac) => {

    const sourceData = obj.source_data || {};

    const values = [
        obj.amount_cents,
        obj.created_at,
        obj.currency,
        obj.error_occured,
        obj.has_parent_transaction,
        obj.id,
        obj.integration_id,
        obj.is_3d_secure,
        obj.is_auth,
        obj.is_capture,
        obj.is_refunded,
        obj.is_standalone_payment,
        obj.is_voided,
        obj.order?.id,
        obj.owner,
        obj.pending,
        sourceData.pan,
        sourceData.sub_type,
        sourceData.type,
        obj.success
    ];

    const concatenatedValues = values
        .map((value) => String(value))
        .join("");

    const calculatedHmac = crypto
        .createHmac(
            "sha512",
            process.env.PAYMOB_HMAC
        )
        .update(concatenatedValues)
        .digest("hex");

    if (!receivedHmac) {
        return false;
    }

    try {

        return crypto.timingSafeEqual(
            Buffer.from(calculatedHmac, "utf8"),
            Buffer.from(receivedHmac, "utf8")
        );

    } catch (error) {

        return false;

    }
};


/* =========================================================
   CREATE PAYMENT INTENTION
========================================================= */

const createPaymentIntention = async (req, res) => {

    try {

        const {
            orderId,
            items,
            billingData
        } = req.body;


        /* =====================================================
           VALIDATION
        ===================================================== */

        if (!orderId) {

            return res.status(400).json({
                message: "Order ID is required"
            });

        }


        if (
            !items ||
            !Array.isArray(items) ||
            items.length === 0
        ) {

            return res.status(400).json({
                message: "Payment items are required"
            });

        }


        if (!billingData) {

            return res.status(400).json({
                message: "Billing data is required"
            });

        }


        /* =====================================================
           FIND ORDER
        ===================================================== */

        const order = await Order.findOne({

            _id: orderId,

            user: req.user.id

        });


        if (!order) {

            return res.status(404).json({
                message: "Order not found"
            });

        }


        /* =====================================================
           CHECK PAYMENT METHOD
        ===================================================== */

        if (order.paymentMethod !== "Paymob") {

            return res.status(400).json({

                message:
                    "This order is not configured for Paymob"

            });

        }


        /* =====================================================
           CHECK PAYMENT STATUS
        ===================================================== */

        if (order.paymentStatus === "Paid") {

            return res.status(400).json({

                message:
                    "Order has already been paid"

            });

        }


        /* =====================================================
           GET USER
        ===================================================== */

        const user = await User.findById(
            req.user.id
        );


        if (!user) {

            return res.status(404).json({

                message:
                    "User not found"

            });

        }


        /* =====================================================
           CREATE PAYMOB ITEMS
        ===================================================== */

        const paymobItems = items.map((item) => ({

            name:
                item.name ||
                item.title ||
                "Product",

            amount:
                Math.round(
                    Number(item.amount)
                ),

            description:
                item.description ||
                item.name ||
                item.title ||
                "Product",

            quantity:
                Number(item.quantity) || 1

        }));


        /* =====================================================
           CREATE PAYMENT INTENTION
        ===================================================== */

        const response = await axios.post(

            "https://accept.paymob.com/v1/intention/",

            {

                /* =================================================
                   TOTAL AMOUNT
                ================================================= */

                amount:
                    Math.round(
                        Number(order.total) * 100
                    ),


                currency: "EGP",


                /* =================================================
                   PAYMOB INTEGRATION ID
                ================================================= */

                payment_methods: [

                    Number(
                        process.env.PAYMOB_INTEGRATION_ID
                    )

                ],


                /* =================================================
                   ITEMS
                ================================================= */

                items: paymobItems,


                /* =================================================
                   BILLING DATA
                ================================================= */

                billing_data: {

                    apartment:
                        billingData.apartment ||
                        "NA",

                    first_name:
                        billingData.first_name ||
                        "Customer",

                    last_name:
                        billingData.last_name ||
                        "Customer",

                    street:
                        billingData.street ||
                        "NA",

                    building:
                        billingData.building ||
                        "NA",

                    phone_number:
                        billingData.phone_number,

                    city:
                        billingData.city ||
                        "Cairo",

                    country:
                        billingData.country ||
                        "EG",

                    email:
                        user.email,

                    floor:
                        billingData.floor ||
                        "NA",

                    state:
                        billingData.state ||
                        "Cairo"

                },


                /* =================================================
                   OUR INTERNAL ORDER ID
                ================================================= */

                special_reference:
                    String(order._id)

            },


            /* =====================================================
               HEADERS
            ===================================================== */

            {

                headers: {

                    Authorization:
                        `Token ${process.env.PAYMOB_SECRET_KEY}`,

                    "Content-Type":
                        "application/json"

                }

            }

        );


        /* =====================================================
           GET PAYMOB DATA
        ===================================================== */

        const clientSecret =
            response.data.client_secret;


        const paymobOrderId =
            response.data.intention_order_id;


        const intentionId =
            response.data.id;


        /* =====================================================
           CHECK RESPONSE
        ===================================================== */

        if (!clientSecret) {

            throw new Error(
                "Paymob client secret was not returned."
            );

        }


        if (!paymobOrderId) {

            throw new Error(
                "Paymob order ID was not returned."
            );

        }


        /* =====================================================
           SAVE PAYMOB ORDER ID
        ===================================================== */

        order.paymobOrderId =
            String(paymobOrderId);


        await order.save();


        /* =====================================================
           UNIFIED CHECKOUT URL
        ===================================================== */

        const checkoutUrl =
            `https://accept.paymob.com/unifiedcheckout/?publicKey=${encodeURIComponent(
                process.env.PAYMOB_PUBLIC_KEY
            )}&clientSecret=${encodeURIComponent(
                clientSecret
            )}`;


        /* =====================================================
           RESPONSE
        ===================================================== */

        return res.status(201).json({

            message:
                "Payment intention created successfully",

            intentionId,

            intentionOrderId:
                paymobOrderId,

            clientSecret,

            checkoutUrl

        });


    } catch (error) {

        console.error(

            "PAYMOB ERROR:",

            error.response?.data ||
            error.message

        );


        return res.status(500).json({

            message:
                "Failed to create Paymob payment intention",

            error:
                error.response?.data ||
                error.message

        });

    }

};


/* =========================================================
   PAYMOB WEBHOOK
========================================================= */

const paymobWebhook = async (req, res) => {

    try {

        console.log(
            "PAYMOB WEBHOOK RECEIVED"
        );


        /* =====================================================
           GET PAYMOB CALLBACK DATA
        ===================================================== */

        const { obj } = req.body;

        const receivedHmac =
            req.query.hmac;


        if (!obj) {

            console.error(
                "PAYMOB WEBHOOK: Missing obj"
            );

            return res.status(400).json({

                message:
                    "Invalid Paymob webhook"

            });

        }


        /* =====================================================
           VERIFY HMAC
        ===================================================== */

        const isValidHmac =
            verifyPaymobHmac(
                obj,
                receivedHmac
            );


        if (!isValidHmac) {

            console.error(
                "PAYMOB WEBHOOK: Invalid HMAC"
            );

            return res.status(401).json({

                message:
                    "Invalid HMAC"

            });

        }


        console.log(
            "PAYMOB WEBHOOK: HMAC VERIFIED"
        );


        /* =====================================================
           GET PAYMOB DATA
        ===================================================== */

        const paymobOrderId =
            obj.order?.id;

        const transactionId =
            obj.id;

        const success =
            obj.success;


        if (!paymobOrderId) {

            console.error(
                "PAYMOB WEBHOOK: Missing Paymob order ID"
            );

            return res.status(400).json({

                message:
                    "Paymob order ID is missing"

            });

        }


        /* =====================================================
           FIND OUR LOCAL ORDER
        ===================================================== */

        const order = await Order.findOne({

            paymobOrderId:
                String(paymobOrderId)

        });


        if (!order) {

            console.error(

                "PAYMOB WEBHOOK: Local order not found",

                paymobOrderId

            );

            return res.status(404).json({

                message:
                    "Local order not found"

            });

        }


        /* =====================================================
           SAVE TRANSACTION ID
        ===================================================== */

        order.paymobTransactionId =
            String(transactionId);


        /* =====================================================
           SUCCESSFUL PAYMENT
        ===================================================== */

        if (success === true) {

            /* -------------------------------------------------
               IMPORTANT:

               If webhook is received more than once,
               do NOT decrease stock again.
            ------------------------------------------------- */

            if (order.paymentStatus !== "Paid") {

                order.paymentStatus =
                    "Paid";


                /* =================================================
                   DECREASE PRODUCT STOCK
                ================================================= */

                for (const item of order.items) {

                    const updatedProduct =
                        await Product.findOneAndUpdate(

                            {
                                _id:
                                    item.product,

                                stock:
                                    {
                                        $gte:
                                            item.quantity
                                    }

                            },

                            {
                                $inc:
                                    {
                                        stock:
                                            -item.quantity
                                    }
                            },

                            {
                                new: true
                            }

                        );


                    if (!updatedProduct) {

                        console.error(

                            "PAYMOB WEBHOOK: Not enough stock",

                            item.product

                        );

                        /*
                         * We already know the payment
                         * succeeded, so we don't mark
                         * the payment as failed.
                         *
                         * We log the stock problem here
                         * for handling separately.
                         */

                    }

                }

            }


            console.log(

                "PAYMOB PAYMENT SUCCESS:",

                order._id

            );

        }


        /* =====================================================
           FAILED PAYMENT
        ===================================================== */

        else {

            order.paymentStatus =
                "Failed";


            console.log(

                "PAYMOB PAYMENT FAILED:",

                order._id

            );

        }


        /* =====================================================
           SAVE ORDER
        ===================================================== */

        await order.save();


        /* =====================================================
           RESPONSE TO PAYMOB
        ===================================================== */

        return res.status(200).json({

            message:
                "Paymob webhook processed successfully"

        });


    } catch (error) {

        console.error(

            "PAYMOB WEBHOOK ERROR:",

            error

        );


        return res.status(500).json({

            message:
                "Paymob webhook processing failed"

        });

    }

};


/* =========================================================
   EXPORTS
========================================================= */

module.exports = {

    createPaymentIntention,

    paymobWebhook

};