import express from 'express';
import { getCurrencies, createCurrency, updateCurrencyRates } from '../../controllers/currencyController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getCurrencies);
router.post('/', [auth, adminAuth], createCurrency);
router.put('/update-rates', [auth, adminAuth], updateCurrencyRates);

const currencyRoutes = router;
export default currencyRoutes;

