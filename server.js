import express from 'express';
import json from 'express';
import serveStatic from 'serve-static';
import connectDB from './config/db.js';
import config from 'config';
import { resolve } from 'path';
import authMiddleware from './middleware/authMiddleware.js';
import adminAuth from './middleware/adminAuth.js';
import User from './models/User.js';
import Currency from './models/Currency.js';
import bcrypt from 'bcryptjs'; 

const app = express();
connectDB();

const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ userType: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('Admin@456', salt);
      const admin = new User({
        name: 'Admin',
        email: 'admin@houb.com',
        password: hashedPassword,
        userType: 'admin'
      });
      await admin.save();
      console.log('Default admin user created');
    } else {
      console.log('Admin user already exist.');
    }
  } catch (error) {
    console.error('Error creating default admin user:', error.message);
  }
};

const createDefaultCurrencies = async () => {
  try {
    const defaultCurrenciesExists = await Currency.find({ code: { $in: ['USD', 'EUR', 'RUB', 'BTC', 'XMR'] } });
    
    if (defaultCurrenciesExists.length === 0) {
      const defaultCurrencies = [
        { code: 'USD', name: 'United States Dollar', type: 'fiat', symbol: '$', exchangeRates: { EUR: 0.85, BTC: 0.00002 }, decimals: 2 },
        { code: 'EUR', name: 'Euro', type: 'fiat', symbol: '€', exchangeRates: { USD: 1.18, BTC: 0.000024 }, decimals: 2 },
        { code: 'RUB', name: 'Russian Ruble', type: 'fiat', symbol: '₽', exchangeRates: { USD: 0.013, BTC: 0.0000003 }, decimals: 2 },
        { code: 'BTC', name: 'Bitcoin', type: 'crypto', symbol: '₿', exchangeRates: { USD: 30000, EUR: 25000 }, decimals: 8 },
        { code: 'XMR', name: 'Monero', type: 'crypto', symbol: 'ɱ', exchangeRates: { USD: 200, EUR: 170 }, decimals: 8 },
      ];

      await Currency.insertMany(defaultCurrencies);
      console.log('Default currencies created');
    } else {
      console.log('Default currencies already exist.');
    }
  } catch (error) {
    console.error('Error creating default currencies:', error.message);
  }
};

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

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  createDefaultAdmin();
  createDefaultCurrencies();
});

