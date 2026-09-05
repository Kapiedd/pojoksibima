const supabase = require('../config/supabase');

// GET /api/ruas-jalan?tahun=2023
// Ambil data ruas jalan gabungan sama data tahunannya (panjang, kondisi, dll)
async function getRuasJalan(req, res) {
  try {
    const { tahun } = req.query;

    if (!tahun) {
      return res.status(400).json({
        status: 'error',
        message: 'Parameter "tahun" wajib diisi, contoh: /api/ruas-jalan?tahun=2023'
      });
    }

    // Join ruas_jalan (master) dengan ruas_jalan_tahunan (histori)
    // pakai fitur nested select dari Supabase
    const { data, error } = await supabase
      .from('ruas_jalan')
      .select(`
        id,
        nomor_ruas,
        nama_ruas,
        kecamatan,
        ruas_jalan_tahunan!inner (
          tahun_data,
          panjang_km,
          lebar_m,
          kondisi,
          jenis_perkerasan,
          keterangan
        )
      `)
      .eq('ruas_jalan_tahunan.tahun_data', tahun);

    if (error) throw error;

    // Ratakan struktur data biar gampang dipakai frontend
    // (dari nested jadi flat sesuai format di API_CONTRACT.md)
    const formatted = data.map((item) => {
      const tahunan = item.ruas_jalan_tahunan[0] || {};
      return {
        id: item.id,
        nomor_ruas: item.nomor_ruas,
        nama_ruas: item.nama_ruas,
        kecamatan: item.kecamatan,
        tahun_data: tahunan.tahun_data,
        panjang_km: tahunan.panjang_km,
        lebar_m: tahunan.lebar_m,
        kondisi: tahunan.kondisi,
        jenis_perkerasan: tahunan.jenis_perkerasan,
        keterangan: tahunan.keterangan
      };
    });

    res.json({ data: formatted });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getRuasJalan };
