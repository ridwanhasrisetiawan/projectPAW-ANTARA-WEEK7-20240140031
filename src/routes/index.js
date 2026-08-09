const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const { sendSuccess } = require('../utils/ApiResponse');

// GET /api/health
router.get('/health', (req, res) => {
  return sendSuccess(res, {
    statusCode: 200,
    message: 'Server hidup',
    data: { uptime: process.uptime() },
  });
});

router.use('/auth', authRoutes);

module.exports = router;
