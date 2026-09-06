const quickLinks = [
  {
    href: '/manual',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: 'Manual Si BiMa',
    desc: 'Panduan lengkap pengoperasian dan cara membaca data pada portal informasi.',
    color: '#1e4d8c',
  },
  {
    href: '/paket-kontrak',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Paket Berkontrak Bina Marga',
    desc: 'Pantau daftar paket pengerjaan jalan, jembatan, dan trotoar aktif di wilayah Anda.',
    color: '#C9A227',
  },
  {
    href: '/jadwal-aspal',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: 'Jadwal Hotmix',
    desc: 'Lihat rincian tanggal, jam, dan lokasi gelaran aspal hotmix terbaru.',
    color: '#7A2E2E',
  },
  {
    href: '/dokumentasi',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    title: 'Dokumentasi',
    desc: 'Galeri foto dan video bukti pengerjaan infrastruktur langsung dari lapangan.',
    color: '#3d6b32',
  },
  {
    href: '/buku-tamu',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Buku Tamu',
    desc: 'Kirim kritik, saran, maupun aspirasi perbaikan infrastruktur jalan.',
    color: '#2E6B7A',
  },
  {
    href: '/tentang',
    icon: (
      <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Tentang Kami',
    desc: 'Kenali visi, misi, dan struktur organisasi lengkap DPUPR Kabupaten Banjarnegara.',
    color: '#5c3d8a',
  },
];

export default function AksesCepatSection() {
  return (
    <section id="akses-cepat" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <div className="section-label">Akses Cepat</div>
          <h2 style={styles.title}>Cari Informasi dengan Cepat</h2>
          <p style={styles.subtitle}>
            Gunakan menu navigasi instan berikut untuk langsung menuju ke pusat data pengerjaan Bina Marga.
          </p>
        </div>

        <div style={styles.grid}>
          {quickLinks.map((item) => (
            <a key={item.title} href={item.href} style={styles.card} className="quick-card">
              <div style={{ ...styles.iconWrap, background: `${item.color}15`, color: item.color }}>
                {item.icon}
              </div>
              <div style={styles.cardTitle}>{item.title}</div>
              <p style={styles.cardDesc}>{item.desc}</p>
              <div style={{ ...styles.arrow, color: item.color }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .quick-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--radius-lg);
          padding: 24px;
          text-decoration: none;
          color: var(--color-ink);
          transition: box-shadow 0.22s ease, transform 0.22s ease, border-color 0.22s ease;
        }
        .quick-card:hover {
          box-shadow: var(--shadow-md);
          transform: translateY(-3px);
          border-color: var(--color-gold-light);
        }
      `}</style>
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--color-bg)',
  },
  header: {
    marginBottom: 40,
    maxWidth: 520,
  },
  title: {
    marginBottom: 10,
  },
  subtitle: {
    color: 'var(--color-ink-soft)',
    margin: 0,
    fontSize: '1.02rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: 18,
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    marginBottom: 4,
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--color-ink)',
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.6,
    margin: 0,
    flex: 1,
  },
  arrow: {
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
  },
};
