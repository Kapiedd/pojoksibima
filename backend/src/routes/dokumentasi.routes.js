const express = require('express');
const multer = require('multer');
const router = express.Router();
const { requireAuth } = require('../middleware/auth.middleware');
const {
  getDokumentasi,
  createDokumentasi,
  deleteDokumentasi
} = require('../controllers/dokumentasi.controller');

// Simpan file di memory dulu (bukan di disk), langsung diteruskan ke Supabase
// Storage. Batasi ukuran maksimal 5MB per foto.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }
});

// Publik: siapa saja bisa lihat dokumentasi
router.get('/dokumentasi', getDokumentasi);

// Admin: upload & hapus dokumentasi (wajib login)
router.post('/admin/dokumentasi', requireAuth, upload.single('foto'), createDokumentasi);
router.delete('/admin/dokumentasi/:id', requireAuth, deleteDokumentasi);

module.exports = router;
