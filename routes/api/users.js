const express = require('express');
const { check } = require('express-validator');
const userController = require('../../controllers/userController');
const authMiddleware = require('../../middleware/authMiddleware').default;

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
      check('userType', 'User type is required').not().isEmpty()
    ]
  ],
  userController.upsertUser
);

// @route   DELETE api/users/:userId
// @desc    Delete user
// @access  Private
router.delete('/:userId', authMiddleware, userController.deleteUser);

export default router;
