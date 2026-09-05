# Frontend Publik - Pojok Si BiMa

Halaman publik website DPUPR (bisa diakses siapa saja, tanpa login). Dibuat
dengan React + Vite, sudah terhubung ke backend API.

**Struktur website ini SATU halaman panjang (scroll ke bawah)**, mirip gaya
Google Sites -- bukan berpindah-pindah halaman seperti aplikasi pada umumnya.
Menu di navbar akan otomatis scroll ke bagian terkait di halaman yang sama.

## Setup

1. Install dependencies
   ```
   npm install
   ```

2. Copy `.env.example` jadi `.env`.
   - `VITE_API_URL` -> alamat backend (default sudah pas untuk development lokal)
   - `VITE_ADMIN_URL` -> alamat admin panel, dipakai oleh tombol "Login Admin" di navbar

3. Jalankan
   ```
   npm run dev
   ```

4. Buka `http://localhost:5174`

Pastikan backend (folder `../backend`) juga sedang jalan di terminal terpisah.

## Struktur folder

```
src/
  api/client.js          -> semua fungsi pemanggilan API backend
  components/
    Navbar.jsx             -> menu atas, isinya link "#id-section" (scroll ke bagian itu)
    Footer.jsx             -> footer
    PageLayout.jsx          -> pembungkus (Navbar + konten + Footer)
    ChatbotWidget.jsx       -> tombol chat mengambang di pojok kanan bawah
  sections/                -> SATU FILE = SATU BAGIAN di halaman utama
    HeroSection.jsx           -> sapaan + pengenalan singkat (paling atas)
    JadwalAspalSection.jsx
    PaketKontrakSection.jsx
    BukuTamuSection.jsx
    StrukturOrganisasiSection.jsx
    VisiMisiSection.jsx
    KontakSection.jsx         -> kontak + peta lokasi
  pages/Home.jsx           -> menyusun semua section di atas, urutannya diatur di sini
  styles/global.css        -> semua warna & font (design tokens)
```

## Urutan section di halaman utama

Diatur di `src/pages/Home.jsx`, urutannya:

1. **Beranda** -- sapaan & pengenalan singkat
2. **Jadwal Aspal** -- data dari API
3. **Paket Kontrak** -- data dari API
4. **Buku Tamu** -- form, sudah bisa submit ke API (sengaja ditaruh sebelum
   Struktur Organisasi karena ini fitur yang paling sering dipakai pengunjung)
5. **Struktur Organisasi** -- **masih placeholder, isi kontennya dulu**
6. **Visi & Misi** -- **masih placeholder, isi kontennya dulu**
7. **Kontak** -- kontak + peta lokasi (**alamat masih placeholder, ganti di
   `sections/KontakSection.jsx`**)

Mau ubah urutan? Tinggal ubah urutan pemanggilan komponennya di `Home.jsx`.
Jangan lupa urutan link di `Navbar.jsx` ikut disesuaikan juga.

## Menambah section baru

1. Buat file baru di `src/sections/`, misal `MaklumatPelayananSection.jsx`
2. Bungkus dengan `<section id="maklumat-pelayanan" className="section">...</section>`
   -- `id` inilah yang dipakai untuk scroll dari navbar
3. Import dan panggil komponennya di `src/pages/Home.jsx`, taruh di urutan yang diinginkan
4. Tambahkan link baru `{ href: '#maklumat-pelayanan', label: 'Maklumat Pelayanan' }`
   di `src/components/Navbar.jsx`

## Tombol "Login Admin"

Tombol ini di navbar (kanan atas) mengarah ke aplikasi admin panel yang TERPISAH
(folder `../admin-panel`, project React sendiri). Alamatnya diatur lewat
`VITE_ADMIN_URL` di `.env`. Pengunjung biasa tidak akan diarahkan ke sana secara
tidak sengaja -- ini murni tautan biasa yang cuma dipakai kalau memang ingin
masuk sebagai admin.

## Kontrak API

Backend menyediakan endpoint-endpoint berikut (detail lengkap di
`../backend/API_CONTRACT.md`):

- `GET /paket-kontrak`
- `GET /jadwal-aspal`
- `POST /buku-tamu`
- `GET /visitor-counter` & `POST /visitor-counter/increment`
- `POST /chatbot`

Semua sudah dibungkus di `src/api/client.js`, tinggal panggil misalnya
`api.getPaketKontrak()` atau `api.submitBukuTamu(data)`.

## Desain

Tema warna & font disamakan dengan admin panel (folder `../admin-panel`):
emas (`--color-gold`) untuk aksen, hitam (`--color-dark`) untuk navbar/footer,
putih untuk latar konten. Semua didefinisikan sebagai CSS variable di
`src/styles/global.css`.
