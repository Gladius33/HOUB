import express from 'express';
import { getCurrencies, createCurrency, updateCurrencyRates } from '../../controllers/currencyController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/currencies', async (req, res) => {
  try {
    const currencies = await getCurrencies(req, res);
    res.json(currencies);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post('/create-currency', [auth, adminAuth], async (req, res) => {
  try {
    const currency = await createCurrency(req, res);
    res.json(currency);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.put('/update-rates', [auth, adminAuth], async (req, res) => {
  try {
    const result = await updateCurrencyRates(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
