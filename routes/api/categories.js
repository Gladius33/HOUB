const express = require('express');
const { getCategories, createCategory } = require('../../controllers/categoryController');
const auth = require('../../middleware/auth').default;
const adminAuth = require('../../middleware/adminAuth').default;

const router = express.Router();

router.get('/', getCategories);
router.post('/', [auth, adminAuth], createCategory);

export default router;
