import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { api } from '../api/client';
import { renderChatText } from '../utils/renderChatText';

function formatTanggal(tgl) {
  if (!tgl) return '-';
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ChatLog() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getChatLogs()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <AdminLayout title="Riwayat Chatbot" description="Pertanyaan yang pernah ditanyakan pengunjung ke chatbot AI">
      {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}

      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Belum ada yang bertanya ke chatbot.</p>
      ) : (
        <div style={styles.list}>
          {data.map((item) => (
            <div key={item.id} style={styles.card}>
              <div style={styles.time}>{formatTanggal(item.created_at)}</div>
              <div style={styles.question}>
                <span style={styles.label}>Ditanyakan:</span> {item.pertanyaan}
              </div>
              <div style={styles.answer}>
                <span style={styles.label}>Dijawab chatbot:</span>
                <div style={{ marginTop: 6 }}>
                  {item.jawaban ? renderChatText(item.jawaban) : '(tidak ada jawaban)'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14
  },
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    padding: '18px 22px'
  },
  time: {
    fontSize: '0.82rem',
    color: 'var(--color-ink-soft)',
    marginBottom: 10
  },
  question: {
    marginBottom: 8,
    fontSize: '0.98rem'
  },
  answer: {
    fontSize: '0.95rem',
    color: 'var(--color-ink-soft)'
  },
  label: {
    fontWeight: 700,
    color: 'var(--color-ink)'
  }
};
