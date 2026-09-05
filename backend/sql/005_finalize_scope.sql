-- Jalankan di Supabase SQL Editor
-- Migration 005: Menyesuaikan schema dengan scope final project
-- (DD1, DD2, Spektek, SK Ruas Jalan TIDAK jadi dipakai -- data ini
-- sudah tidak relevan/tidak di-maintain lagi menurut pemilik data)

-- Hapus tabel yang tidak jadi dipakai
drop table if exists ruas_jalan_tahunan cascade;
drop table if exists jembatan_tahunan cascade;
drop table if exists sk_ruas_jalan cascade;
drop table if exists spektek cascade;

-- jadwal_aspal sebelumnya punya FK opsional ke ruas_jalan, tapi ruas_jalan
-- mau dihapus juga karena tidak dipakai untuk apapun lagi
alter table jadwal_aspal drop constraint if exists jadwal_aspal_ruas_jalan_id_fkey;
alter table jadwal_aspal drop column if exists ruas_jalan_id;

drop table if exists ruas_jalan cascade;
drop table if exists jembatan cascade;

-- ================================
-- Tabel baru: visitor_counter
-- Penghitung jumlah kunjungan website (pengganti fitur "Penghitung Visitor"
-- di web lama). Cukup 1 baris, di-increment tiap ada yang buka halaman.
-- ================================
create table if not exists visitor_counter (
  id int primary key default 1,
  total_kunjungan bigint not null default 0,
  updated_at timestamptz default now(),
  constraint single_row check (id = 1)
);

insert into visitor_counter (id, total_kunjungan)
values (1, 0)
on conflict (id) do nothing;

alter table visitor_counter enable row level security;
