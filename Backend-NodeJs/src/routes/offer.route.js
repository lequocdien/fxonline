const express = require('express');
const { list, create, updateByOfferId } = require('../controllers/offer.controller');

const router = express.Router();

router.get('/', list);
router.post('/create', create);
router.post('/update', updateByOfferId);

module.exports = router;