import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import StatCard from '../components/StatCard';
import { api } from '../api/client';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getStatistik().then(setStats).catch((e) => setError(e.message));
  }, []);

  return (
    <AdminLayout
      title="Selamat datang kembali"
      description="Ringkasan data website Pojok Si BiMa"
    >
      {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}

      {stats && (
        <>
          <div style={styles.grid}>
            <StatCard label="Total paket kontrak" value={stats.total_paket_kontrak} />
            <StatCard label="Jadwal aspal aktif" value={stats.total_jadwal_aspal_aktif} accent="var(--color-maroon)" />
            <StatCard label="Isian buku tamu" value={stats.total_isian_buku_tamu} />
            <StatCard label="Kunjungan website" value={stats.total_kunjungan_website} />
            <StatCard label="Pertanyaan ke chatbot" value={stats.total_pertanyaan_chatbot} accent="#5b8a72" />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Sebaran status paket kontrak</h2>
            <div style={styles.statusList}>
              {Object.entries(stats.paket_kontrak_per_status || {}).map(([status, count]) => (
                <div key={status} style={styles.statusRow}>
                  <span style={styles.statusLabel}>{status}</span>
                  <div style={styles.barTrack}>
                    <div
                      style={{
                        ...styles.barFill,
                        width: `${(count / stats.total_paket_kontrak) * 100}%`
                      }}
                    />
                  </div>
                  <span style={styles.statusCount}>{count}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AdminLayout>
  );
}

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 20,
    marginBottom: 36
  },
  section: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    padding: '24px 28px'
  },
  sectionTitle: {
    fontSize: '1.2rem',
    marginBottom: 20
  },
  statusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  statusRow: {
    display: 'grid',
    gridTemplateColumns: '140px 1fr 40px',
    alignItems: 'center',
    gap: 14
  },
  statusLabel: {
    fontWeight: 600,
    fontSize: '0.95rem'
  },
  barTrack: {
    height: 12,
    background: 'var(--color-bg)',
    borderRadius: 6,
    overflow: 'hidden',
    border: '1px solid var(--color-border)'
  },
  barFill: {
    height: '100%',
    background: 'var(--color-gold)'
  },
  statusCount: {
    fontWeight: 700,
    textAlign: 'right'
  }
};
