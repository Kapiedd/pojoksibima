import { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { api } from '../api/client';

import HeroSection from '../sections/HeroSection';
import InfoHariIniSection from '../sections/InfoHariIniSection';
import AksesCepatSection from '../sections/AksesCepatSection';
import TentangTeaserSection from '../sections/TentangTeaserSection';
import KontakSection from '../sections/KontakSection';

// STRUKTUR BERANDA (disepakati bareng klien/ayah, jangan diubah urutannya
// tanpa didiskusikan lagi):
//   1. Hero            -- sapaan/welcome
//   2. Info Hari Ini    -- 1 baris info jadwal aspal yang berlangsung HARI INI
//   3. Akses Cepat      -- kartu navigasi ke semua halaman detail (Manual paling atas)
//   4. Tentang (cuplikan) -- teaser singkat + tombol "Selengkapnya" -> /tentang
//   5. Kontak           -- tetap full di beranda
//
// SENGAJA TIDAK ADA di Beranda lagi (supaya beranda ringkas, cuma nampung
// info "hari ini"): Paket Kontrak, Jadwal Aspal, Dokumentasi, dan Buku Tamu.
// Keempatnya sekarang jadi halaman sendiri, diakses lewat Akses Cepat/Navbar:
//   /paket-kontrak, /jadwal-aspal, /dokumentasi, /buku-tamu

export default function Home() {
  useEffect(() => {
    // Catat kunjungan HANYA sekali per sesi browser (bukan tiap reload halaman).
    const alreadyCounted = sessionStorage.getItem('dpupr_visit_counted');
    if (!alreadyCounted) {
      api.incrementVisitorCounter()
        .then(() => sessionStorage.setItem('dpupr_visit_counted', '1'))
        .catch(() => {});
    }
  }, []);

  return (
    <PageLayout>
      <HeroSection />
      <InfoHariIniSection />
      <AksesCepatSection />
      <TentangTeaserSection />
      <KontakSection />
    </PageLayout>
  );
}
