const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET /api/test-db -> cek koneksi ke Supabase berhasil atau tidak
router.get('/test-db', async (req, res) => {
  try {
    // ganti 'ruas_jalan' dengan nama tabel yang sudah kamu buat di Supabase
    const { data, error } = await supabase.from('ruas_jalan').select('*').limit(1);

    if (error) throw error;

    res.json({
      status: 'ok',
      message: 'Koneksi ke Supabase berhasil',
      sample_data: data
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
