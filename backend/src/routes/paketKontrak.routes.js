const express = require('express');
const router = express.Router();
const { getPaketKontrak } = require('../controllers/paketKontrak.controller');

router.get('/paket-kontrak', getPaketKontrak);

module.exports = router;
