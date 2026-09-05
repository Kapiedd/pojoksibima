import { useEffect, useMemo, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { api } from '../api/client';

const statusColors = {
  Berkontrak: { bg: '#eef4ea', text: '#3d6b32' },
  Selesai: { bg: '#eef4ea', text: '#3d6b32' },
  Pending: { bg: '#fbf1de', text: '#8a6420' },
  SPPBJ: { bg: '#fbf1de', text: '#8a6420' }
};

export default function PaketKontrakPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('Semua');
  const [kategoriFilter, setKategoriFilter] = useState('Semua');

  useEffect(() => {
    api.getPaketKontrak()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const statusOptions = useMemo(
    () => ['Semua', ...new Set(data.map((d) => d.status).filter(Boolean))],
    [data]
  );
  const kategoriOptions = useMemo(
    () => ['Semua', ...new Set(data.map((d) => (d.kategori || '').replace('Sub Kegiatan ', '')).filter(Boolean))],
    [data]
  );

  const filtered = data.filter((item) => {
    const matchStatus = statusFilter === 'Semua' || item.status === statusFilter;
    const itemKategori = (item.kategori || '').replace('Sub Kegiatan ', '');
    const matchKategori = kategoriFilter === 'Semua' || itemKategori === kategoriFilter;
    return matchStatus && matchKategori;
  });

  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <a href="/" style={styles.backLink}>&larr; Kembali ke Beranda</a>
          <h1>Paket Kontrak Bina Marga</h1>
          <p style={{ color: 'var(--color-ink-soft)' }}>
            Menampilkan {filtered.length} dari {data.length} paket.
          </p>
          <div className="batik-divider" />

          <div style={styles.filters}>
            <select style={styles.select} value={kategoriFilter} onChange={(e) => setKategoriFilter(e.target.value)}>
              {kategoriOptions.map((k) => (
                <option key={k} value={k}>{k === 'Semua' ? 'Semua Kategori' : k}</option>
              ))}
            </select>
            <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              {statusOptions.map((s) => (
                <option key={s} value={s}>{s === 'Semua' ? 'Semua Status' : s}</option>
              ))}
            </select>
          </div>

          {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <div style={styles.grid}>
              {filtered.map((item) => {
                const color = statusColors[item.status] || { bg: '#f0f0f0', text: '#666' };
                return (
                  <div key={item.id} style={styles.card}>
                    <div style={styles.cardTitle}>{item.nama_paket}</div>
                    <div style={styles.cardMeta}>{(item.kategori || '').replace('Sub Kegiatan ', '')}</div>
                    <div style={styles.cardMeta}>Lokasi: {item.lokasi || '-'}</div>
                    <span style={{ ...styles.badge, background: color.bg, color: color.text }}>
                      {item.status || 'Belum diisi'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
}

const styles = {
  backLink: {
    display: 'inline-block',
    marginBottom: 16,
    color: 'var(--color-maroon)',
    fontWeight: 600,
    fontSize: '0.92rem'
  },
  filters: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    marginBottom: 8
  },
  select: {
    padding: '10px 14px',
    borderRadius: 'var(--radius)',
    border: '1.5px solid var(--color-border)',
    fontSize: '0.9rem',
    background: 'var(--color-white)'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 18,
    marginTop: 20
  },
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: 18,
    boxShadow: 'var(--shadow-sm)'
  },
  cardTitle: {
    fontWeight: 700,
    marginBottom: 6
  },
  cardMeta: {
    fontSize: '0.88rem',
    color: 'var(--color-ink-soft)',
    marginBottom: 4
  },
  badge: {
    display: 'inline-block',
    marginTop: 10,
    padding: '4px 12px',
    borderRadius: 20,
    fontSize: '0.8rem',
    fontWeight: 700
  }
};
