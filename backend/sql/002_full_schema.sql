-- Jalankan di Supabase SQL Editor
-- Skema lengkap DPUPR (Pojok SiBIMA)

-- ================================
-- USERS (admin)
-- ================================
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  username text unique not null,
  password_hash text not null,
  role text not null default 'admin',
  created_at timestamptz default now()
);

alter table users enable row level security;

-- ================================
-- JEMBATAN (master — data tetap)
-- ================================
create table if not exists jembatan (
  id uuid primary key default gen_random_uuid(),
  nomor_jembatan text not null,
  nama_jembatan text not null,
  lokasi text,
  created_at timestamptz default now()
);

alter table jembatan enable row level security;

-- ================================
-- JEMBATAN_TAHUNAN (histori per tahun)
-- ================================
create table if not exists jembatan_tahunan (
  id uuid primary key default gen_random_uuid(),
  jembatan_id uuid not null references jembatan(id) on delete cascade,
  tahun_data int not null,
  panjang_m numeric,
  lebar_m numeric,
  kondisi text,
  jenis_konstruksi text,
  keterangan text,
  created_at timestamptz default now(),
  unique (jembatan_id, tahun_data)
);

alter table jembatan_tahunan enable row level security;

-- ================================
-- RUAS_JALAN_TAHUNAN (histori per tahun)
-- (tabel ruas_jalan sudah dibuat di 001_initial_schema.sql)
-- ================================
create table if not exists ruas_jalan_tahunan (
  id uuid primary key default gen_random_uuid(),
  ruas_jalan_id uuid not null references ruas_jalan(id) on delete cascade,
  tahun_data int not null,
  panjang_km numeric,
  lebar_m numeric,
  kondisi text,
  jenis_perkerasan text,
  keterangan text,
  created_at timestamptz default now(),
  unique (ruas_jalan_id, tahun_data)
);

alter table ruas_jalan_tahunan enable row level security;

-- ================================
-- SK_RUAS_JALAN
-- ================================
create table if not exists sk_ruas_jalan (
  id uuid primary key default gen_random_uuid(),
  tahun int not null,
  nomor_sk text not null,
  file_url text,
  tanggal_terbit date,
  created_at timestamptz default now()
);

alter table sk_ruas_jalan enable row level security;

-- ================================
-- SPEKTEK
-- ================================
create table if not exists spektek (
  id uuid primary key default gen_random_uuid(),
  kategori text not null check (kategori in ('spek', 'ahsp')),
  tahun_revisi int not null,
  file_url text,
  created_at timestamptz default now()
);

alter table spektek enable row level security;

-- ================================
-- DOKUMEN
-- ================================
create table if not exists dokumen (
  id uuid primary key default gen_random_uuid(),
  judul text not null,
  kategori text,
  file_url text,
  uploaded_by uuid references users(id),
  uploaded_at timestamptz default now()
);

alter table dokumen enable row level security;

-- ================================
-- BUKU_TAMU
-- ================================
create table if not exists buku_tamu (
  id uuid primary key default gen_random_uuid(),
  nama text not null,
  instansi text,
  keperluan text,
  kontak text, -- no_hp atau email
  created_at timestamptz default now()
);

alter table buku_tamu enable row level security;

-- ================================
-- PAKET_KONTRAK
-- ================================
create table if not exists paket_kontrak (
  id uuid primary key default gen_random_uuid(),
  nama_paket text not null,
  tahun int not null,
  nilai_kontrak numeric,
  kontraktor text,
  status text,
  keterangan text,
  created_at timestamptz default now()
);

alter table paket_kontrak enable row level security;

-- ================================
-- JADWAL_ASPAL
-- ================================
create table if not exists jadwal_aspal (
  id uuid primary key default gen_random_uuid(),
  ruas_jalan_id uuid not null references ruas_jalan(id) on delete cascade,
  tanggal_mulai date,
  tanggal_selesai date,
  status text,
  created_at timestamptz default now()
);

alter table jadwal_aspal enable row level security;

-- ================================
-- Index tambahan buat query per tahun (sering dipakai di halaman publik)
-- ================================
create index if not exists idx_ruas_jalan_tahunan_tahun on ruas_jalan_tahunan(tahun_data);
create index if not exists idx_jembatan_tahunan_tahun on jembatan_tahunan(tahun_data);
