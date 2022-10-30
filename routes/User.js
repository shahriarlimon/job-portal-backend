const express = require('express');
const { signup, login, getMe } = require('../controllers/User');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router()
router.post('/signup', signup)
router.post('/login', login)
router.get('/me', verifyToken, getMe)
module.exports = router;