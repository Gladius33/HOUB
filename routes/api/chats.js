import express from 'express';
import { createChat, getChats, sendMessage } from '../../controllers/chatController.js';
import auth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/chat', auth, async (req, res) => {
  try {
    const chat = await createChat(req, res);
    res.json(chat);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/chat', auth, async (req, res) => {
  try {
    const chats = await getChats(req, res);
    res.json(chats);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.post('/message', auth, async (req, res) => {
  try {
    const message = await sendMessage(req, res);
    res.json(message);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

export default router;
