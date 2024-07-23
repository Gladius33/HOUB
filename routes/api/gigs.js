const express = require('express');
const { check } = require('express-validator');
const gigController = require('../../controllers/gigController');
const authMiddleware = require('../../middleware/authMiddleware');

const router = express.Router();

// @route   GET api/gigs
// @desc    Get all gigs
// @access  Public
router.get('/', gigController.getGigs);

// @route   GET api/gigs/:gigId
// @desc    Get gig by ID
// @access  Public
router.get('/:gigId', gigController.getGigById);

// @route   POST api/gigs
// @desc    Create or update gig
// @access  Private
router.post(
  '/',
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

module.exports = router;
