const express = require('express');
const { getByTradingAcc, lst, create, updateByAccountId, deleteByAccountId,  } = require('../controllers/trader.controller');
const router = express.Router();

router.get('/', lst);
router.get('/get-by-trading-acc', getByTradingAcc);
router.post('/create', create);
router.post('/update', updateByAccountId);
router.post('/delete', deleteByAccountId);

module.exports = router;