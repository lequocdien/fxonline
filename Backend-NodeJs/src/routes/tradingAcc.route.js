const express = require('express');
const { list, create } = require('../controllers/tradingAcc.controller');

const router = express.Router();

router.get('/', list);
router.post('/create', create);

module.exports = router;