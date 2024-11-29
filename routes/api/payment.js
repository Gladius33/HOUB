import express from 'express';
import { createPayment, getPaymentStatus } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/payments/create', authMiddleware, async (req, res) => {
  try {
    const payment = await createPayment(req, res);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/payments/:id/status', authMiddleware, async (req, res) => {
  try {
    const status = await getPaymentStatus(req, res);
    res.json(status);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const paymentRoutes = router;
export default paymentRoutes;
