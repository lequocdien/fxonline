const express = require('express');
const { list } = require('../controllers/assetInfo.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;