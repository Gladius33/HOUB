import express from 'express';
import { register, login, getProfile, updateProfile } from '../../controllers/authController.js';
import auth from '../../middleware/authMiddleware.js';
import jwt from 'jsonwebtoken';
import config from 'config';

const router = express.Router();

const generateToken = (user) => {
  const payload = {
    user: {
      id: user.id
    }
  };
  return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
};

router.post('/register', async (req, res) => {
  try {
    const user = await register(req, res);
    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const user = await login(req, res);
    const token = generateToken(user);
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const profile = await getProfile(req, res);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.put('/profile', auth, async (req, res) => {
  try {
    const profile = await updateProfile(req, res);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
