import User from '../models/User';
import { validationResult } from 'express-validator';

// Get all users
export async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Get user by ID
export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
}

// Create or update user profile
export async function upsertUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    email,
    password,
    userType,
    avatar
  } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (email) userFields.email = email;
  if (password) userFields.password = password;
  if (userType) userFields.userType = userType;
  if (avatar) userFields.avatar = avatar;

  try {
    let user = await User.findById(req.params.userId);

    if (user) {
      // Update
      user = await User.findByIdAndUpdate(
        { _id: req.params.userId },
        { $set: userFields },
        { new: true }
      );

      return res.json(user);
    }

    // Create
    user = new User(userFields);

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Delete user
export async function deleteUser(req, res) {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
}
