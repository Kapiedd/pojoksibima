const supabase = require('../config/supabase');

// GET /api/jadwal-aspal
// Ambil semua jadwal gelaran aspal, diurutkan dari tanggal mulai terbaru
async function getJadwalAspal(req, res) {
  try {
    const { data, error } = await supabase
      .from('jadwal_aspal')
      .select('*')
      .order('tanggal_mulai', { ascending: false });

    if (error) throw error;

    res.json({ data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getJadwalAspal };
