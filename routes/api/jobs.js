const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJob } = require('../../controllers/jobController');
const auth = require('../../middleware/auth').default;

router.post('/', auth, createJob);
router.get('/', getJobs);
router.get('/:id', getJob);

export default router;
