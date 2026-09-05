import { useEffect, useState } from 'react';
import PageLayout from '../components/PageLayout';
import { api } from '../api/client';

function formatTanggal(tgl) {
  if (!tgl) return '-';
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function JadwalAspalPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getJadwalAspal()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      <section className="section">
        <div className="container">
          <a href="/" style={styles.backLink}>&larr; Kembali ke Beranda</a>
          <h1>Jadwal Gelaran Aspal (Hotmix)</h1>
          <p style={{ color: 'var(--color-ink-soft)' }}>
            Seluruh jadwal pengerjaan aspal per ruas jalan ({data.length} paket).
          </p>
          <div className="batik-divider" />

          {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}
          {loading ? (
            <p>Memuat data...</p>
          ) : (
            <div style={styles.tableWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Nama Paket</th>
                    <th style={styles.th}>Mulai</th>
                    <th style={styles.th}>Selesai</th>
                    <th style={styles.th}>Status</th>
                    <th style={styles.th}>STA</th>
                    <th style={styles.th}>Lokasi</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <tr key={item.id}>
                      <td style={styles.td}>{item.nama_paket}</td>
                      <td style={styles.td}>{formatTanggal(item.tanggal_mulai)}</td>
                      <td style={styles.td}>{formatTanggal(item.tanggal_selesai)}</td>
                      <td style={styles.td}>{item.status || '-'}</td>
                      <td style={styles.td}>
                        {item.sta_mulai && item.sta_selesai ? `${item.sta_mulai} - ${item.sta_selesai}` : '-'}
                      </td>
                      <td style={styles.td}>
                        {item.lokasi_maps_url ? (
                          <a href={item.lokasi_maps_url} target="_blank" rel="noreferrer" style={{ color: 'var(--color-maroon)', fontWeight: 600 }}>
                            Lihat peta
                          </a>
                        ) : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
  tableWrapper: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    overflowX: 'auto',
    marginTop: 24
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    minWidth: 700
  },
  th: {
    textAlign: 'left',
    padding: '14px 16px',
    background: 'var(--color-bg)',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.85rem',
    color: 'var(--color-ink-soft)'
  },
  td: {
    padding: '14px 16px',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.92rem'
  }
};
