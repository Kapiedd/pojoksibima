-- Jalankan di Supabase SQL Editor
-- Tabel master ruas jalan (data tetap, tidak berubah tiap tahun)

create table if not exists ruas_jalan (
  id uuid primary key default gen_random_uuid(),
  nomor_ruas text not null,
  nama_ruas text not null,
  kecamatan text,
  created_at timestamptz default now()
);

-- Data contoh buat testing koneksi
insert into ruas_jalan (nomor_ruas, nama_ruas, kecamatan)
values ('001', 'Jalan Contoh Testing', 'Kecamatan Contoh');
