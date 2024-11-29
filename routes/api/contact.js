import express from 'express';
import { sendContactMessage } from '../../controllers/contactController.js';

const router = express.Router();

router.post('/contact', async (req, res) => {
  try {
    const message = await sendContactMessage(req, res);
    res.json(message);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
