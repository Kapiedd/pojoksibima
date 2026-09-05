const express = require('express');
const router = express.Router();
const { getJadwalAspal } = require('../controllers/jadwalAspal.controller');

router.get('/jadwal-aspal', getJadwalAspal);

module.exports = router;
