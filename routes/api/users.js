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

// @route   POST api/users
// @desc    Create a new user
// @access  Private
router.post(
  '/',
  [
    authMiddleware,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').isLength({ min: 6 }),
      check('userType', 'User type is required').not().isEmpty()
    ]
  ],
  userController.createUser
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

router.put('/payment-info', authMiddleware, updatePaymentInfo);

export default router;

