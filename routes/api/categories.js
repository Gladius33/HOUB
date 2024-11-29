import express from 'express';
import { getCategories, createCategory } from '../../controllers/categoryController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/categories', async (req, res) => {
  try {
    const categories = await getCategories(req, res);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post('/categories', [auth, adminAuth], async (req, res) => {
  try {
    const category = await createCategory(req, res);
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
