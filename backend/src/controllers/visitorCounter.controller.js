const supabase = require('../config/supabase');

// GET /api/visitor-counter
async function getVisitorCounter(req, res) {
  try {
    const { data, error } = await supabase
      .from('visitor_counter')
      .select('total_kunjungan')
      .eq('id', 1)
      .single();

    if (error) throw error;

    res.json({ total_kunjungan: data.total_kunjungan });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// POST /api/visitor-counter/increment
// Dipanggil sekali tiap kali halaman home dibuka pengunjung
async function incrementVisitorCounter(req, res) {
  try {
    const { data, error } = await supabase.rpc('increment_visitor_counter');

    if (error) throw error;

    res.json({ status: 'ok', total_kunjungan: data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getVisitorCounter, incrementVisitorCounter };
