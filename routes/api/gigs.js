import express from 'express';
import { check } from 'express-validator';
import gigController from '../../controllers/gigController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/gigs
// @desc    Get all gigs
// @access  Public
router.get('/gigs', gigController.getGigs);

// @route   GET api/gigs/:gigId
// @desc    Get gig by ID
// @access  Public
router.get('/gigs/:gigId', gigController.getGigById);

// @route   POST api/gigs
// @desc    Create or update gig
// @access  Private
router.post(
  '/gigs',
  [
    authMiddleware,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('category', 'Category is required').not().isEmpty(),
      check('maxDailyRate', 'Max daily rate is required').not().isEmpty(),
      check('duration', 'Duration is required').not().isEmpty(),
      check('remote', 'Remote status is required').not().isEmpty()
    ]
  ],
  gigController.upsertGig
);

// @route   DELETE api/gigs/:gigId
// @desc    Delete gig
// @access  Private
router.delete('/:gigId', authMiddleware, gigController.deleteGig);

const gigRoutes = router;
export default gigRoutes;

