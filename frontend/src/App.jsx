import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatbotWidget from './components/ChatbotWidget';

import Home from './pages/Home';
import JadwalAspalPage from './pages/JadwalAspalPage';
import PaketKontrakPage from './pages/PaketKontrakPage';
import Manual from './pages/Manual';
import TentangPage from './pages/TentangPage';
import DokumentasiPage from './pages/DokumentasiPage';
import BukuTamuPage from './pages/BukuTamuPage';

// Home (route "/") sekarang cuma berisi: Hero, Info Hari Ini, Akses Cepat,
// cuplikan Tentang, dan Kontak (lihat pages/Home.jsx untuk penjelasan
// lengkap). Semua data lengkap/detail dipindah ke halaman masing-masing di
// bawah ini, supaya beranda tetap ringkas.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-aspal" element={<JadwalAspalPage />} />
        <Route path="/paket-kontrak" element={<PaketKontrakPage />} />
        <Route path="/manual" element={<Manual />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/dokumentasi" element={<DokumentasiPage />} />
        <Route path="/buku-tamu" element={<BukuTamuPage />} />
      </Routes>
      <ChatbotWidget />
    </BrowserRouter>
  );
}
