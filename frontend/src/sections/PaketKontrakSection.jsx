import { useEffect, useState, useMemo } from 'react';
import { api } from '../api/client';

const STATUS_CONFIG = {
  Berkontrak: { label: 'Berkontrak', cls: 'badge-green' },
  Berjalan:   { label: 'Berjalan',   cls: 'badge-green' },
  Selesai:    { label: 'Selesai',    cls: 'badge-green' },
  Persiapan:  { label: 'Persiapan', cls: 'badge-amber' },
  Pending:    { label: 'Pending',   cls: 'badge-amber' },
  SPPBJ:      { label: 'SPPBJ',     cls: 'badge-blue' },
};

const STATUS_OPTS = ['Semua', 'Berjalan', 'Berkontrak', 'Selesai', 'Persiapan', 'SPPBJ', 'Pending'];
const PAGE_SIZE = 6;

export default function PaketKontrakSection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('Semua');
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.getPaketKontrak()
      .then((res) => setData(res.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return data.filter((item) => {
      const matchSearch = !search || item.nama_paket?.toLowerCase().includes(search.toLowerCase());
      const matchStatus  = status  === 'Semua' || item.status === status;
      return matchSearch && matchStatus;
    });
  }, [data, search, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilter = (setter) => (e) => { setter(e.target.value); setPage(1); };

  return (
    <section id="paket-kontrak" className="section" style={styles.section}>
      <div className="container">
        <div className="section-label">Data Kontrak</div>
        <h2>Paket Berkontrak Bina Marga 2026</h2>
        <p style={styles.subtitle}>
          Berikut rincian pekerjaan aspal dan pemeliharaan sipil tahun anggaran 2026.
        </p>
        <div className="batik-divider" />

        {/* Filter Bar */}
        <div style={styles.filterBar}>
          <div style={styles.searchWrap}>
            <svg style={styles.searchIcon} width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input
              className="form-input"
              style={styles.searchInput}
              type="text"
              placeholder="Cari nama paket..."
              value={search}
              onChange={handleFilter(setSearch)}
              id="paket-search"
            />
          </div>
          <select
            className="form-input"
            style={styles.select}
            value={status}
            onChange={handleFilter(setStatus)}
            aria-label="Filter status"
          >
            {STATUS_OPTS.map((s) => <option key={s} value={s}>{s === 'Semua' ? 'Status: Semua' : s}</option>)}
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div style={styles.loadingBox}>
            <div style={styles.spinner} />
            <p style={{ marginTop: 12, color: 'var(--color-ink-soft)' }}>Memuat data paket...</p>
          </div>
        ) : (
          <>
            <div className="table-wrapper" style={{ overflowX: 'auto', marginTop: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Paket &amp; Rekanan</th>
                    <th>Lokasi</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paged.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={styles.emptyCell}>
                        Tidak ada paket yang sesuai filter.
                      </td>
                    </tr>
                  ) : (
                    paged.map((item, idx) => {
                      const sc = STATUS_CONFIG[item.status] || { label: item.status || '-', cls: 'badge-gray' };
                      return (
                        <tr key={item.id || idx}>
                          <td style={styles.tdNo}>{(page - 1) * PAGE_SIZE + idx + 1}</td>
                          <td>
                            <div style={styles.paketName}>{item.nama_paket}</div>
                            {item.kontraktor && (
                              <div style={styles.kontraktor}>Kontraktor: {item.kontraktor}</div>
                            )}
                          </td>
                          <td style={{ color: 'var(--color-ink-soft)', fontSize: '0.9rem' }}>
                            {item.lokasi || '-'}
                          </td>
                          <td>
                            <span className={`badge ${sc.cls}`}>{sc.label}</span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination & count */}
            <div style={styles.tableFooter}>
              <span style={styles.countText}>
                Menampilkan {Math.min((page-1)*PAGE_SIZE+1, filtered.length)}–{Math.min(page*PAGE_SIZE, filtered.length)} dari {filtered.length} paket pekerjaan
              </span>
              <div style={styles.pagination}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{ ...styles.pageBtn, ...(page === 1 ? styles.pageBtnDisabled : {}) }}
                >
                  Sebelumnya
                </button>
                <span style={styles.pageInfo}>{page} / {totalPages}</span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{ ...styles.pageBtn, ...(page === totalPages ? styles.pageBtnDisabled : {}) }}
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

const styles = {
  section: { background: 'var(--color-surface)' },
  subtitle: { color: 'var(--color-ink-soft)', marginTop: 0, marginBottom: 0 },
  filterBar: {
    display: 'flex',
    gap: 10,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 16,
  },
  searchWrap: {
    position: 'relative',
    flex: '1 1 220px',
    minWidth: 200,
  },
  searchIcon: {
    position: 'absolute',
    left: 14,
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'var(--color-ink-muted)',
    pointerEvents: 'none',
  },
  searchInput: {
    paddingLeft: 38,
    width: '100%',
  },
  select: {
    flex: '0 1 160px',
    minWidth: 130,
    maxWidth: 200,
  },
  loadingBox: {
    textAlign: 'center',
    padding: '48px 0',
  },
  spinner: {
    width: 36,
    height: 36,
    border: '3px solid var(--color-border)',
    borderTop: '3px solid var(--color-gold)',
    borderRadius: '50%',
    margin: '0 auto',
    animation: 'spin 0.8s linear infinite',
  },
  emptyCell: {
    textAlign: 'center',
    padding: '40px 0',
    color: 'var(--color-ink-soft)',
    fontStyle: 'italic',
  },
  tdNo: {
    color: 'var(--color-ink-muted)',
    fontWeight: 600,
    fontSize: '0.85rem',
    width: 36,
    textAlign: 'center',
  },
  paketName: { fontWeight: 700, fontSize: '0.95rem', marginBottom: 3 },
  kontraktor: { fontSize: '0.8rem', color: 'var(--color-ink-soft)' },
  tableFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    padding: '16px 0 0',
  },
  countText: { color: 'var(--color-ink-soft)', fontSize: '0.88rem' },
  pagination: { display: 'flex', gap: 8, alignItems: 'center' },
  pageBtn: {
    padding: '7px 16px',
    background: 'var(--color-surface)',
    border: '1.5px solid var(--color-border)',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.85rem',
    cursor: 'pointer',
    color: 'var(--color-ink)',
    transition: 'border-color 0.2s',
  },
  pageBtnDisabled: {
    opacity: 0.4,
    cursor: 'not-allowed',
  },
  pageInfo: {
    fontSize: '0.88rem',
    color: 'var(--color-ink-soft)',
    minWidth: 48,
    textAlign: 'center',
  },
};
