import express from 'express';
import { register, login, getProfile, updateProfile } from '../../controllers/authController.js';
import auth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/auth/register', register);
router.post('/auth/login', login);
router.get('/auth/profile', auth, getProfile);
router.put('/auth/profile', auth, updateProfile);

const authRoutes = router;
export default authRoutes;


