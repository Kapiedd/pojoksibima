import { useEffect, useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import Modal from '../components/Modal';
import StatusBadge from '../components/StatusBadge';
import { api } from '../api/client';

const emptyForm = {
  nama_paket: '', tanggal_mulai: '', tanggal_selesai: '', status: 'Jadwal',
  sta_mulai: '', sta_selesai: '', lokasi_maps_url: '', kontak_person: ''
};

function formatTanggal(tgl) {
  if (!tgl) return '-';
  return new Date(tgl).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default function JadwalAspal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function loadData() {
    setLoading(true);
    api.getJadwalAspal()
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
      tanggal_mulai: item.tanggal_mulai || '',
      tanggal_selesai: item.tanggal_selesai || '',
      status: item.status || 'Jadwal',
      sta_mulai: item.sta_mulai || '',
      sta_selesai: item.sta_selesai || '',
      lokasi_maps_url: item.lokasi_maps_url || '',
      kontak_person: item.kontak_person || ''
    });
    setEditingId(item.id);
    setModalOpen(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.updateJadwalAspal(editingId, form);
      } else {
        await api.createJadwalAspal(form);
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
    if (!confirm(`Hapus jadwal "${item.nama_paket}"? Data yang dihapus tidak bisa dikembalikan.`)) return;
    try {
      await api.deleteJadwalAspal(item.id);
      loadData();
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <AdminLayout title="Jadwal Gelaran Aspal" description="Jadwal pengerjaan hotmix per ruas jalan">
      <div style={styles.toolbar}>
        <span style={styles.count}>{data.length} jadwal</span>
        <button onClick={openAddModal} style={styles.addButton}>+ Tambah Jadwal</button>
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
                <th style={styles.th}>Mulai</th>
                <th style={styles.th}>Selesai</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}></th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td style={styles.td}>{item.nama_paket}</td>
                  <td style={styles.td}>{formatTanggal(item.tanggal_mulai)}</td>
                  <td style={styles.td}>{formatTanggal(item.tanggal_selesai)}</td>
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
        <Modal title={editingId ? 'Ubah Jadwal Aspal' : 'Tambah Jadwal Aspal'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit}>
            <label style={styles.label}>Nama paket</label>
            <input
              style={styles.input}
              value={form.nama_paket}
              onChange={(e) => setForm({ ...form, nama_paket: e.target.value })}
              required
            />

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Tanggal mulai</label>
                <input
                  type="date"
                  style={styles.input}
                  value={form.tanggal_mulai}
                  onChange={(e) => setForm({ ...form, tanggal_mulai: e.target.value })}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>Tanggal selesai</label>
                <input
                  type="date"
                  style={styles.input}
                  value={form.tanggal_selesai}
                  onChange={(e) => setForm({ ...form, tanggal_selesai: e.target.value })}
                />
              </div>
            </div>

            <label style={styles.label}>Status</label>
            <select
              style={styles.input}
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="Jadwal">Jadwal</option>
              <option value="Off">Sedang berlangsung</option>
              <option value="Selesai">Selesai</option>
              <option value="Jadwal selesai">Jadwal selesai</option>
            </select>

            <div style={styles.row}>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>STA mulai</label>
                <input
                  style={styles.input}
                  value={form.sta_mulai}
                  onChange={(e) => setForm({ ...form, sta_mulai: e.target.value })}
                  placeholder="0+000"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={styles.label}>STA selesai</label>
                <input
                  style={styles.input}
                  value={form.sta_selesai}
                  onChange={(e) => setForm({ ...form, sta_selesai: e.target.value })}
                  placeholder="0+650"
                />
              </div>
            </div>

            <label style={styles.label}>Link lokasi (Google Maps)</label>
            <input
              style={styles.input}
              value={form.lokasi_maps_url}
              onChange={(e) => setForm({ ...form, lokasi_maps_url: e.target.value })}
            />

            <label style={styles.label}>Kontak person</label>
            <input
              style={styles.input}
              value={form.kontak_person}
              onChange={(e) => setForm({ ...form, kontak_person: e.target.value })}
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
  row: {
    display: 'flex',
    gap: 14
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
