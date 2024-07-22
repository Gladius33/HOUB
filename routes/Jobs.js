const express = require('express');
const router = express.Router();
const { createJob, getJobs, getJob } = require('../controllers/jobController');
const auth = require('../middleware/auth');

router.post('/', auth, createJob);
router.get('/', getJobs);
router.get('/:id', getJob);

module.exports = router;
