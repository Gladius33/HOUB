import express from 'express';
import { getCategories, createCategory } from '../../controllers/categoryController.js';
import auth from '../../middleware/authMiddleware.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/categories', getCategories);
router.post('/categories', [auth, adminAuth], createCategory);

const categoryRoutes = router;
export default categoryRoutes;

