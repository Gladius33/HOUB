import express from 'express';
import { createPayment, getPaymentStatus } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/payments/create', authMiddleware, createPayment);
router.get('/payments/:id/status', authMiddleware, getPaymentStatus);

const paymentRoutes = router;
export default paymentRoutes;

