import express from 'express';
import { createPayment, getPaymentStatus } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createPayment);
router.get('/:id/status', authMiddleware, getPaymentStatus);

const paymentRoutes = router;
export default paymentRoutes;

