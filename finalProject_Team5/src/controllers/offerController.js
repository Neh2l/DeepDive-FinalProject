const Offer = require('../models/offerModel'); 


const createOffer = async (req, res) => {
    try {
        const { title, discountPercentage, code, expiryDate } = req.body;
        
        const newOffer = new Offer({
            title,
            discountPercentage,
            code,
            expiryDate
        });

        await newOffer.save();
        res.status(201).json({ message: 'Offer created successfully', newOffer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ isActive: true });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOffer, getOffers };