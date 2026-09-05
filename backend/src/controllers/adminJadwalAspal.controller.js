const supabase = require('../config/supabase');

// POST /api/admin/jadwal-aspal
async function createJadwalAspal(req, res) {
  try {
    const {
      nama_paket, tanggal_mulai, tanggal_selesai, status,
      sta_mulai, sta_selesai, panjang_m, lebar_m, lokasi_maps_url, kontak_person
    } = req.body;

    if (!nama_paket) {
      return res.status(400).json({ status: 'error', message: 'nama_paket wajib diisi' });
    }

    const { data, error } = await supabase
      .from('jadwal_aspal')
      .insert([{
        nama_paket, tanggal_mulai, tanggal_selesai, status,
        sta_mulai, sta_selesai, panjang_m, lebar_m, lokasi_maps_url, kontak_person
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ status: 'ok', data: data[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// PUT /api/admin/jadwal-aspal/:id
async function updateJadwalAspal(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('jadwal_aspal')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    if (!data.length) {
      return res.status(404).json({ status: 'error', message: 'Data tidak ditemukan' });
    }

    res.json({ status: 'ok', data: data[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// DELETE /api/admin/jadwal-aspal/:id
async function deleteJadwalAspal(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('jadwal_aspal').delete().eq('id', id);

    if (error) throw error;

    res.json({ status: 'ok', message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { createJadwalAspal, updateJadwalAspal, deleteJadwalAspal };
