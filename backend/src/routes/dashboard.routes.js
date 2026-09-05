const express = require('express');
const router = express.Router();
const { getStatistik } = require('../controllers/dashboard.controller');
const { requireAuth } = require('../middleware/auth.middleware');

router.get('/dashboard/statistik', requireAuth, getStatistik);

module.exports = router;
