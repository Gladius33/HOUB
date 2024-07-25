import express from 'express';
import json from 'express';
import serveStatic from 'serve-static';
import connectDB from './config/db.js';
import config from 'config';
import { resolve } from 'path';

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

app.use('/index', indexRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/currencies', currencyRoutes);
app.use('/api/translations', translationRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/employers', employerRoutes);
app.use('/api/freelances', freelanceRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(resolve('client', 'build', 'index.html'));
  });
}

const PORT = get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
