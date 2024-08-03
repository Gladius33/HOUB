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

const router = express.Router();

router.use('/api/admin', adminRoutes);
router.use('/api/auth/register', authRoutes);
router.use('/api/auth/login', authRoutes);
router.use('api/auth/profile', authRoutes);
router.use('/api/categories', categoryRoutes);
router.use('/api/chat', chatRoutes);
router.use('/api/message', chatRoutes);
router.use('/api/contact', contactRoutes);
router.use('/api/currencies', currencyRoutes);
router.use('/api/create-currency', currencyRoutes);
router.use('/api/update-rates', currencyRoutes);
router.use('/api/freelances', freelanceRoutes);
router.use('/api/freelances/:userId', freelanceRoutes);
router.use('/api/employers', employerRoutes);
router.use('/api/employers/:userId', employerRoutes);
router.use('/api/gigs', gigRoutes);
router.use('/api/gigs/:gigId', gigRoutes);
router.use('/api/jobs', jobRoutes);
router.use('/api/jobs/:id', jobRoutes);
router.use('/api/translations', translationRoutes);
router.use('/api/users', userRoutes);
router.use('/api/users/:userId', userRoutes);
router.use('/api/users/admin', userRoutes);
router.use('/api/users/payment-info', userRoutes);
router.use('/api/payments/create', paymentRoutes);
router.use('/api/payments/:id/status', paymentRoutes);

export default router;

