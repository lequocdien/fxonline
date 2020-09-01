const express = require('express');
const { withdrawal } = require('../controllers/withdrawal.controller');

const router = express.Router();

router.post('/', withdrawal);

module.exports = router;