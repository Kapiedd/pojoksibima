const supabase = require('../config/supabase');

// GET /api/paket-kontrak?tahun=2026&kategori=Rekonstruksi%20Jalan
async function getPaketKontrak(req, res) {
  try {
    const { tahun, kategori, status } = req.query;

    let query = supabase.from('paket_kontrak').select('*').order('kategori').order('nama_paket');

    if (tahun) query = query.eq('tahun', tahun);
    if (kategori) query = query.eq('kategori', kategori);
    if (status) query = query.eq('status', status);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getPaketKontrak };
