import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { api } from '../api/client';

function formatTanggal(tgl) {
  if (!tgl) return '-';
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function BukuTamu() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getBukuTamu()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Buku Tamu" description="Daftar pengunjung yang mengisi buku tamu di website">
      {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}

      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Belum ada yang mengisi buku tamu.</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nama</th>
                <th style={styles.th}>Instansi</th>
                <th style={styles.th}>Keperluan</th>
                <th style={styles.th}>Kontak</th>
                <th style={styles.th}>Waktu Mengisi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.nama}</td>
                  <td style={styles.td}>{item.instansi || '-'}</td>
                  <td style={styles.td}>{item.keperluan || '-'}</td>
                  <td style={styles.td}>{item.kontak || '-'}</td>
                  <td style={styles.td}>{formatTanggal(item.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}

const styles = {
  tableWrapper: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    textAlign: 'left',
    padding: '14px 18px',
    background: 'var(--color-bg)',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.85rem',
    color: 'var(--color-ink-soft)',
    fontWeight: 600
  },
  td: {
    padding: '14px 18px',
    borderBottom: '1px solid var(--color-border)',
    fontSize: '0.95rem'
  }
};
