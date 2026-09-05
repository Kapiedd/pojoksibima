-- Jalankan di Supabase SQL Editor
-- Update tabel paket_kontrak supaya sesuai kolom di file
-- "PAKET BERKONTRAK BINA MARGA 2026" asli

alter table paket_kontrak
  add column if not exists kategori text,
  add column if not exists lokasi text;

comment on column paket_kontrak.kategori is 'Sub kegiatan, misal: Rekonstruksi Jalan, Rehabilitasi Jembatan, dst';
comment on column paket_kontrak.lokasi is 'Kecamatan lokasi pekerjaan, misal: Pagentan';

-- nilai_kontrak dan kontraktor dibiarkan ada di schema (untuk keperluan lain
-- di masa depan) tapi tidak diisi dari file ini karena datanya tidak tersedia
