const express = require('express');
const router = express.Router();
const { createOffer, getOffers } = require('../controllers/offerController');

const authMiddleware = require('../middlewares/auth.middleware'); 

router.get('/', getOffers);

router.post('/', authMiddleware, createOffer); 


module.exports = router;