import { useState } from 'react';

const ALAMAT = 'Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Banjarnegara';
const ALAMAT_LENGKAP = 'Jl. Mayor Jenderal DI Panjaitan No.13, Kutabanjarnegara, Kec. Banjarnegara, Kab. Banjarnegara, Jawa Tengah 53418';
const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${encodeURIComponent(ALAMAT_LENGKAP)}&output=embed`;

const kontakItems = [
  {
    id: 'whatsapp',
    label: 'WhatsApp Pengaduan',
    value: '0822-4109-3330',
    sub: 'Layanan Cepat & Tanggap',
    href: 'https://wa.me/6282241093330',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.073-2.124-.515-1.574-.645-2.618-2.228-2.701-2.337-.083-.109-.646-.86-.646-1.637 0-.776.406-1.159.55-1.317.144-.158.312-.198.416-.198.104 0 .208.002.298.006.096.004.225-.036.35.265.13.313.447 1.091.488 1.172.041.082.068.177.014.283-.054.107-.082.173-.162.268-.08.095-.169.212-.241.285-.083.084-.17.175-.073.342.097.167.433.714.928 1.155.637.568 1.174.744 1.341.827.167.083.265.069.364-.045.099-.115.426-.497.54-.667.114-.171.228-.142.384-.085.156.057.99.467 1.16.552.17.085.284.127.326.198.042.072.042.417-.102.822z" />
      </svg>
    ),
    color: '#25D366',
  },
  {
    id: 'instagram',
    label: 'Instagram Resmi',
    value: '@pojok.sibima',
    sub: 'Update Kegiatan & Informasi',
    href: 'https://instagram.com/pojok.sibima',
    icon: (
      <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: '#E1306C',
  },
  {
    id: 'email',
    label: 'Email Layanan',
    value: 'sibima.dpuprbna@gmail.com',
    sub: 'Korespondensi & Administrasi \u2022 Klik untuk salin',
    href: 'mailto:sibima.dpuprbna@gmail.com',
    copyValue: 'sibima.dpuprbna@gmail.com',
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    color: '#0A192F',
  },
  {
    id: 'jam',
    label: 'Jam Operasional',
    value: 'Senin - Jumat',
    sub: 'Senin\u2013Kamis 07.30\u201316.00 \u2022 Jumat 07.30\u201314.30 WIB',
    href: null,
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    color: '#D4AF37',
  },
];

export default function KontakSection() {
  const [copiedId, setCopiedId] = useState(null);

  function handleCopy(item) {
    if (!item.copyValue) return;
    navigator.clipboard.writeText(item.copyValue).then(() => {
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => { });
  }

  return (
    <section id="kontak" className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div style={styles.header}>
          <div className="section-label">Layanan &amp; Lokasi</div>
          <h2>Hubungi Bina Marga DPUPR</h2>
          <p style={styles.subtitle}>
            Salurkan pertanyaan, dan permohonan informasi teknis langsung bersama tim DPUPR Banjarnegara.
          </p>
          <div className="batik-divider" style={{ margin: '14px auto 36px' }} />
        </div>

        {/* Info Cards Grid */}
        <div style={styles.grid}>
          {kontakItems.map((item) => {
            const isCopied = copiedId === item.id;
            const Content = (
              <div style={styles.cardInner}>
                <div style={{ ...styles.iconBadge, backgroundColor: `${item.color}15`, color: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <div style={styles.itemLabel}>{item.label}</div>
                  <div style={styles.itemValue}>{item.value}</div>
                  <div style={styles.itemSub}>
                    {isCopied ? 'Tersalin ke clipboard!' : item.sub}
                  </div>
                </div>
              </div>
            );

            return item.href ? (
              <a
                key={item.id}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={styles.cardLink}
                onClick={() => handleCopy(item)}
              >
                {Content}
              </a>
            ) : (
              <div key={item.id} style={styles.cardStatic}>
                {Content}
              </div>
            );
          })}
        </div>

        {/* Map & Office Address */}
        <div style={styles.officeWrapper}>
          <div style={styles.officeHeader}>
            <div style={styles.officeIcon}>🏢</div>
            <div>
              <div style={styles.officeTitle}>{ALAMAT}</div>
              <p style={styles.officeAddress}>{ALAMAT_LENGKAP}</p>
            </div>
          </div>
          <div style={styles.mapContainer}>
            <iframe
              title="Lokasi Kantor DPUPR Banjarnegara"
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--color-surface)',
    paddingTop: 80,
    paddingBottom: 90,
  },
  header: {
    textAlign: 'center',
    maxWidth: 680,
    margin: '0 auto',
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '1rem',
    marginTop: 8,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 20,
    marginBottom: 44,
  },
  cardLink: {
    display: 'block',
    textDecoration: 'none',
    color: 'inherit',
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 16,
    padding: '22px 24px',
    transition: 'all 0.25s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  cardStatic: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 16,
    padding: '22px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
  },
  cardInner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
  },
  iconBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  itemLabel: {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--color-text-muted)',
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 4,
  },
  itemValue: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
    marginBottom: 2,
    wordBreak: 'break-word',
  },
  itemSub: {
    fontSize: '0.84rem',
    color: 'var(--color-text-secondary)',
  },
  officeWrapper: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
  },
  officeHeader: {
    padding: '24px 28px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    borderBottom: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
  },
  officeIcon: {
    fontSize: '2rem',
  },
  officeTitle: {
    fontSize: '1.15rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
  },
  officeAddress: {
    margin: '4px 0 0',
    fontSize: '0.9rem',
    color: 'var(--color-text-secondary)',
  },
  mapContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
  },
};
