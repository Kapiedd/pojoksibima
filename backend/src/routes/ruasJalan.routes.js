const express = require('express');
const router = express.Router();
const { getRuasJalan } = require('../controllers/ruasJalan.controller');

router.get('/ruas-jalan', getRuasJalan);

module.exports = router;
