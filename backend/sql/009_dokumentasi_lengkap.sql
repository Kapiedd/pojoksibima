-- Jalankan di Supabase SQL Editor
-- Update tabel dokumen supaya bisa menampung info dokumentasi kegiatan
-- lapangan secara lengkap (bukan cuma upload dokumen resmi).

alter table dokumen
  add column if not exists lokasi text,
  add column if not exists keterangan text,
  add column if not exists tanggal_kegiatan date;

comment on column dokumen.lokasi is 'Lokasi kegiatan, misal: Kecamatan Karangkobar';
comment on column dokumen.keterangan is 'Deskripsi singkat kegiatan yang didokumentasikan';
comment on column dokumen.tanggal_kegiatan is 'Tanggal kegiatan berlangsung (bisa beda dari tanggal upload)';

-- ================================
-- PENTING -- langkah manual di Supabase Dashboard (tidak bisa lewat SQL):
-- 1. Buka menu "Storage" di sidebar kiri Supabase Dashboard
-- 2. Klik "New bucket", beri nama: dokumentasi
-- 3. Aktifkan toggle "Public bucket" (supaya foto bisa diakses tanpa login)
-- 4. Klik "Create bucket"
-- Setelah itu, backend bisa upload foto ke bucket ini dan mendapatkan URL publik.
-- ================================
