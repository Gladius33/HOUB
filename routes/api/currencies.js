const express = require('express');
const { getCurrencies, createCurrency, updateCurrencyRates } = require('../../controllers/currencyController');
const auth = require('../../middleware/auth').default;
const adminAuth = require('../../middleware/adminAuth').default;

const router = express.Router();

router.get('/', getCurrencies);
router.post('/', [auth, adminAuth], createCurrency);
router.put('/update-rates', [auth, adminAuth], updateCurrencyRates);

export default router;
