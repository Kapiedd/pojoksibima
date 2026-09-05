import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import { api } from '../api/client';

const emptyForm = { judul: '', kategori: '', lokasi: '', keterangan: '', tanggal_kegiatan: '' };

export default function Dokumentasi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  function loadData() {
    setLoading(true);
    api.getDokumentasi()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadData, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setFormError('');

    if (!file) {
      setFormError('Pilih foto dulu sebelum diunggah.');
      return;
    }

    const formData = new FormData();
    formData.append('foto', file);
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    setSaving(true);
    try {
      await api.createDokumentasi(formData);
      setForm(emptyForm);
      setFile(null);
      e.target.reset();
      loadData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Hapus dokumentasi "${item.judul}"? Foto juga akan terhapus permanen.`)) return;
    try {
      await api.deleteDokumentasi(item.id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <AdminLayout title="Dokumentasi Kegiatan" description="Unggah foto kegiatan lapangan untuk ditampilkan di website publik">
      <div style={styles.formCard}>
        <h3 style={{ marginTop: 0 }}>Unggah Dokumentasi Baru</h3>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Foto (maks. 5MB) *</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.input}
            required
          />

          <label style={styles.label}>Judul *</label>
          <input
            style={styles.input}
            value={form.judul}
            onChange={(e) => setForm({ ...form, judul: e.target.value })}
            required
          />

          <div style={styles.row}>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Kategori</label>
              <input
                style={styles.input}
                value={form.kategori}
                onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                placeholder="Contoh: Hotmix, Jembatan, Drainase"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={styles.label}>Tanggal kegiatan</label>
              <input
                type="date"
                style={styles.input}
                value={form.tanggal_kegiatan}
                onChange={(e) => setForm({ ...form, tanggal_kegiatan: e.target.value })}
              />
            </div>
          </div>

          <label style={styles.label}>Lokasi</label>
          <input
            style={styles.input}
            value={form.lokasi}
            onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
            placeholder="Contoh: Kecamatan Karangkobar"
          />

          <label style={styles.label}>Keterangan</label>
          <textarea
            style={{ ...styles.input, minHeight: 80 }}
            value={form.keterangan}
            onChange={(e) => setForm({ ...form, keterangan: e.target.value })}
          />

          {formError && <p style={{ color: 'var(--color-maroon)' }}>{formError}</p>}

          <button type="submit" style={styles.submitButton} disabled={saving}>
            {saving ? 'Mengunggah...' : 'Unggah'}
          </button>
        </form>
      </div>

      <h3>Dokumentasi Tersimpan ({data.length})</h3>
      {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}
      {loading ? (
        <p>Memuat data...</p>
      ) : data.length === 0 ? (
        <p style={{ color: 'var(--color-ink-soft)' }}>Belum ada dokumentasi yang diunggah.</p>
      ) : (
        <div style={styles.grid}>
          {data.map((item) => (
            <div key={item.id} style={styles.card}>
              <img src={item.file_url} alt={item.judul} style={styles.thumb} />
              <div style={styles.cardBody}>
                <div style={styles.cardTitle}>{item.judul}</div>
                <div style={styles.cardMeta}>{item.kategori || '-'} • {item.lokasi || '-'}</div>
                <button onClick={() => handleDelete(item)} style={styles.deleteButton}>Hapus</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

const styles = {
  formCard: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    padding: '24px 28px',
    marginBottom: 36
  },
  label: {
    display: 'block',
    fontWeight: 600,
    fontSize: '0.9rem',
    marginBottom: 6,
    marginTop: 16
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    borderRadius: 6,
    border: '1.5px solid var(--color-border)',
    fontFamily: 'inherit'
  },
  row: {
    display: 'flex',
    gap: 14
  },
  submitButton: {
    marginTop: 22,
    padding: '12px 24px',
    background: 'var(--color-gold)',
    color: 'var(--color-ink)',
    border: 'none',
    borderRadius: 6,
    fontWeight: 700
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
    gap: 18
  },
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 8,
    overflow: 'hidden'
  },
  thumb: {
    width: '100%',
    height: 140,
    objectFit: 'cover'
  },
  cardBody: {
    padding: '12px 14px'
  },
  cardTitle: {
    fontWeight: 700,
    fontSize: '0.92rem',
    marginBottom: 4
  },
  cardMeta: {
    fontSize: '0.8rem',
    color: 'var(--color-ink-soft)',
    marginBottom: 10
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    color: 'var(--color-maroon)',
    fontWeight: 700,
    fontSize: '0.85rem',
    textDecoration: 'underline',
    padding: 0
  }
};
