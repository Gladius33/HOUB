import express from 'express';
const router = express.Router();
import { createChat, getChats, sendMessage } from '../../controllers/chatController.js';
import auth from '../../middleware/auth.js';

router.post('/', auth, createChat);
router.get('/', auth, getChats);
router.post('/message', auth, sendMessage);

const chatRoutes = router;
export default chatRoutes;

