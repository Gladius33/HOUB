const express = require('express');
const { uploadTranslation, getTranslations } = require('../../controllers/translationController');
const auth = require('../backend/middleware/auth');
const adminAuth = require('../../middleware/adminAuth');

const router = express.Router();

router.post('/', [auth, adminAuth], uploadTranslation);
router.get('/', getTranslations);

module.exports = router;
