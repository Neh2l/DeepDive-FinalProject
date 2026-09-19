const express = require('express');
const router = express.Router();
const { 
    createOffer, 
    getOffers, 
    updateOffer, 
    deleteOffer 
} = require('../controllers/offerController');

const authMiddleware = require('../middlewares/auth.middleware'); 

router.get('/', getOffers);

router.post('/', authMiddleware, createOffer); 

router.put('/:id', authMiddleware, updateOffer);

router.delete('/:id', authMiddleware, deleteOffer);

module.exports = router;