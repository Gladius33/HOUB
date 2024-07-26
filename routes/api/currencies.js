import express from 'express';
import { getCurrencies, createCurrency, updateCurrencyRates } from '../../controllers/currencyController.js';
import auth from '../../middleware/auth.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getCurrencies);
router.post('/', [auth, adminAuth], createCurrency);
router.put('/update-rates', [auth, adminAuth], updateCurrencyRates);

export default router;
