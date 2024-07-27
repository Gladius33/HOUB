import express from 'express';
import json from 'express';
import serveStatic from 'serve-static';
import connectDB from './config/db.js';
import config from 'config';
import { resolve } from 'path';
import authMiddleware from './middleware/authMiddleware.js';
import adminAuth from './middleware/adminAuth.js';

const { get } = config;
const app = express();
connectDB();

app.use(json({ extended: false }));

import indexRoutes from './routes/index.js';
import userRoutes from './routes/api/users.js';
import authRoutes from './routes/api/auth.js';
import gigRoutes from './routes/api/gigs.js';
import jobRoutes from './routes/api/jobs.js';
import categoryRoutes from './routes/api/categories.js';
import contactRoutes from './routes/api/contact.js';
import currencyRoutes from './routes/api/currencies.js';
import translationRoutes from './routes/api/translation.js';
import chatRoutes from './routes/api/chats.js';
import adminRoutes from './routes/api/admin.js';
import employerRoutes from './routes/api/employers.js';
import freelanceRoutes from './routes/api/freelances.js';
import paymentRoutes from './routes/api/payment.js';

app.use('/index', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authMiddleware, authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/translations', translationRoutes);
app.use('/api/chats', authMiddleware, chatRoutes);
app.use('/api/admin', adminAuth, adminRoutes);
app.use('/api/employers', authMiddleware, employerRoutes);
app.use('/api/freelances', authMiddleware, freelanceRoutes);
app.use('/api/payments', authMiddleware, paymentRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(resolve('client', 'build', 'index.html'));
  });
}

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
