const express = require('express');
const { list } = require('../controllers/statusOrder.controller');

const router = express.Router();

router.get('/', list);

module.exports = router;