import express from 'express';
import { sendContactMessage }from '../../controllers/contactController.js';

const router = express.Router();

router.post('/contact', sendContactMessage);

const contactRoutes = router;
export default contactRoutes;

