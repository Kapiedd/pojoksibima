// Sumber: Visi Misi RPJPD 2005-2025 Kabupaten Banjarnegara, Periode 4 / RPD 2023-2026.

export default function VisiMisiSection() {
  return (
    <section id="visi-misi" className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <h2>Visi & Misi</h2>
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 0 }}>
          RPJPD 2005–2025 Kabupaten Banjarnegara — Periode 4, RPD Tahun 2023–2026
        </p>
        <div className="batik-divider" />

        <div style={styles.visiCard}>
          <div style={styles.visiLabel}>Visi</div>
          <p style={styles.visiText}>&ldquo;Banjarnegara Maju Berbasis Pertanian&rdquo;</p>
        </div>

        <h3 style={{ marginTop: 44 }}>Misi</h3>
        <p style={{ color: 'var(--color-ink-soft)' }}>
          Misi yang terkait langsung dengan tugas pokok dan fungsi DPUPR Kabupaten
          Banjarnegara adalah Misi ke-4:
        </p>

        <blockquote style={styles.pullQuote}>
          Mewujudkan kuantitas dan kualitas sarana dan prasarana dasar yang ditandai dengan
          meningkatnya infrastruktur wilayah yang andal, sehingga dapat meningkatkan
          aksesibilitas dan mobilitas.
        </blockquote>

        <div style={styles.detailCard}>
          <p style={styles.detailParagraph}>
            Misi ini didukung oleh faktor-faktor yang mendorong berkembangnya aktivitas
            produksi, membuka isolasi daerah, serta membentuk kawasan-kawasan pertumbuhan baru.
          </p>
          <p style={styles.detailParagraph}>
            Selain itu, misi ini juga mencakup peningkatan perumahan rakyat layak huni beserta
            fasilitas pendukungnya untuk mewujudkan daerah tanpa permukiman kumuh, serta
            pemerataan kebutuhan prasarana dan sarana pelayanan dasar di seluruh wilayah
            perdesaan dan perkotaan.
          </p>
          <p style={{ ...styles.detailParagraph, marginBottom: 0 }}>
            Termasuk di dalamnya adalah peningkatan jaringan irigasi dan bendung dalam rangka
            menciptakan ketahanan pangan bagi masyarakat Banjarnegara.
          </p>
        </div>
      </div>
    </section>
  );
}

const styles = {
  visiCard: {
    background: 'var(--color-dark)',
    borderRadius: 'var(--radius)',
    padding: '32px 36px',
    textAlign: 'center'
  },
  visiLabel: {
    color: 'var(--color-gold-light)',
    fontWeight: 700,
    fontSize: '0.85rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  visiText: {
    color: 'var(--color-white)',
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    margin: 0,
    fontStyle: 'italic'
  },
  pullQuote: {
    margin: '20px 0',
    padding: '4px 0 4px 22px',
    borderLeft: '4px solid var(--color-gold)',
    fontFamily: 'var(--font-display)',
    fontSize: '1.15rem',
    fontWeight: 600,
    color: 'var(--color-maroon)',
    lineHeight: 1.5
  },
  detailCard: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '24px 28px'
  },
  detailParagraph: {
    lineHeight: 1.75,
    marginBottom: 16,
    color: 'var(--color-ink)'
  }
};
