import { useState, useEffect } from 'react';
import BrandWordmark from './BrandWordmark';

const links = [
  { href: '/#beranda',       label: 'Beranda' },
  { href: '/#tentang',       label: 'Tentang' },
  { href: '/#paket-kontrak', label: 'Paket Berkontrak Bina Marga' },
  { href: '/#jadwal-aspal',  label: 'Jadwal Hotmix' },
  { href: '/#dokumentasi',   label: 'Dokumentasi' },
  { href: '/#kontak',        label: 'Kontak' },
];

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5173';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Track active section based on scroll position
      const sections = links.map((l) => l.href.replace('/#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 130) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className={`navbar-header ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Brand */}
        <a href="/#beranda" style={styles.brand}>
          <img
            src="/arjuna-logo.png"
            alt="Logo Pojok Si BiMa"
            style={styles.logo}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
          <div style={styles.brandInfo}>
            <div style={styles.brandName}><BrandWordmark /></div>
            <div style={styles.brandSub}>SISTEM INFORMASI BINA MARGA</div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="navbar-nav" aria-label="Navigasi utama">
          {links.map((link) => {
            const sectionId = link.href.replace('/#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`navbar-link ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Tombol Buku Tamu (Menggantikan Tanya AI) -- disembunyikan di mobile,
              karena tombol yang sama sudah ada di dalam menu drawer mobile di bawah */}
          <a href="/#buku-tamu" className="btn-buku-tamu navbar-actions-desktop-only">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Buku Tamu</span>
          </a>

          {/* Tombol Login Admin -- sama, disembunyikan di mobile */}
          <a
            href={ADMIN_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-admin-login navbar-actions-desktop-only"
          >
            <span>Login Admin</span>
          </a>

          {/* Hamburger Menu for Mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="navbar-hamburger"
            aria-label="Buka menu navigasi"
            aria-expanded={menuOpen}
          >
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar1Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar2Open : {}) }} />
            <span style={{ ...styles.bar, ...(menuOpen ? styles.bar3Open : {}) }} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div style={styles.mobileMenu} role="navigation" aria-label="Menu navigasi mobile">
          <div className="container">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={styles.mobileLink}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
            <div style={styles.mobileActions}>
              <a
                href="/#buku-tamu"
                className="btn-buku-tamu"
                onClick={handleLinkClick}
                style={{ flex: 1, justifyContent: 'center', padding: '10px 16px' }}
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Buku Tamu</span>
              </a>
              <a
                href={ADMIN_URL}
                target="_blank"
                rel="noreferrer"
                className="btn-admin-login"
                style={{ flex: 1, justifyContent: 'center', padding: '10px 16px' }}
              >
                <span>Login Admin</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

const styles = {
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    textDecoration: 'none',
    flexShrink: 0,
  },
  logo: {
    width: 40,
    height: 40,
    objectFit: 'contain',
    borderRadius: 6,
  },
  brandInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    color: '#FFFFFF',
    fontSize: '1.02rem',
    fontWeight: 800,
    letterSpacing: '0.04em',
    lineHeight: 1.15,
  },
  brandSub: {
    color: 'var(--color-gold-light)',
    fontSize: '0.62rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    lineHeight: 1,
    marginTop: 3,
  },
  bar: {
    width: 22,
    height: 2,
    background: '#FFFFFF',
    borderRadius: 2,
    display: 'block',
    transition: 'transform 0.25s ease, opacity 0.25s ease',
  },
  bar1Open: { transform: 'rotate(45deg) translateY(10px)' },
  bar2Open: { opacity: 0 },
  bar3Open: { transform: 'rotate(-45deg) translateY(-10px)' },
  mobileMenu: {
    borderTop: '1px solid rgba(255,255,255,0.08)',
    padding: '16px 0 24px',
    background: 'rgba(18,16,14,0.98)',
    backdropFilter: 'blur(16px)',
  },
  mobileLink: {
    display: 'block',
    padding: '12px 6px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.96rem',
    fontWeight: 600,
    textDecoration: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    transition: 'color 0.2s',
  },
  mobileActions: {
    marginTop: 18,
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
};
