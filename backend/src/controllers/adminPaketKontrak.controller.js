const supabase = require('../config/supabase');

// POST /api/admin/paket-kontrak
async function createPaketKontrak(req, res) {
  try {
    const { nama_paket, kategori, lokasi, status, tahun, nilai_kontrak, kontraktor, keterangan } = req.body;

    if (!nama_paket) {
      return res.status(400).json({ status: 'error', message: 'nama_paket wajib diisi' });
    }

    const { data, error } = await supabase
      .from('paket_kontrak')
      .insert([{ nama_paket, kategori, lokasi, status, tahun, nilai_kontrak, kontraktor, keterangan }])
      .select();

    if (error) throw error;

    res.status(201).json({ status: 'ok', data: data[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// PUT /api/admin/paket-kontrak/:id
async function updatePaketKontrak(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('paket_kontrak')
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

// DELETE /api/admin/paket-kontrak/:id
async function deletePaketKontrak(req, res) {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('paket_kontrak').delete().eq('id', id);

    if (error) throw error;

    res.json({ status: 'ok', message: 'Data berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { createPaketKontrak, updatePaketKontrak, deletePaketKontrak };
