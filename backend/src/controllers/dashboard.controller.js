const supabase = require('../config/supabase');

// GET /api/dashboard/statistik
// Butuh login (admin only)
async function getStatistik(req, res) {
  try {
    const [
      paketKontrakResult,
      jadwalAspalAktifResult,
      bukuTamuResult,
      visitorResult,
      chatLogResult
    ] = await Promise.all([
      supabase.from('paket_kontrak').select('id', { count: 'exact', head: true }),
      supabase
        .from('jadwal_aspal')
        .select('id', { count: 'exact', head: true })
        .in('status', ['Jadwal', 'Off']), // anggap "aktif" = belum selesai
      supabase.from('buku_tamu').select('id', { count: 'exact', head: true }),
      supabase.from('visitor_counter').select('total_kunjungan').eq('id', 1).single(),
      supabase.from('chat_logs').select('id', { count: 'exact', head: true })
    ]);

    // Sekalian hitung sebaran status paket kontrak, berguna buat grafik di dashboard
    const { data: statusBreakdown } = await supabase.from('paket_kontrak').select('status');

    const kontrakPerStatus = {};
    (statusBreakdown || []).forEach((row) => {
      const status = row.status || 'Tidak diketahui';
      kontrakPerStatus[status] = (kontrakPerStatus[status] || 0) + 1;
    });

    res.json({
      total_paket_kontrak: paketKontrakResult.count || 0,
      total_jadwal_aspal_aktif: jadwalAspalAktifResult.count || 0,
      total_isian_buku_tamu: bukuTamuResult.count || 0,
      total_kunjungan_website: visitorResult.data?.total_kunjungan || 0,
      total_pertanyaan_chatbot: chatLogResult.count || 0,
      paket_kontrak_per_status: kontrakPerStatus
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getStatistik };
