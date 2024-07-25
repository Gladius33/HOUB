const express = require('express');
const { uploadTranslation, getTranslations } = require('../../controllers/translationController');
const auth = require('../../middleware/auth').default;
const adminAuth = require('../../middleware/adminAuth').default;

const router = express.Router();

router.post('/', [auth, adminAuth], uploadTranslation);
router.get('/', getTranslations);

export default router;
