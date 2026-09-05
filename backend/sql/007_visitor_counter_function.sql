-- Jalankan di Supabase SQL Editor
-- Function buat nambah counter kunjungan secara atomic (aman dari race condition
-- kalau banyak orang buka web bersamaan)

create or replace function increment_visitor_counter()
returns bigint
language plpgsql
as $$
declare
  new_total bigint;
begin
  update visitor_counter
  set total_kunjungan = total_kunjungan + 1,
      updated_at = now()
  where id = 1
  returning total_kunjungan into new_total;

  return new_total;
end;
$$;
