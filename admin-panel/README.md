# Admin Panel - Pojok Si BiMa

Panel admin untuk mengelola data website DPUPR (paket kontrak, jadwal aspal, buku tamu).
Dibuat dengan React + Vite, terhubung langsung ke backend API.

## Setup

1. Install dependencies
   ```
   npm install
   ```

2. Copy `.env.example` jadi `.env`. Kalau backend jalan di localhost:3000 (default),
   tidak perlu diubah. Kalau backend sudah di-deploy (misal ke Railway), ganti
   `VITE_API_URL` dengan URL backend yang sudah live.

3. Jalankan
   ```
   npm run dev
   ```

4. Buka `http://localhost:5173`, login pakai akun admin yang sudah dibuat
   lewat `node scripts/create-admin.js` di folder backend.

## Build untuk production

```
npm run build
```

Hasilnya ada di folder `dist/`, siap di-deploy ke hosting statis
(Vercel, Netlify, atau layanan sejenis).

## Fitur

- Login admin (terhubung ke `/api/auth/login`)
- Dashboard ringkasan statistik
- Kelola Paket Kontrak (tambah, ubah, hapus)
- Kelola Jadwal Gelaran Aspal (tambah, ubah, hapus)
- Lihat isian Buku Tamu

## Desain

Tema warna terinspirasi dari maskot Arjuna (wayang): emas untuk aksen utama,
hitam untuk sidebar/navigasi, putih untuk area konten -- dibuat sesederhana
mungkin supaya mudah dipakai oleh siapa saja, termasuk yang kurang terbiasa
dengan aplikasi web.
