const express = require('express');
const { deposit } = require('../controllers/deposit.controller');

const router = express.Router();

router.post('/', deposit);

module.exports = router;