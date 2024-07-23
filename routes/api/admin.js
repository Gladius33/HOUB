const express = require('express');
const router = express.Router();
const { updateCurrencyRates } = require('../../controllers/adminController');
const auth = require('../../middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

router.post('/currency', auth, adminAuth, updateCurrencyRates);

module.exports = router;
