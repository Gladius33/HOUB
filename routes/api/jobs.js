import express from 'express';
import { createJob, getJobs, getJob } from '../../controllers/jobController.js';
import auth from '../../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

router.post('/jobs', auth, limiter, async (req, res) => {
  try {
    const job = await createJob(req, res);
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/jobs', limiter, async (req, res) => {
  try {
    const jobs = await getJobs(req, res);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/jobs/:id', limiter, async (req, res) => {
  try {
    const job = await getJob(req, res);
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const jobRoutes = router;
export default jobRoutes;
