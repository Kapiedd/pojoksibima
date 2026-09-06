import BrandWordmark from './BrandWordmark';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5173';

const navLinks = [
  { href: '/#beranda', label: 'Beranda' },
  { href: '/tentang', label: 'Tentang Kami' },
  { href: '/paket-kontrak', label: 'Paket Bina Marga' },
  { href: '/jadwal-aspal', label: 'Jadwal Hotmix' },
  { href: '/buku-tamu', label: 'Buku Tamu' },
  { href: '/dokumentasi', label: 'Dokumentasi' },
  { href: '/#kontak', label: 'Kontak & Lokasi' },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={styles.footer}>
      {/* Wave transition or decorative top line */}
      <div style={styles.topBorder} />

      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Col 1: Brand & Bio */}
          <div style={styles.brandCol}>
            <div style={styles.brandRow}>
              <img
                src="/arjuna-logo.png"
                alt="Logo DPUPR"
                style={styles.logoImg}
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <div style={styles.brandName}><BrandWordmark /></div>
                <div style={styles.brandSub}>DPUPR Kab. Banjarnegara</div>
              </div>
            </div>
            <p style={styles.brandText}>
              Portal Sistem Informasi Bina Marga yang didedikasikan untuk transparansi anggaran, pemantauan
              jadwal pengaspalan, dan jembatan komunikasi aspirasi publik.
            </p>
            <div style={styles.taglineBadge}>
              ✨ Banjarnegara Maju Berbasis Pertanian
            </div>
          </div>

          {/* Col 2: Navigasi */}
          <div>
            <div style={styles.columnTitle}>Navigasi Portal</div>
            <ul style={styles.linkList}>
              {navLinks.map((item) => (
                <li key={item.href} style={styles.linkItem}>
                  <a href={item.href} style={styles.link}>
                    <span style={styles.linkArrow}>›</span> {item.label}
                  </a>
                </li>
              ))}
              <li style={styles.linkItem}>
                <a
                  href={ADMIN_URL}
                  target="_blank"
                  rel="noreferrer"
                  style={{ ...styles.link, color: 'var(--color-gold-light)', fontWeight: 600 }}
                >
                  <span style={styles.linkArrow}>›</span> Portal Admin 🔐
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Kontak & Layanan */}
          <div>
            <div style={styles.columnTitle}>Kontak &amp; Informasi</div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📍</span>
              <span style={styles.contactText}>
                Jl. Selamanik No. 16, Semampir, Banjarnegara, Jawa Tengah 53418
              </span>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>💬</span>
              <a href="https://wa.me/6282241093330" target="_blank" rel="noreferrer" style={styles.contactLink}>
                0822-4109-3330 (WA Pengaduan)
              </a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>📸</span>
              <a href="https://instagram.com/pojok.sibima" target="_blank" rel="noreferrer" style={styles.contactLink}>
                @pojok.sibima
              </a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>✉️</span>
              <a href="mailto:sibima.dpuprbna@gmail.com" style={styles.contactLink}>
                sibima.dpuprbna@gmail.com
              </a>
            </div>
            <div style={styles.contactItem}>
              <span style={styles.contactIcon}>⏰</span>
              <span style={styles.contactText}>
                Senin - Jumat | 07.30 - 16.00 WIB
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={styles.bottomBar}>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} DPUPR Kabupaten Banjarnegara — Bidang Bina Marga. Hak Cipta Dilindungi Undang-Undang.
          </p>
          <button onClick={scrollToTop} style={styles.backToTopBtn} aria-label="Kembali ke atas">
            ↑ Kembali ke Atas
          </button>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: 'linear-gradient(180deg, #0A192F 0%, #060D1A 100%)',
    color: 'rgba(255, 255, 255, 0.75)',
    position: 'relative',
    marginTop: 0,
  },
  topBorder: {
    height: 4,
    background: 'linear-gradient(90deg, var(--color-gold), var(--color-gold-light), var(--color-gold))',
  },
  container: {
    paddingTop: 64,
    paddingBottom: 32,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 40,
    paddingBottom: 48,
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  },
  brandCol: {
    maxWidth: 380,
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  logoImg: {
    width: 44,
    height: 44,
    objectFit: 'contain',
  },
  brandName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 700,
    color: '#ffffff',
    letterSpacing: '0.04em',
  },
  brandSub: {
    fontSize: '0.8rem',
    color: 'var(--color-gold-light)',
    letterSpacing: '0.02em',
  },
  brandText: {
    fontSize: '0.9rem',
    lineHeight: 1.6,
    color: 'rgba(255, 255, 255, 0.65)',
    margin: '0 0 16px',
  },
  taglineBadge: {
    display: 'inline-block',
    background: 'rgba(212, 175, 55, 0.12)',
    color: 'var(--color-gold-light)',
    border: '1px solid rgba(212, 175, 55, 0.25)',
    padding: '6px 14px',
    borderRadius: 20,
    fontSize: '0.82rem',
    fontWeight: 600,
  },
  columnTitle: {
    color: '#ffffff',
    fontSize: '1.05rem',
    fontWeight: 700,
    marginBottom: 20,
    position: 'relative',
    paddingBottom: 10,
    borderBottom: '2px solid var(--color-gold)',
    display: 'inline-block',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  linkItem: {
    margin: 0,
  },
  link: {
    color: 'rgba(255, 255, 255, 0.7)',
    textDecoration: 'none',
    fontSize: '0.92rem',
    transition: 'color 0.2s ease, transform 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
  linkArrow: {
    color: 'var(--color-gold)',
    fontWeight: 700,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 12,
    fontSize: '0.9rem',
  },
  contactIcon: {
    fontSize: '1rem',
    flexShrink: 0,
    marginTop: 2,
  },
  contactText: {
    lineHeight: 1.5,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  contactLink: {
    color: 'rgba(255, 255, 255, 0.85)',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  },
  bottomBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
    paddingTop: 24,
  },
  copyright: {
    margin: 0,
    fontSize: '0.84rem',
    color: 'rgba(255, 255, 255, 0.5)',
  },
  backToTopBtn: {
    background: 'rgba(255, 255, 255, 0.08)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'var(--color-gold-light)',
    padding: '8px 18px',
    borderRadius: 20,
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};
