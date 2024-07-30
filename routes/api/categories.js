import express from 'express';
import { getCategories, createCategory } from '../../controllers/categoryController.js';
import auth from '../../middleware/auth.js';
import adminAuth from '../../middleware/adminAuth.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', [auth, adminAuth], createCategory);

const categoryRoutes = router;
export default categoryRoutes;

