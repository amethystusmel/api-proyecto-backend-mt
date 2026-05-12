const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

router.get('/', auth, getJobs);
router.get('/:id', auth, getJobById);
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;
