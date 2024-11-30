import User from '../models/User.js';
import { validationResult } from 'express-validator';

export async function getUsers(req, res) {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.userId).select('-password');

    if (!user) return res.status(404).json({ msg: 'User not found' });

    res.json(user);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
}

export async function createUser(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, userType, avatar, shortDescription, detailedDescription, education, experience, dailyRateMin, dailyRateMax, maxDuration, minDuration, fullTime, partTime, remote, onsite, geoZone, paymentInfo, notifications } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      userType,
      avatar,
      shortDescription,
      detailedDescription,
      education,
      experience,
      dailyRateMin,
      dailyRateMax,
      maxDuration,
      minDuration,
      fullTime,
      partTime,
      remote,
      onsite,
      geoZone,
      paymentInfo,
      notifications
    });

    if (userType === 'freelance') {
      // Logique spécifique pour les freelances
    } else if (userType === 'employer') {
      // Logique spécifique pour les employeurs
    }

    await user.save();
    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export async function updateAccount(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, avatar, shortDescription, detailedDescription, education, experience, dailyRateMin, dailyRateMax, maxDuration, minDuration, fullTime, partTime, remote, onsite, geoZone, paymentInfo, notifications, userType } = req.body;

  const userFields = {
    name,
    email,
    password,
    avatar,
    shortDescription,
    detailedDescription,
    education,
    experience,
    dailyRateMin,
    dailyRateMax,
    maxDuration,
    minDuration,
    fullTime,
    partTime,
    remote,
    onsite,
    geoZone,
    paymentInfo,
    notifications,
    userType
  };

  try {
    let user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: userFields },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export async function deleteUser(req, res) {
  try {
    await User.findByIdAndRemove(req.params.userId);
    res.json({ msg: 'User removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.status(500).send('Server error');
  }
}

export async function createAdmin(req, res) {
  const { name, email, password } = req.body;

  const userFields = {
    name,
    email,
    password,
    userType: 'admin'
  };

  try {
    const user = new User(userFields);
    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export default {
  getUsers,
  getUserById,
  createUser,
  updateAccount,
  deleteUser,
  createAdmin
};
