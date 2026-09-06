// Versi CUPLIKAN dari "Tentang Pojok Si BiMa" -- khusus dipasang di Beranda.
// Isi lengkapnya (Visi Misi + Struktur Organisasi) ada di halaman /tentang
// (lihat sections/TentangKamiSection.jsx & pages/TentangPage.jsx), supaya
// Beranda tidak kepanjangan.

export default function TentangTeaserSection() {
  return (
    <section id="tentang" className="section" style={styles.section}>
      <div className="container" style={styles.wrap}>
        <div className="section-label">Tentang Kami</div>
        <h2>Tentang Pojok Si BiMa</h2>
        <p style={styles.subtitle}>Pusat Keterbukaan Informasi Jalan &amp; Jembatan Daerah Anda</p>
        <div className="batik-divider" />
        <p style={styles.para}>
          Pojok Si BiMa merupakan inisiasi strategis dari Bidang Bina Marga untuk mewujudkan tata kelola
          pemerintahan yang bersih dan transparan, mencakup visi &amp; misi dinas serta struktur organisasi
          lengkap DPUPR Kabupaten Banjarnegara.
        </p>
        <a href="/tentang" className="btn btn-primary" style={styles.button}>
          Selengkapnya
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--color-bg)',
  },
  wrap: {
    maxWidth: 720,
  },
  subtitle: {
    color: 'var(--color-maroon)',
    fontWeight: 600,
    fontSize: '1.05rem',
    marginBottom: 16,
    marginTop: -4,
  },
  para: {
    color: 'var(--color-ink-soft)',
    lineHeight: 1.8,
    marginBottom: 24,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  },
};
