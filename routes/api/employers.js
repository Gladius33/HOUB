const express = require('express');
const { check } = require('express-validator');
const employerController = require('../../controllers/employerController');
const authMiddleware = require('../../middleware/authMiddleware').default;

const router = express.Router();

// @route   GET api/employers
// @desc    Get all employers
// @access  Public
router.get('/', employerController.getEmployers);

// @route   GET api/employers/:userId
// @desc    Get employer by user ID
// @access  Public
router.get('/:userId', employerController.getEmployerById);

// @route   POST api/employers
// @desc    Create or update employer profile
// @access  Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('companyName', 'Company name is required').not().isEmpty(),
      check('shortDescription', 'Short description is required').not().isEmpty(),
      check('detailedDescription', 'Detailed description is required').not().isEmpty()
    ]
  ],
  employerController.upsertEmployer
);

export default router;
