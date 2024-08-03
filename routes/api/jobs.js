import express from 'express';
const router = express.Router();
import { createJob, getJobs, getJob } from '../../controllers/jobController.js';
import auth from '../../middleware/authMiddleware.js';

router.post('/jobs', auth, createJob);
router.get('/jobs', getJobs);
router.get('/jobs/:id', getJob);

const jobRoutes = router;
export default jobRoutes;

