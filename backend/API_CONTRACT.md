# API Contract — DPUPR App

Dokumen ini jadi kesepakatan antara backend & frontend soal bentuk data.
Kalau ada endpoint yang belum jadi di backend, frontend bisa pakai data dummy
sesuai struktur di bawah ini dulu, supaya kerja bisa paralel.

Base URL (development): `http://localhost:3000/api`

Status: 🟢 sudah jadi | 🟡 direncanakan (struktur bisa berubah dikit)

---

> Catatan: fitur Data Jalan (DD1), Data Jembatan (DD2), Spektek, dan SK Ruas
> Jalan TIDAK jadi dibuat -- data ini sudah tidak relevan/tidak di-maintain
> lagi menurut pemilik data (per obrolan tanggal 3 Sept 2026).

## Public

### 🟢 GET /test-db
Cek koneksi database (nanti dihapus setelah semua endpoint asli jalan).

### 🟢 GET /jadwal-aspal
Sudah jalan, ambil semua jadwal gelaran aspal, data asli (bukan dummy).
```json
{
  "data": [
    {
      "id": "uuid",
      "nama_paket": "Peningkatan Jalan Ruas Jalan Lawen - Pingitlor",
      "tanggal_mulai": "2026-08-21",
      "tanggal_selesai": "2026-08-21",
      "status": "Jadwal",
      "sta_mulai": "0+000",
      "sta_selesai": "0+650",
      "panjang_m": 650,
      "lebar_m": 4,
      "lokasi_maps_url": "https://maps.app.goo.gl/...",
      "kontak_person": "081234567890"
    }
  ]
}
```

### 🟡 GET /paket-kontrak?tahun=2026
List paket berkontrak Bina Marga (pengganti Google Sheet "Paket Berkontrak Bina Marga").
```json
{
  "data": [
    {
      "id": "uuid",
      "nama_paket": "...",
      "tahun": 2026,
      "nilai_kontrak": 500000000,
      "kontraktor": "...",
      "status": "berjalan",
      "keterangan": "..."
    }
  ]
}
```

### 🟢 GET /visitor-counter
Ambil total kunjungan saat ini.
```json
{ "total_kunjungan": 15234 }
```

### 🟢 POST /visitor-counter/increment
Tambah hitungan kunjungan (dipanggil sekali tiap halaman home dibuka).
```json
{ "status": "ok", "total_kunjungan": 15235 }
```

### 🟢 POST /buku-tamu
Request body:
```json
{ "nama": "...", "instansi": "...", "keperluan": "...", "kontak": "..." }
```
Response:
```json
{ "status": "ok", "message": "Terima kasih sudah mengisi buku tamu", "data": { "id": "uuid", "nama": "...", "..." } }
```
Field `nama` wajib diisi, field lain opsional.

---

## Admin (butuh login — pakai header `Authorization: Bearer <token>`)

### 🟢 POST /auth/login
```json
{ "username": "...", "password": "..." }
```
Response:
```json
{ "status": "ok", "token": "...", "user": { "id": "uuid", "username": "...", "role": "admin" } }
```
Simpan `token` di frontend (misal localStorage), lalu sertakan di setiap request admin lewat header:
`Authorization: Bearer <token>`. Token berlaku 7 hari.

### 🟢 CRUD /admin/paket-kontrak, /admin/jadwal-aspal
Semua butuh header `Authorization: Bearer <token>`.
- `POST /admin/paket-kontrak` -- tambah data baru. Body sesuai kolom tabel (nama_paket wajib).
- `PUT /admin/paket-kontrak/:id` -- update data (kirim field yang mau diubah saja).
- `DELETE /admin/paket-kontrak/:id` -- hapus data.
- Pola yang sama berlaku untuk `/admin/jadwal-aspal`.

### 🟢 GET /admin/buku-tamu
Lihat semua isian buku tamu. Butuh header `Authorization: Bearer <token>`.

### 🟢 GET /dokumentasi
Publik. Ambil semua dokumentasi kegiatan lapangan, terbaru duluan. Bisa difilter `?kategori=Hotmix`.
```json
{
  "data": [
    {
      "id": "uuid",
      "judul": "Pengaspalan Hotmix Ruas Jalan A - B",
      "kategori": "Hotmix",
      "lokasi": "Kecamatan Karangkobar",
      "keterangan": "...",
      "tanggal_kegiatan": "2026-08-28",
      "file_url": "https://.../dokumentasi/xxx.jpg"
    }
  ]
}
```

### 🟢 POST /admin/dokumentasi (upload foto kegiatan)
Butuh `Authorization: Bearer <token>`. Pakai `multipart/form-data`, bukan JSON.

Field:
- `foto` (file, wajib) — maksimal 5MB
- `judul` (text, wajib)
- `kategori`, `lokasi`, `keterangan`, `tanggal_kegiatan` (text/date, opsional)

### 🟢 DELETE /admin/dokumentasi/:id
Butuh `Authorization: Bearer <token>`. Menghapus record sekaligus file fotonya dari storage.

---

## Dashboard

### 🟢 GET /dashboard/statistik
Butuh header `Authorization: Bearer <token>`.
```json
{
  "total_paket_kontrak": 72,
  "total_jadwal_aspal_aktif": 5,
  "total_isian_buku_tamu": 1,
  "total_kunjungan_website": 1,
  "paket_kontrak_per_status": { "Berkontrak": 58, "SPPBJ": 6, "Pending": 5, "Selesai": 1 }
}
```

---

## Chatbot AI

### 🟢 POST /chatbot
```json
{ "pertanyaan": "kapan jadwal aspal ruas jalan lawen - pingitlor?" }
```
Response:
```json
{ "jawaban": "Jadwal gelaran aspal untuk ruas jalan Lawen - Pingitlor sedang dijadwalkan pada 21 Agustus 2026." }
```
Chatbot menjawab berdasarkan data jadwal_aspal & paket_kontrak yang ada di database (RAG sederhana berbasis deteksi kata kunci), plus info kontak statis. Pakai Gemini API (gratis), butuh `GEMINI_API_KEY` di `.env`. Setiap pertanyaan & jawaban otomatis disimpan ke tabel `chat_logs` untuk keperluan riwayat admin.

### 🟢 GET /admin/chat-logs
Lihat riwayat percakapan chatbot (200 terbaru). Butuh header `Authorization: Bearer <token>`.
```json
{ "data": [{ "id": "uuid", "pertanyaan": "...", "jawaban": "...", "created_at": "..." }] }
```

---

## Catatan
- Semua response error pakai format: `{ "status": "error", "message": "..." }`
- Field tanggal pakai format ISO 8601 (`YYYY-MM-DD`)
- Update dokumen ini tiap ada endpoint baru/berubah, biar frontend selalu sinkron
