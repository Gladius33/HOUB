import express from 'express';
import { updateCurrencyRates } from '../../controllers/adminController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/currency', auth, adminAuth, async (req, res) => {
  try {
    const result = await updateCurrencyRates(req, res);
    res.json(result);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
