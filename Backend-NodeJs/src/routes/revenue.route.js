const express = require('express');
const { list } = require('../controllers/revenue.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;