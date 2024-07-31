import express from 'express';
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
import paymentRoutes from './api/payment.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.use('/api/admin', adminAuth, adminRoutes);
router.use('/api/auth', authMiddleware, authRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/chats', authMiddleware, chatRoutes);
router.use('/api/contact', contactRoutes);
router.use('/api/currencies', currencyRoutes);
router.use('/api/freelances', authMiddleware, freelanceRoutes);
router.use('/api/employers', authMiddleware, employerRoutes);
router.use('/api/gigs', gigRoutes);
router.use('/api/jobs', jobRoutes);
router.use('/api/translation', translationRoutes);
router.use('/api/users', userRoutes);
router.use('/api/payments', authMiddleware, paymentRoutes);

export default router;

