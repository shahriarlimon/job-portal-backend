const express = require('express');
const { getJobs, getJobById, applyToJob } = require('../controllers/Job');
const { verifyToken } = require('../middlewares/verifyToken');
const { route } = require('./apiRoutes');
const router = express.Router();
router.get('/', getJobs)
router.get('/:id', getJobById)
router.post("/:id/apply", verifyToken, applyToJob)
module.exports = router;