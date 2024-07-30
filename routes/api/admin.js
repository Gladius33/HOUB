import express from 'express';
import { updateCurrencyRates } from '../../controllers/adminController.js';
import auth from '../../middleware/auth.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/currency', auth, adminAuth, updateCurrencyRates);

const adminRoutes = router;
export default adminRoutes;


