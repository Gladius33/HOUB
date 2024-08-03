import express from 'express';
const router = express.Router();
import { createChat, getChats, sendMessage } from '../../controllers/chatController.js';
import auth from '../../middleware/authMiddleware.js';

router.post('/chat', auth, createChat);
router.get('/chat', auth, getChats);
router.post('/message', auth, sendMessage);

const chatRoutes = router;
export default chatRoutes;

