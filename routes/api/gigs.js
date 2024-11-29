import express from 'express';
import { check } from 'express-validator';
import gigController from '../../controllers/gigController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/gigs
// @desc    Get all gigs
// @access  Public
router.get('/gigs', async (req, res) => {
  try {
    const gigs = await gigController.getGigs(req, res);
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   GET api/gigs/:gigId
// @desc    Get gig by ID
// @access  Public
router.get('/gigs/:gigId', async (req, res) => {
  try {
    const gig = await gigController.getGigById(req, res);
    res.json(gig);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

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
  async (req, res) => {
    try {
      const gig = await gigController.upsertGig(req, res);
      res.json(gig);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE api/gigs/:gigId
// @desc    Delete gig
// @access  Private
router.delete('/:gigId', authMiddleware, async (req, res) => {
  try {
    await gigController.deleteGig(req, res);
    res.json({ msg: 'Gig deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const gigRoutes = router;
export default gigRoutes;
