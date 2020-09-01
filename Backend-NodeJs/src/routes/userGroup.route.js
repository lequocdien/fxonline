const express = require('express');
const { list, create, updateByGroupId, deleteByGroupId } = require('../controllers/userGroup.controller');

const router = express.Router();

router.get('/', list);
router.post('/create', create);
router.post('/update', updateByGroupId);
router.post('/delete', deleteByGroupId);

module.exports = router;