-- Jalankan di Supabase SQL Editor
-- Update tabel jadwal_aspal supaya sesuai kolom di file "Jadwal Gelaran Aspal" asli

-- ruas_jalan_id dibikin nullable, karena nama paket pekerjaan di file asli
-- ("Pemeliharaan Berkala Ruas Jalan Parakancanggah - Kenteng") belum tentu
-- persis cocok sama data master ruas_jalan yang sudah ada. Kalau nanti mau
-- dihubungkan manual satu-satu, kolom ini bisa diisi belakangan.
alter table jadwal_aspal alter column ruas_jalan_id drop not null;

alter table jadwal_aspal
  add column if not exists nama_paket text,
  add column if not exists sta_mulai text,
  add column if not exists sta_selesai text,
  add column if not exists panjang_m numeric,
  add column if not exists lebar_m numeric,
  add column if not exists lokasi_maps_url text,
  add column if not exists kontak_person text;

comment on column jadwal_aspal.nama_paket is 'Nama paket pekerjaan dari file jadwal gelaran aspal, misal: Pemeliharaan Berkala Ruas Jalan A - B';
comment on column jadwal_aspal.sta_mulai is 'Titik awal STA, misal: 0+000';
comment on column jadwal_aspal.sta_selesai is 'Titik akhir STA, misal: 0+650';
