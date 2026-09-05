-- Jalankan di Supabase SQL Editor
-- Tabel buat nyimpen history chat dengan chatbot AI, supaya admin bisa
-- lihat & periksa pertanyaan apa aja yang ditanyakan pengunjung.

create table if not exists chat_logs (
  id uuid primary key default gen_random_uuid(),
  pertanyaan text not null,
  jawaban text,
  created_at timestamptz default now()
);

alter table chat_logs enable row level security;

create index if not exists idx_chat_logs_created_at on chat_logs(created_at);
