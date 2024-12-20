import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import config from 'config';
import router from './routes/index.js';
import serveStatic from 'serve-static';
import { resolve } from 'path';
import User from './models/User.js';
import Currency from './models/Currency.js';
import bcrypt from 'bcryptjs';
import authenticateJWT from './middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';
import lusca from 'lusca';

const app = express();
connectDB();

const allowedOrigins = [
  'http://192.168.1.171:8080',
  'http://192.168.1.171:8080/register',
  'http://192.168.1.171:8080/login',
  'http://192.168.1.171:8080/jobs',
  'http://192.168.1.171:8080/admin',
  'http://192.168.1.171:8080/chats',
  'http://127.0.0.1:8080',
  'http://127.0.0.1:8080/register',
  'http://127.0.0.1:8080/login',
  'http://127.0.0.1:8080/jobs',
  'http://127.0.0.1:8080/admin',
  'http://127.0.0.1:8080/chats'
];

const corsOptions = {
  origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true); // Origine autorisée
      } else {
          callback(new Error('Not allowed by CORS')); // Origine refusée
      }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(lusca.csrf());
app.use('/api', authenticateJWT, router);

// Rate limiter setup
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

// Apply rate limiter to all requests
app.use(limiter);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

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

if (process.env.NODE_ENV === 'production') {
  app.use(serveStatic('client/build'));
  app.get('*', limiter, (req, res) => {
    res.sendFile(resolve('client', 'build', 'index.html'));
  });
} else {
  app.get('*', (req, res) => {
    res.redirect('http://localhost:5000' + req.originalUrl);
  });
}

const PORT = config.get('port') || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
  createDefaultAdmin();
  createDefaultCurrencies();
});