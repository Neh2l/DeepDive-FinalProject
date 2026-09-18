const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    discountPercentage: {
        type: Number,
        required: true,
        min: 1,
        max: 100
    },
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    expiryDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Offer', offerSchema);