import express from 'express';
const router = express.Router();
import { register, login, getProfile, updateProfile } from '../../controllers/authController.js';
import auth from '../../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
