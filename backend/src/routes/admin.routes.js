const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');

const {
  createPaketKontrak,
  updatePaketKontrak,
  deletePaketKontrak
} = require('../controllers/adminPaketKontrak.controller');

const {
  createJadwalAspal,
  updateJadwalAspal,
  deleteJadwalAspal
} = require('../controllers/adminJadwalAspal.controller');

// Semua route di bawah ini wajib login (pakai requireAuth)

// Paket Kontrak
router.post('/admin/paket-kontrak', requireAuth, createPaketKontrak);
router.put('/admin/paket-kontrak/:id', requireAuth, updatePaketKontrak);
router.delete('/admin/paket-kontrak/:id', requireAuth, deletePaketKontrak);

// Jadwal Aspal
router.post('/admin/jadwal-aspal', requireAuth, createJadwalAspal);
router.put('/admin/jadwal-aspal/:id', requireAuth, updateJadwalAspal);
router.delete('/admin/jadwal-aspal/:id', requireAuth, deleteJadwalAspal);

module.exports = router;
