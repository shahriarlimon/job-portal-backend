const express = require('express');
const { getJobs, getJobById } = require('../controllers/Job');
const { route } = require('./apiRoutes');
const router = express.Router();
router.get('/', getJobs)
router.get('/:id', getJobById)
module.exports = router;