import express from 'express';
import { createJob, getJobs, getJob } from '../../controllers/jobController.js';
import auth from '../../middleware/authMiddleware.js';

const router = express.Router();

router.post('/jobs', auth, async (req, res) => {
  try {
    const job = await createJob(req, res);
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/jobs', async (req, res) => {
  try {
    const jobs = await getJobs(req, res);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await getJob(req, res);
    res.json(job);
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

const jobRoutes = router;
export default jobRoutes;
