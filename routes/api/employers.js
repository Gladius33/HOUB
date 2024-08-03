import express from 'express';
import { check } from 'express-validator';
import employerController from '../../controllers/employerController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/employers
// @desc    Get all employers
// @access  Public
router.get('/employers', employerController.getEmployers);

// @route   GET api/employers/:userId
// @desc    Get employer by user ID
// @access  Public
router.get('/employers/:userId', employerController.getEmployerById);

// @route   POST api/employers
// @desc    Create or update employer profile
// @access  Private
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
  employerController.upsertEmployer
);

const employerRoutes = router;
export default employerRoutes;

