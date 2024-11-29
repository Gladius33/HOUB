import express from 'express';
import { uploadTranslation, getTranslations } from '../../controllers/translationController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/translations', [auth, adminAuth], async (req, res) => {
  try {
    const translation = await uploadTranslation(req, res);
    res.json(translation);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/translations', async (req, res) => {
  try {
    const translations = await getTranslations(req, res);
    res.json(translations);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const translationRoutes = router;
export default translationRoutes;

