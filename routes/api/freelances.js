const express = require('express');
const { check } = require('express-validator');
const freelanceController = require('../../controllers/freelanceController');
const authMiddleware = require('../../middleware/authMiddleware').default;

const router = express.Router();

// @route   GET api/freelances
// @desc    Get all freelances
// @access  Public
router.get('/', freelanceController.getFreelances);

// @route   GET api/freelances/:userId
// @desc    Get freelance by user ID
// @access  Public
router.get('/:userId', freelanceController.getFreelanceById);

// @route   POST api/freelances
// @desc    Create or update freelance profile
// @access  Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('shortDescription', 'Short description is required').not().isEmpty(),
      check('detailedDescription', 'Detailed description is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
      check('hourlyRate', 'Hourly rate is required').not().isEmpty()
    ]
  ],
  freelanceController.upsertFreelance
);

export default router;
