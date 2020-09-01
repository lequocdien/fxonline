const express = require('express');
const { list, updateByClaimId } = require('../controllers/roleClaim.controller');

const router = express.Router();

router.get('/', list);
router.post('/update', updateByClaimId);

module.exports = router;