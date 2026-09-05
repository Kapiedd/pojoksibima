const supabase = require('../config/supabase');

// POST /api/buku-tamu
// Body: { nama, instansi, keperluan, kontak }
async function createBukuTamu(req, res) {
  try {
    const { nama, instansi, keperluan, kontak } = req.body;

    if (!nama || !nama.trim()) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama wajib diisi'
      });
    }

    const { data, error } = await supabase
      .from('buku_tamu')
      .insert([{ nama, instansi, keperluan, kontak }])
      .select();

    if (error) throw error;

    res.status(201).json({
      status: 'ok',
      message: 'Terima kasih sudah mengisi buku tamu',
      data: data[0]
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// GET /api/admin/buku-tamu
// Untuk admin melihat semua isian buku tamu, terbaru duluan
async function getAllBukuTamu(req, res) {
  try {
    const { data, error } = await supabase
      .from('buku_tamu')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json({ data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { createBukuTamu, getAllBukuTamu };
