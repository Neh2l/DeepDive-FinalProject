const express = require('express');
const router = express.Router();
const { createOffer, getOffers } = require('../controllers/offerController');

router.get('/', getOffers);

router.post('/', createOffer);

module.exports = router;