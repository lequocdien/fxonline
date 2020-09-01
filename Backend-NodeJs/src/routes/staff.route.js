const express = require('express');
const { list, create, updateByAccountId, deleteByAccountId } = require('../controllers/staff.controller');

const router = express.Router();

router.get('/', list);
router.post('/create', create);
router.post('/update', updateByAccountId);
router.post('/delete', deleteByAccountId);

module.exports = router;