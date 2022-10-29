const express = require('express');
const app = express()
const jobRoutes = require('./Job')
app.use('/jobs', jobRoutes)
module.exports = app;