const express = require('express');
const { getCategories, createCategory } = require('../controllers/categoryController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.get('/', getCategories);
router.post('/', [auth, adminAuth], createCategory);

module.exports = router;
