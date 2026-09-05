# DPUPR App

## Setup

1. Install dependencies
   ```
   npm install
   ```

2. Copy `.env.example` jadi `.env`, isi dengan kredensial Supabase kamu
   (Supabase Dashboard > Project Settings > API)

3. Jalankan SQL di `sql/001_initial_schema.sql` lewat Supabase SQL Editor
   (bikin tabel `ruas_jalan` + 1 data contoh buat testing)

4. Jalankan server
   ```
   npm run dev
   ```

5. Buka `http://localhost:3000/api/test-db` di browser.
   Kalau muncul `"status": "ok"` dan ada `sample_data`, berarti koneksi ke Supabase sudah berhasil.

## Struktur folder

```
src/
  config/supabase.js     -> koneksi ke Supabase
  routes/                 -> definisi endpoint API
  controllers/            -> logic tiap endpoint (nanti diisi)
  middleware/             -> auth, validasi, dll (nanti diisi)
sql/                      -> file migrasi/schema SQL
```
