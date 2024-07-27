import express from 'express';
import { createPayment, getPaymentStatus } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware.default, createPayment);
router.get('/:id/status', authMiddleware.default, getPaymentStatus);

export default router;