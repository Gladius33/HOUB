import express from 'express';
const router = express.Router();
import { updateCurrencyRates } from '../../controllers/adminController.js';
import auth from '../../middleware/auth.js';
import adminAuth from '../../middleware/adminAuth.js';

router.post('currency', auth, adminAuth, updateCurrencyRates);

export default router;
