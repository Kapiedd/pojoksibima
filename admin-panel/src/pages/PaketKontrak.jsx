import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';

const emptyForm = { nama_paket: '', kategori: '', lokasi: '', status: 'Pending', tahun: new Date().getFullYear() };

export default function PaketKontrak() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function loadData() {
    setLoading(true);
    api.getPaketKontrak()
      .then((res) => setData(res.data || []))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(loadData, []);

  function openAddModal() {
    setForm(emptyForm);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(item) {
    setForm({
      nama_paket: item.nama_paket || '',
      kategori: item.kategori || '',
      lokasi: item.lokasi || '',
      status: item.status || 'Pending',
      tahun: item.tahun || new Date().getFullYear()
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.updatePaketKontrak(editingId, form);
      } else {
        await api.createPaketKontrak(form);
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    if (!confirm(`Hapus paket "${item.nama_paket}"? Data yang dihapus tidak bisa dikembalikan.`)) return;
    try {
      await api.deletePaketKontrak(item.id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <AdminLayout title="Paket Kontrak" description="Daftar paket pekerjaan Bina Marga">
      <div style={styles.toolbar}>
        <span style={styles.count}>{data.length} paket</span>
        <button onClick={openAddModal} style={styles.addButton}>+ Tambah Paket</button>
      </div>

      {error && <p style={{ color: 'var(--color-maroon)' }}>{error}</p>}
      {loading ? (
        <p>Memuat data...</p>
      ) : (
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nama Paket</th>
                <th style={styles.th}>Kategori</th>
                <th style={styles.th}>Lokasi</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.nama_paket}</td>
                  <td style={styles.td}>{(item.kategori || '').replace('Sub Kegiatan ', '')}</td>
                  <td style={styles.td}>{item.lokasi || '-'}</td>
                  <td style={styles.td}><StatusBadge status={item.status} /></td>
                  <td style={{ ...styles.td, textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button onClick={() => openEditModal(item)} style={styles.linkButton}>Ubah</button>
                    <button onClick={() => handleDelete(item)} style={{ ...styles.linkButton, color: 'var(--color-maroon)' }}>Hapus</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <Modal title={editingId ? 'Ubah Paket Kontrak' : 'Tambah Paket Kontrak'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Nama paket</label>
            <input
              style={styles.input}
              value={form.nama_paket}
              onChange={(e) => setForm({ ...form, nama_paket: e.target.value })}
              required
            />

            <label style={styles.label}>Kategori</label>
            <input
              style={styles.input}
              value={form.kategori}
              onChange={(e) => setForm({ ...form, kategori: e.target.value })}
              placeholder="Contoh: Sub Kegiatan Rekonstruksi Jalan"
            />

            <label style={styles.label}>Lokasi (kecamatan)</label>
            <input
              style={styles.input}
              value={form.lokasi}
              onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
            />

            <label style={styles.label}>Status</label>
            <select
              style={styles.input}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Pending">Pending</option>
              <option value="SPPBJ">SPPBJ</option>
              <option value="Berkontrak">Berkontrak</option>
              <option value="Selesai">Selesai</option>
            </select>

            <label style={styles.label}>Tahun</label>
            <input
              type="number"
              style={styles.input}
              value={form.tahun}
              onChange={(e) => setForm({ ...form, tahun: Number(e.target.value) })}
            />

            <button type="submit" style={styles.submitButton} disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </button>
          </form>
        </Modal>
      )}
    </AdminLayout>
  );
}

const styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  count: {
    color: 'var(--color-ink-soft)',
    fontWeight: 500
  },
  addButton: {
    background: 'var(--color-gold)',
    color: 'var(--color-ink)',
    border: 'none',
    borderRadius: 6,
    padding: '11px 20px',
    fontWeight: 700,
    fontSize: '0.95rem'
  },
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
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: 'var(--color-ink)',
    fontWeight: 600,
    fontSize: '0.9rem',
    marginLeft: 16,
    padding: 0,
    textDecoration: 'underline'
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
    border: '1.5px solid var(--color-border)'
  },
  submitButton: {
    width: '100%',
    marginTop: 26,
    padding: 13,
    background: 'var(--color-gold)',
    color: 'var(--color-ink)',
    border: 'none',
    borderRadius: 6,
    fontWeight: 700,
    fontSize: '1rem'
  }
};
