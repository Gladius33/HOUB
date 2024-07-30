import express from 'express';
const router = express.Router();
import { createJob, getJobs, getJob } from '../../controllers/jobController.js';
import auth from '../../middleware/auth.js';

router.post('/', auth, createJob);
router.get('/', getJobs);
router.get('/:id', getJob);

const jobRoutes = router;
export default jobRoutes;

