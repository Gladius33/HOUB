import express from'express';
import { uploadTranslation, getTranslations } from '../../controllers/translationController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.post('/translations', [auth, adminAuth], uploadTranslation);
router.get('/translations', getTranslations);

const translationRoutes = router;
export default translationRoutes;

