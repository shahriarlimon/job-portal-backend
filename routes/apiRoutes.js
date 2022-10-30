const express = require('express');
const app = express()
const jobRoutes = require('./Job')
const userRoutes = require('./User')
app.use('/jobs', jobRoutes)
app.use("/user", userRoutes)
module.exports = app;