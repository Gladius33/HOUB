import express from 'express';
import { check } from 'express-validator';
import userController from '../../controllers/userController.js';
import { updatePaymentInfo } from '../../controllers/paymentController.js';
import authMiddleware from '../../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', authMiddleware, userController.getUsers);

// @route   GET api/users/:userId
// @desc    Get user by ID
// @access  Private
router.get('/:userId', authMiddleware, userController.getUserById);

// @route   POST api/users/:userId
// @desc    Create or update user profile
// @access  Private
router.post(
  '/:userId',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').optional().isLength({ min: 6 }),
      check('userType', 'User type is required').optional().not().isEmpty()
    ]
  ],
  userController.upsertUser
);

// @route   DELETE api/users/:userId
// @desc    Delete user
// @access  Private
router.delete('/:userId', authMiddleware, userController.deleteUser);

// @route   POST api/users/admin
// @desc    Create an admin
// @access  Private
router.post(
  '/admin',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').isLength({ min: 6 })
    ]
  ],
  userController.createAdmin
);

// @route   PUT api/users/:userId
// @desc    Update user account
// @access  Private
router.put(
  '/:userId',
  [
    authMiddleware,
    [
      check('name', 'Name is required').optional().not().isEmpty(),
      check('email', 'Please include a valid email').optional().isEmail(),
      check('password', 'Password').optional().isLength({ min: 6 })
    ]
  ],
  userController.updateAccount
);

router.put('/payment-info', authMiddleware, updatePaymentInfo);

export default router;
