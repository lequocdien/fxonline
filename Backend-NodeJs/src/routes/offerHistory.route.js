const express = require('express');
const { list } = require('../controllers/offerHistory.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;