import { useEffect, useState } from 'react';
import { api } from '../api/client';

const TABS = ['Minggu Ini', 'Bulan Ini'];

function formatTanggal(tgl) {
  if (!tgl) return '-';
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function isThisWeek(tgl) {
  if (!tgl) return false;
  const d = new Date(tgl);
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  return d >= startOfWeek && d <= endOfWeek;
}

function isThisMonth(tgl) {
  if (!tgl) return false;
  const d = new Date(tgl);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
}

function getStatusStyle(status) {
  const s = (status || '').toLowerCase();
  if (s === 'berlangsung' || s === 'sedang aktif') return { bg: '#eef4ea', color: '#3d6b32', label: 'Sedang Aktif' };
  if (s === 'selesai') return { bg: '#e8f0fb', color: '#1e4d8c', label: 'Selesai' };
  return { bg: '#fbf1de', color: '#8a6420', label: status || 'Dijadwalkan' };
}

function JadwalCard({ item }) {
  const malam = (item.jam_mulai || '').includes('22:') || (item.jam_mulai || '').includes('21:') || (item.jam_mulai || '').includes('23:');
  const sc = getStatusStyle(item.status);

  return (
    <div style={cardStyles.card}>
      {malam && (
        <div style={cardStyles.malamBadge}>
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
          PEKERJAAN MALAM HARI
        </div>
      )}
      <div style={cardStyles.dateRow}>
        <span style={cardStyles.date}>{formatTanggal(item.tanggal_mulai)}</span>
        <span style={{ ...cardStyles.statusBadge, background: sc.bg, color: sc.color }}>{sc.label}</span>
      </div>
      <div style={cardStyles.location}>{item.nama_paket || item.lokasi || 'Lokasi belum ditentukan'}</div>
      {item.kecamatan && <div style={cardStyles.kecamatan}>{item.kecamatan}</div>}
      <div style={cardStyles.footer}>
        <div style={cardStyles.jam}>
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
          </svg>
          {item.jam_mulai || '-'}{item.jam_selesai ? ` - ${item.jam_selesai}` : ''} WIB
        </div>
        <button style={cardStyles.detailBtn}>
          Rincian
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

const cardStyles = {
  card: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    transition: 'box-shadow 0.22s, transform 0.22s',
  },
  malamBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '3px 10px',
    background: '#1A1815',
    color: 'var(--color-gold-light)',
    borderRadius: 20,
    fontSize: '0.68rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    alignSelf: 'flex-start',
  },
  dateRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  date: {
    fontWeight: 700,
    fontSize: '0.9rem',
    color: 'var(--color-ink)',
  },
  statusBadge: {
    display: 'inline-block',
    padding: '3px 10px',
    borderRadius: 20,
    fontSize: '0.75rem',
    fontWeight: 700,
  },
  location: {
    fontWeight: 700,
    fontSize: '1rem',
    color: 'var(--color-ink)',
    lineHeight: 1.3,
  },
  kecamatan: {
    fontSize: '0.85rem',
    color: 'var(--color-ink-soft)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
    paddingTop: 10,
    borderTop: '1px solid var(--color-border-soft)',
  },
  jam: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: '0.85rem',
    color: 'var(--color-ink-soft)',
    fontWeight: 500,
  },
  detailBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: 'none',
    border: 'none',
    color: 'var(--color-maroon)',
    fontWeight: 700,
    fontSize: '0.82rem',
    cursor: 'pointer',
    padding: 0,
    fontFamily: 'var(--font-body)',
  },
};

export default function JadwalAspalSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    api.getJadwalAspal()
      .then((res) => setData(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = data.filter((item) => {
    const tgl = item.tanggal_mulai;
    if (activeTab === 0) return isThisWeek(tgl);
    return isThisMonth(tgl);
  });

  const display = filtered.slice(0, 6);

  return (
    <section id="jadwal-aspal" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.header}>
          <div>
            <div className="section-label">Jalan Mulus</div>
            <h2>Jadwal Gelaran Aspal (Hotmix)</h2>
            <p style={styles.subtitle}>
              Ketahui waktu pengerjaan aspal panas untuk menghindari potensi perlambatan lalu lintas harian.
            </p>
          </div>
        </div>
        <div className="batik-divider" />

        {/* Tabs */}
        <div style={styles.tabBar} role="tablist">
          {TABS.map((tab, i) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === i}
              onClick={() => setActiveTab(i)}
              style={{ ...styles.tab, ...(activeTab === i ? styles.tabActive : {}) }}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--color-ink-soft)' }}>
            Memuat jadwal...
          </div>
        ) : (
          <>
            {display.length === 0 ? (
              <div style={styles.emptyState}>
                <svg width="40" height="40" fill="none" stroke="var(--color-border)" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
                <p>Belum ada jadwal gelaran aspal untuk periode {activeTab === 0 ? 'minggu ini' : 'bulan ini'}.</p>
              </div>
            ) : (
              <div style={styles.grid}>
                {display.map((item, i) => (
                  <JadwalCard key={item.id || i} item={item} />
                ))}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <a href="/jadwal-aspal" className="btn btn-ghost" style={styles.moreLink}>
                Lihat Jadwal Lengkap
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { background: 'var(--color-bg)' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 0,
  },
  subtitle: { color: 'var(--color-ink-soft)', marginTop: 6, marginBottom: 0 },
  tabBar: {
    display: 'flex',
    gap: 4,
    marginBottom: 24,
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: 4,
    alignSelf: 'flex-start',
    width: 'fit-content',
  },
  tab: {
    padding: '8px 18px',
    borderRadius: 6,
    border: 'none',
    background: 'none',
    fontWeight: 600,
    fontSize: '0.88rem',
    color: 'var(--color-ink-soft)',
    cursor: 'pointer',
    transition: 'background 0.18s, color 0.18s',
    fontFamily: 'var(--font-body)',
  },
  tabActive: {
    background: 'var(--color-dark)',
    color: 'var(--color-white)',
    boxShadow: 'var(--shadow-sm)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
    gap: 16,
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px 0',
    color: 'var(--color-ink-soft)',
  },
  moreLink: {
    color: 'var(--color-maroon)',
    fontWeight: 700,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  },
};
