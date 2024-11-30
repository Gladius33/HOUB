import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from 'config';
import { check, validationResult } from 'express-validator';

const jwtSecret = config.get('jwtSecret');

export async function register(req, res) {
  // Validation des données entrantes
  await check('name', 'Name is required').notEmpty().run(req);
  await check('email', 'Please include a valid email').isEmail().run(req);
  await check('password', 'Password must be at least 6 characters long').isLength({ min: 6 }).run(req);
  await check('userType', 'User type is required').notEmpty().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, userType } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    user = new User({
      name,
      email,
      password,
      userType
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export async function login(req, res) {
  // Validation des données entrantes
  await check('email', 'Please include a valid email').isEmail().run(req);
  await check('password', 'Password is required').exists().run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export async function updateProfile(req, res) {
  await check('email', 'Please include a valid email').optional().isEmail().run(req);
  await check('dailyRateMin', 'Daily rate min must be a number').optional().isFloat().run(req);
  await check('dailyRateMax', 'Daily rate max must be a number').optional().isFloat().run(req);
  // (Ajouter d'autres vérifications selon les champs que vous souhaitez valider)

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    name,
    email,
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
    paymentInfo
  } = req.body;

  const profileFields = {};
  if (name) profileFields.name = name;
  if (email) profileFields.email = email;
  if (avatar) profileFields.avatar = avatar;
  if (shortDescription) profileFields.shortDescription = shortDescription;
  if (detailedDescription) profileFields.detailedDescription = detailedDescription;
  if (education) profileFields.education = education;
  if (experience) profileFields.experience = experience;
  if (dailyRateMin) profileFields.dailyRateMin = dailyRateMin;
  if (dailyRateMax) profileFields.dailyRateMax = dailyRateMax;
  if (maxDuration) profileFields.maxDuration = maxDuration;
  if (minDuration) profileFields.minDuration = minDuration;
  if (fullTime !== undefined) profileFields.fullTime = fullTime;
  if (partTime !== undefined) profileFields.partTime = partTime;
  if (remote !== undefined) profileFields.remote = remote;
  if (onsite !== undefined) profileFields.onsite = onsite;
  if (geoZone) profileFields.geoZone = geoZone;
  if (paymentInfo) profileFields.paymentInfo = paymentInfo;

  try {
    let user = await User.findById(req.user.id);
    if (user) {
      user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: profileFields },
        { new: true }
      );
      return res.json(user);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export default {
  register,
  login,
  getProfile,
  updateProfile
};

