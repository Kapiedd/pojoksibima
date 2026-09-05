import { useEffect } from 'react';
import PageLayout from '../components/PageLayout';
import { api } from '../api/client';

import HeroSection from '../sections/HeroSection';
import AksesCepatSection from '../sections/AksesCepatSection';
import TentangKamiSection from '../sections/TentangKamiSection';
import PaketKontrakSection from '../sections/PaketKontrakSection';
import JadwalAspalSection from '../sections/JadwalAspalSection';
import BukuTamuSection from '../sections/BukuTamuSection';
import DokumentasiSection from '../sections/DokumentasiSection';
import KontakSection from '../sections/KontakSection';

export default function Home() {
  useEffect(() => {
    // Catat kunjungan HANYA sekali per sesi browser (bukan tiap reload halaman).
    // Pakai sessionStorage supaya reload/navigasi ulang di tab yang sama tidak
    // menambah hitungan berkali-kali -- baru dihitung lagi kalau buka tab/sesi baru.
    const alreadyCounted = sessionStorage.getItem('dpupr_visit_counted');
    if (!alreadyCounted) {
      api.incrementVisitorCounter()
        .then(() => sessionStorage.setItem('dpupr_visit_counted', '1'))
        .catch(() => {});
    }
  }, []);

  return (
    <PageLayout>
      {/* 1. Beranda Hero Section & Stats */}
      <HeroSection />

      {/* 2. Akses Cepat Kartu Navigasi */}
      <AksesCepatSection />

      {/* 3. Tentang Kami (Termasuk Visi Misi & Struktur Organisasi) */}
      <TentangKamiSection />

      {/* 4. Paket Kontrak Bina Marga (Tabel tanpa persentase progres) */}
      <PaketKontrakSection />

      {/* 5. Jadwal Aspal Hotmix (Tab Harian / Mingguan / Bulanan) */}
      <JadwalAspalSection />

      {/* 6. Buku Tamu & Aspirasi Publik */}
      <BukuTamuSection />

      {/* 7. Dokumentasi Kegiatan Lapangan */}
      <DokumentasiSection />

      {/* 8. Kontak & Lokasi Kantor DPUPR */}
      <KontakSection />
    </PageLayout>
  );
}
