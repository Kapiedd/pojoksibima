import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatbotWidget from './components/ChatbotWidget';

import Home from './pages/Home';
import JadwalAspalPage from './pages/JadwalAspalPage';
import PaketKontrakPage from './pages/PaketKontrakPage';
import Manual from './pages/Manual';

// Home (route "/") tetap satu halaman panjang berisi banyak section
// (lihat pages/Home.jsx). Dua route tambahan di bawah ini khusus untuk
// menampilkan data LENGKAP (bukan cuma cuplikan) Jadwal Aspal & Paket
// Kontrak, karena datanya terlalu banyak untuk ditampilkan semua di beranda.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jadwal-aspal" element={<JadwalAspalPage />} />
        <Route path="/paket-kontrak" element={<PaketKontrakPage />} />
        <Route path="/manual" element={<Manual />} />
      </Routes>
      <ChatbotWidget />
    </BrowserRouter>
  );
}
