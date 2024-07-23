const express = require('express');
const router = express.Router();

// Define Routes
router.use('/api/admin', require('./api/admin'));
router.use('/api/auth', require('./api/auth'));
router.use('/api/categories', require('./api/categories'));
router.use('/api/chats', require('./api/chats'));
router.use('/api/contact', require('./api/contact'));
router.use('/api/currencies', require('./api/currencies'));
router.use('/api/freelances', require('./api/freelances'));
router.use('/api/employers', require('./api/employers'));
router.use('/api/gigs', require('./api/gigs'));
router.use('/api/jobs', require('./api/jobs'));
router.use('/api/translation', require('./api/translation'));
router.use('/api/users', require('./api/users'));
module.exports = router;
