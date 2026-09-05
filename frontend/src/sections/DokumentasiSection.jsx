import { useEffect, useState } from 'react';
import { api } from '../api/client';

function formatTanggal(tgl) {
  if (!tgl) return null;
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function DokumentasiSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    api.getDokumentasi()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const kategoriTabs = ['Semua', ...new Set(data.map((d) => d.kategori).filter(Boolean))];

  const filtered = activeTab === 'Semua'
    ? data
    : data.filter((d) => d.kategori === activeTab);

  return (
    <section id="dokumentasi" className="section" style={styles.section}>
      <div className="container">
        {/* Header */}
        <div style={styles.headerArea}>
          <div>
            <div className="section-label">Galeri Lapangan</div>
            <h2>Dokumentasi Kegiatan Bina Marga</h2>
            <p style={styles.subtitle}>
              Potret transparansi pengerjaan infrastruktur jalan, jembatan, dan drainase di Kabupaten Banjarnegara.
            </p>
          </div>

          {/* Filter tabs */}
          {kategoriTabs.length > 1 && (
            <div style={styles.tabsWrapper}>
              {kategoriTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    ...styles.tabBtn,
                    ...(activeTab === tab ? styles.tabBtnActive : {})
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="batik-divider" style={{ marginBottom: 32 }} />

        {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}

        {loading ? (
          <p>Memuat dokumentasi...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--color-text-secondary)' }}>
            Belum ada dokumentasi kegiatan yang diunggah.
          </p>
        ) : (
        <div style={styles.grid}>
          {filtered.map((item) => (
            <div
              key={item.id}
              style={styles.card}
              onClick={() => setSelectedItem(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
            >
              <div style={styles.imgWrapper}>
                <img
                  src={item.file_url}
                  alt={item.judul}
                  style={styles.img}
                  loading="lazy"
                />
                {item.kategori && <span style={styles.badgeKategori}>{item.kategori}</span>}
                <div style={styles.overlayHover}>
                  <span style={styles.overlayIcon}>🔍 Lihat Foto</span>
                </div>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.metaRow}>
                  {item.tanggal_kegiatan && <span>📅 {formatTanggal(item.tanggal_kegiatan)}</span>}
                  {item.lokasi && <span>📍 {item.lokasi}</span>}
                </div>
                <h3 style={styles.cardTitle}>{item.judul}</h3>
                {item.keterangan && <p style={styles.cardDesc}>{item.keterangan}</p>}
              </div>
            </div>
          ))}
        </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div style={styles.modalBackdrop} onClick={() => setSelectedItem(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.modalClose}
              onClick={() => setSelectedItem(null)}
              aria-label="Tutup"
            >
              ✕
            </button>
            <img
              src={selectedItem.file_url}
              alt={selectedItem.judul}
              style={styles.modalImg}
            />
            <div style={styles.modalInfo}>
              {selectedItem.kategori && <span style={styles.badgeKategori}>{selectedItem.kategori}</span>}
              <h3 style={{ margin: '10px 0 6px', color: 'var(--color-navy)' }}>
                {selectedItem.judul}
              </h3>
              <div style={{ ...styles.metaRow, marginBottom: 12 }}>
                {selectedItem.tanggal_kegiatan && <span>📅 {formatTanggal(selectedItem.tanggal_kegiatan)}</span>}
                {selectedItem.lokasi && <span>📍 {selectedItem.lokasi}</span>}
              </div>
              {selectedItem.keterangan && (
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {selectedItem.keterangan}
              </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--color-bg)',
    paddingTop: 80,
    paddingBottom: 80,
  },
  headerArea: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 20,
    marginBottom: 24,
  },
  subtitle: {
    color: 'var(--color-text-secondary)',
    fontSize: '1rem',
    marginTop: 6,
    maxWidth: 580,
  },
  tabsWrapper: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    background: 'var(--color-surface)',
    padding: '6px',
    borderRadius: 12,
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    border: '1px solid var(--color-border)',
  },
  tabBtn: {
    background: 'transparent',
    border: 'none',
    padding: '8px 18px',
    borderRadius: 8,
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
  tabBtnActive: {
    background: 'var(--color-navy)',
    color: 'var(--color-gold-light)',
    boxShadow: '0 2px 6px rgba(10,25,47,0.2)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: 24,
  },
  card: {
    background: 'var(--color-surface)',
    borderRadius: 16,
    overflow: 'hidden',
    border: '1px solid var(--color-border)',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    cursor: 'pointer',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    display: 'flex',
    flexDirection: 'column',
  },
  imgWrapper: {
    position: 'relative',
    height: 210,
    overflow: 'hidden',
    background: '#1a202c',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.4s ease',
  },
  badgeKategori: {
    position: 'absolute',
    top: 14,
    left: 14,
    background: 'rgba(10, 25, 47, 0.85)',
    color: 'var(--color-gold-light)',
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: '0.78rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(212, 175, 55, 0.3)',
  },
  overlayHover: {
    position: 'absolute',
    inset: 0,
    background: 'rgba(10, 25, 47, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.25s ease',
  },
  overlayIcon: {
    background: 'var(--color-white)',
    color: 'var(--color-navy)',
    padding: '8px 16px',
    borderRadius: 20,
    fontWeight: 700,
    fontSize: '0.85rem',
  },
  cardBody: {
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
  metaRow: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '0.82rem',
    color: 'var(--color-text-muted)',
    marginBottom: 8,
    gap: 8,
    flexWrap: 'wrap',
  },
  cardTitle: {
    fontSize: '1.05rem',
    fontWeight: 700,
    color: 'var(--color-navy)',
    lineHeight: 1.4,
    marginBottom: 8,
  },
  cardDesc: {
    fontSize: '0.88rem',
    color: 'var(--color-text-secondary)',
    lineHeight: 1.5,
    margin: 0,
  },
  modalBackdrop: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.75)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: 20,
    backdropFilter: 'blur(4px)',
  },
  modalContent: {
    background: 'var(--color-surface)',
    borderRadius: 20,
    overflow: 'hidden',
    maxWidth: 720,
    width: '100%',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    position: 'relative',
    animation: 'scaleIn 0.2s ease-out',
  },
  modalClose: {
    position: 'absolute',
    top: 14,
    right: 14,
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    border: 'none',
    width: 36,
    height: 36,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  modalImg: {
    width: '100%',
    height: 380,
    objectFit: 'cover',
  },
  modalInfo: {
    padding: 24,
  },
};
