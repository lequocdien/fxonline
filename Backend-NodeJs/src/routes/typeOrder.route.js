const express = require('express');
const { list } = require('../controllers/typeOrder.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;