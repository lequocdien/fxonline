const express = require('express');
const { list } = require('../controllers/currencyRate.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;