# DPUPR App

Web app pengganti Pojok Si BiMa (Google Sites).

## Struktur

```
dpupr-app/
├── backend/     -> API (Node.js + Express + Supabase) — dikerjakan Kapid
├── frontend/    -> Tampilan web (React/Vue/dll) — dikerjakan Zildan
```

## Cara kerja bareng

1. **API_CONTRACT.md** (di folder `backend/`) adalah kesepakatan bentuk data
   antara backend dan frontend. Sebelum endpoint asli jadi, frontend bisa
   pakai data dummy sesuai struktur di file itu.
2. Backend jalan di `http://localhost:3000`, frontend jalan di port lain
   (misal `5173` kalau pakai Vite). CORS sudah diaktifkan di backend jadi
   nggak akan kena error cross-origin.
3. Kalau backend menambah/mengubah endpoint, update `API_CONTRACT.md` dulu
   biar frontend tau perubahannya.

## Setup Backend

Lihat `backend/README.md`.

## Setup Frontend

Lihat `frontend/README.md`.
