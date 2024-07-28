import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import config from 'config';

const jwtSecret = config.get('jwtSecret');

// Fonction d'inscription
export async function register(req, res) {
  const { name, email, password, userType } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
    }

    // Créer une nouvelle instance d'utilisateur
    user = new User({
      name,
      email,
      password,
      userType
    });

    // Hacher le mot de passe avant de le sauvegarder
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Générer un token JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Fonction de connexion
export async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }

    // Générer un token JWT
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, jwtSecret, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
}

// Fonction pour obtenir le profil utilisateur
export async function getProfile(req, res) {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

// Fonction pour mettre à jour le profil utilisateur
export async function updateProfile(req, res) {
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
