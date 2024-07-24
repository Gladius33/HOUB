const express = require('express');
const router = express.Router();
const { createChat, getChats, sendMessage } = require('../../controllers/chatController');
const auth = require('../../middleware/auth');

router.post('/', auth, createChat);
router.get('/', auth, getChats);
router.post('/message', auth, sendMessage);

module.exports = router;
