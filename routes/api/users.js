import express from 'express';
import { check } from 'express-validator';
import userController from '../../controllers/userController.js';
import { updatePaymentInfo } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await userController.getUsers(req, res);
    res.json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   GET api/users/:userId
// @desc    Get user by ID
// @access  Private
router.get('/users/:userId', authMiddleware, async (req, res) => {
  try {
    const user = await userController.getUserById(req, res);
    res.json(user);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   POST api/users
// @desc    Create a new user
// @access  Private
router.post(
  '/users',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').isLength({ min: 6 }),
      check('userType', 'User type is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const user = await userController.createUser(req, res);
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

// @route   PUT api/users/:userId
// @desc    Update user account
// @access  Private
router.put(
  '/users/:userId',
  [
    authMiddleware,
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('email', 'Please include a valid email').optional().isEmail(),
      check('password', 'Password').optional().isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    try {
      const user = await userController.updateAccount(req, res);
      res.json(user);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

// @route   DELETE api/users/:userId
// @desc    Delete user
// @access  Private
router.delete('/users/:userId', authMiddleware, async (req, res) => {
  try {
    await userController.deleteUser(req, res);
    res.json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

// @route   POST api/users/admin
// @desc    Create an admin
// @access  Private
router.post(
  '/users/admin',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').isLength({ min: 6 })
    ]
  ],
  async (req, res) => {
    try {
      const admin = await userController.createAdmin(req, res);
      res.json(admin);
    } catch (error) {
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  }
);

router.put('/users/payment-info', authMiddleware, async (req, res) => {
  try {
    const paymentInfo = await updatePaymentInfo(req, res);
    res.json(paymentInfo);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const userRoutes = router;
export default userRoutes;


