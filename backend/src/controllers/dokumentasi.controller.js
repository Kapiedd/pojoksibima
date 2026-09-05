const supabase = require('../config/supabase');

const BUCKET_NAME = 'dokumentasi';

// GET /api/dokumentasi
// Publik -- ambil semua dokumentasi kegiatan, terbaru duluan
async function getDokumentasi(req, res) {
  try {
    const { kategori } = req.query;

    let query = supabase
      .from('dokumen')
      .select('*')
      .order('tanggal_kegiatan', { ascending: false });

    if (kategori) query = query.eq('kategori', kategori);

    const { data, error } = await query;
    if (error) throw error;

    res.json({ data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// POST /api/admin/dokumentasi
// Admin only -- upload foto kegiatan baru (multipart/form-data)
// Field file: "foto", field lain: judul, kategori, lokasi, keterangan, tanggal_kegiatan
async function createDokumentasi(req, res) {
  try {
    const { judul, kategori, lokasi, keterangan, tanggal_kegiatan } = req.body;

    if (!judul || !req.file) {
      return res.status(400).json({ status: 'error', message: 'judul dan foto wajib diisi' });
    }

    // Buat nama file unik supaya tidak bentrok antar upload
    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${fileExt}`;

    // Upload file ke Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype
      });

    if (uploadError) throw uploadError;

    // Ambil URL publik file yang baru diupload
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    const file_url = publicUrlData.publicUrl;

    // Simpan record ke tabel dokumen
    const { data, error } = await supabase
      .from('dokumen')
      .insert([{
        judul,
        kategori,
        lokasi,
        keterangan,
        tanggal_kegiatan,
        file_url,
        uploaded_by: req.user.userId
      }])
      .select();

    if (error) throw error;

    res.status(201).json({ status: 'ok', data: data[0] });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// DELETE /api/admin/dokumentasi/:id
// Admin only -- hapus dokumentasi (record + file di storage)
async function deleteDokumentasi(req, res) {
  try {
    const { id } = req.params;

    // Ambil dulu file_url-nya, supaya file di storage juga bisa dihapus
    const { data: existing, error: fetchError } = await supabase
      .from('dokumen')
      .select('file_url')
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    if (existing?.file_url) {
      const fileName = existing.file_url.split('/').pop();
      await supabase.storage.from(BUCKET_NAME).remove([fileName]);
    }

    const { error } = await supabase.from('dokumen').delete().eq('id', id);
    if (error) throw error;

    res.json({ status: 'ok', message: 'Dokumentasi berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { getDokumentasi, createDokumentasi, deleteDokumentasi };
