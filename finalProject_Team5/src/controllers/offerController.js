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
        const currentDate = new Date();
        const offers = await Offer.find({ 
            isActive: true, 
            expiryDate: { $gt: currentDate } 
        });
        res.status(200).json(offers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOffer = async (req, res) => {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer updated successfully', updatedOffer });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOffer = async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createOffer, getOffers, updateOffer, deleteOffer };