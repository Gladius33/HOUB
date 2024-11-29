import express from 'express';
import { check } from 'express-validator';
import employerController from '../../controllers/employerController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

router.get('/employers', async (req, res) => {
  try {
    const employers = await employerController.getEmployers(req, res);
    res.json(employers);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/employers/:userId', async (req, res) => {
  try {
    const employer = await employerController.getEmployerById(req, res);
    res.json(employer);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post(
  '/employers',
  [
    authMiddleware,
    [
      check('companyName', 'Company name is required').not().isEmpty(),
      check('shortDescription', 'Short description is required').not().isEmpty(),
      check('detailedDescription', 'Detailed description is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const employer = await employerController.upsertEmployer(req, res);
      res.json(employer);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

export default router;
