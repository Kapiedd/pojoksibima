-- Jalankan di Supabase SQL Editor (opsional, buat testing endpoint /api/ruas-jalan)

-- Tambah 2 ruas jalan baru
insert into ruas_jalan (nomor_ruas, nama_ruas, kecamatan)
values
  ('002', 'Jalan Raya Sokaraja', 'Sokaraja'),
  ('003', 'Jalan Kembaran', 'Kembaran');

-- Isi data tahunan buat semua ruas jalan yang ada (tahun 2023)
insert into ruas_jalan_tahunan (ruas_jalan_id, tahun_data, panjang_km, lebar_m, kondisi, jenis_perkerasan, keterangan)
select id, 2023, 5.2, 6, 'baik', 'aspal', null
from ruas_jalan
where nomor_ruas = '001';

insert into ruas_jalan_tahunan (ruas_jalan_id, tahun_data, panjang_km, lebar_m, kondisi, jenis_perkerasan, keterangan)
select id, 2023, 3.8, 5, 'sedang', 'aspal', null
from ruas_jalan
where nomor_ruas = '002';

insert into ruas_jalan_tahunan (ruas_jalan_id, tahun_data, panjang_km, lebar_m, kondisi, jenis_perkerasan, keterangan)
select id, 2023, 2.1, 4, 'rusak_ringan', 'beton', null
from ruas_jalan
where nomor_ruas = '003';
