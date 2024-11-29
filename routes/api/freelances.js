import express from 'express';
import { check } from 'express-validator';
import freelanceController from '../../controllers/freelanceController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/freelances', async (req, res) => {
  try {
    const freelances = await freelanceController.getFreelances(req, res);
    res.json(freelances);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/freelances/:userId', async (req, res) => {
  try {
    const freelance = await freelanceController.getFreelanceById(req, res);
    res.json(freelance);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post(
  '/freelances',
  [
    authMiddleware,
    [
      check('shortDescription', 'Short description is required').not().isEmpty(),
      check('detailedDescription', 'Detailed description is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
      check('hourlyRate', 'Hourly rate is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const freelance = await freelanceController.updateFreelance(req, res);
      res.json(freelance);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

export default router;
