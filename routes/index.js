import express from 'express';
import getHomePage from '../controllers/homeController.js';
import adminRoutes from './api/admin.js';
import authRoutes from './api/auth.js';
import categoryRoutes from './api/categories.js';
import chatRoutes from './api/chats.js';
import contactRoutes from './api/contact.js';
import currencyRoutes from './api/currencies.js';
import freelanceRoutes from './api/freelances.js';
import employerRoutes from './api/employers.js';
import gigRoutes from './api/gigs.js';
import jobRoutes from './api/jobs.js';
import translationRoutes from './api/translation.js';
import userRoutes from './api/users.js';

const router = express.Router();

router.get('/', getHomePage);
router.use('/api/admin', adminRoutes);
router.use('/api/auth', authRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/chats', chatRoutes);
router.use('/api/contact', contactRoutes);
router.use('/api/currencies', currencyRoutes);
router.use('/api/freelances', freelanceRoutes);
router.use('/api/employers', employerRoutes);
router.use('/api/gigs', gigRoutes);
router.use('/api/jobs', jobRoutes);
router.use('/api/translation', translationRoutes);
router.use('/api/users', userRoutes);

export default router;

