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

const indexRoutes = express.Router();

indexRoutes.use('/api/admin', adminRoutes);
indexRoutes.use('/api/auth', authRoutes);
indexRoutes.use('/api/categories', categoryRoutes);
indexRoutes.use('/api/chats', chatRoutes);
indexRoutes.use('/api/contact', contactRoutes);
indexRoutes.use('/api/currencies', currencyRoutes);
indexRoutes.use('/api/freelances', freelanceRoutes);
indexRoutes.use('/api/employers', employerRoutes);
indexRoutes.use('/api/gigs', gigRoutes);
indexRoutes.use('/api/jobs', jobRoutes);
indexRoutes.use('/api/translation', translationRoutes);
indexRoutes.use('/api/users', userRoutes);

export default indexRoutes;

