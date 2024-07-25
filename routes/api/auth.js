const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateProfile } = require('../../controllers/authController');
const auth = require('../../middleware/auth').default;

router.post('/register', register);
router.post('/login', login);
router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
