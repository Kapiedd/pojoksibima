const express = require('express');
const router = express.Router();
const { createBukuTamu, getAllBukuTamu } = require('../controllers/bukuTamu.controller');
const { requireAuth } = require('../middleware/auth.middleware');

// Publik: siapa aja bisa isi buku tamu
router.post('/buku-tamu', createBukuTamu);

// Admin: lihat semua isian (sekarang sudah diproteksi, wajib login)
router.get('/admin/buku-tamu', requireAuth, getAllBukuTamu);

module.exports = router;
