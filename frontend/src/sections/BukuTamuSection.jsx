import { useState } from 'react';
import { api } from '../api/client';

const emptyForm = { nama: '', instansi: '', keperluan: '', kontak: '', kategori: '' };

const KATEGORI_OPTS = [
  'Laporan Jalan Rusak',
  'Laporan Drainase',
  'Aspirasi Pembangunan',
  'Koordinasi Pekerjaan',
  'Pertanyaan Informasi',
  'Lainnya',
];

export default function BukuTamuSection() {
  const [form, setForm]           = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]     = useState(false);
  const [error, setError]         = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await api.submitBukuTamu(form);
      setSuccess(true);
      setForm(emptyForm);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const set = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <section id="buku-tamu" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.grid}>
          {/* Left: info */}
          <div style={styles.infoCol}>
            <div className="section-label section-label-dark">Partisipasi</div>
            <h2 style={styles.heading}>Buku Tamu &amp; Aspirasi</h2>
            <p style={styles.desc}>
              Kehadiran dan masukan Anda sangat berharga bagi kami. Sampaikan kunjungan, pertanyaan,
              atau aspirasi perbaikan infrastruktur secara langsung.
            </p>

            <div style={styles.infoList}>
              {[
                { icon: '📋', title: 'Laporan Jalan Rusak', desc: 'Catat dan kirim info jalan bermasalah di wilayah Anda.' },
                { icon: '💬', title: 'Aspirasi & Saran', desc: 'Sampaikan harapan warga untuk infrastruktur yang lebih baik.' },
                { icon: '🤝', title: 'Koordinasi Resmi', desc: 'Untuk koordinasi pekerjaan dan administrasi kewilayahan.' },
              ].map((item) => (
                <div key={item.title} style={styles.infoItem}>
                  <span style={styles.infoEmoji}>{item.icon}</span>
                  <div>
                    <div style={styles.infoTitle}>{item.title}</div>
                    <div style={styles.infoDesc}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.responseNote}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              Setiap laporan diverifikasi oleh admin teknis Bina Marga dalam 2×24 jam kerja.
            </div>
          </div>

          {/* Right: form */}
          <div style={styles.formCol}>
            {success ? (
              <div style={styles.successBox}>
                <div style={styles.successIcon}>✓</div>
                <h3 style={styles.successTitle}>Terima kasih!</h3>
                <p style={styles.successDesc}>
                  Buku tamu Anda telah berhasil terkirim. Tim kami akan menindaklanjuti secepatnya.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="btn btn-primary"
                  style={{ marginTop: 16 }}
                >
                  Isi Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={styles.form}>
                <h3 style={styles.formTitle}>Isi Buku Tamu</h3>

                <div style={styles.formRow}>
                  <div style={styles.formGroup}>
                    <label htmlFor="bt-nama" className="form-label">Nama Lengkap *</label>
                    <input
                      id="bt-nama"
                      className="form-input"
                      value={form.nama}
                      onChange={set('nama')}
                      placeholder="Masukkan nama lengkap Anda"
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label htmlFor="bt-instansi" className="form-label">Instansi / Organisasi</label>
                    <input
                      id="bt-instansi"
                      className="form-input"
                      value={form.instansi}
                      onChange={set('instansi')}
                      placeholder="Nama instansi (opsional)"
                    />
                  </div>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="bt-kategori" className="form-label">Kategori Keperluan</label>
                  <select id="bt-kategori" className="form-input" value={form.kategori} onChange={set('kategori')}>
                    <option value="">Pilih kategori...</option>
                    {KATEGORI_OPTS.map((k) => <option key={k} value={k}>{k}</option>)}
                  </select>
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="bt-keperluan" className="form-label">Pesan / Aspirasi</label>
                  <textarea
                    id="bt-keperluan"
                    className="form-input"
                    style={styles.textarea}
                    value={form.keperluan}
                    onChange={set('keperluan')}
                    placeholder="Tuliskan pesan, laporan, atau aspirasi Anda secara detail..."
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="bt-kontak" className="form-label">Nomor HP / Email *</label>
                  <input
                    id="bt-kontak"
                    className="form-input"
                    value={form.kontak}
                    onChange={set('kontak')}
                    placeholder="Kontak untuk tindak lanjut"
                    required
                  />
                </div>

                {error && (
                  <div style={styles.errorBox}>
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting ? (
                    <>
                      <span style={styles.btnSpinner} />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      Kirim Aspirasi
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    background: 'var(--color-dark)',
    color: 'var(--color-white)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: 56,
    alignItems: 'start',
  },
  infoCol: {},
  heading: { color: '#FFFFFF', marginBottom: 14 },
  desc: {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: 1.75,
    marginBottom: 32,
    fontSize: '1.02rem',
  },
  infoList: { display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 },
  infoItem: {
    display: 'flex',
    gap: 14,
    alignItems: 'flex-start',
  },
  infoEmoji: {
    fontSize: '1.4rem',
    flexShrink: 0,
    width: 36,
    textAlign: 'center',
  },
  infoTitle: { fontWeight: 700, marginBottom: 2, color: '#FFFFFF' },
  infoDesc:  { fontSize: '0.88rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 },
  responseNote: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    fontSize: '0.82rem',
    color: 'rgba(255,255,255,0.5)',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8,
    padding: '10px 14px',
  },
  formCol: {},
  form: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: '32px 28px',
    boxShadow: 'var(--shadow-lg)',
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    color: 'var(--color-ink)',
    marginBottom: 24,
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: 14,
  },
  formGroup: { marginBottom: 16 },
  textarea: { minHeight: 110, resize: 'vertical' },
  errorBox: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    background: '#fef2f2',
    color: '#991b1b',
    border: '1px solid #fee2e2',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: '0.88rem',
    marginBottom: 12,
  },
  submitBtn: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 8,
    padding: '14px',
  },
  btnSpinner: {
    width: 14,
    height: 14,
    border: '2px solid rgba(26,24,21,0.3)',
    borderTop: '2px solid var(--color-ink)',
    borderRadius: '50%',
    display: 'inline-block',
    animation: 'spin 0.7s linear infinite',
  },
  successBox: {
    background: 'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    padding: '48px 28px',
    textAlign: 'center',
    boxShadow: 'var(--shadow-lg)',
  },
  successIcon: {
    width: 56,
    height: 56,
    background: 'var(--color-green-bg)',
    color: 'var(--color-green)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.6rem',
    fontWeight: 700,
    margin: '0 auto 16px',
  },
  successTitle: { color: 'var(--color-ink)', marginBottom: 8 },
  successDesc:  { color: 'var(--color-ink-soft)', lineHeight: 1.7 },
};
