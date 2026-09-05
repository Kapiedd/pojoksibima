import PageLayout from '../components/PageLayout';

const steps = [
  {
    title: '1. Melihat Paket Berkontrak Bina Marga',
    body: 'Buka menu "Paket Berkontrak Bina Marga" di navigasi atas, atau gulir ke bagian "Data Kontrak" di beranda. Gunakan kolom pencarian untuk mencari nama paket tertentu, atau filter status (Berkontrak, Pending, SPPBJ, Selesai) untuk mempersempit hasil.'
  },
  {
    title: '2. Melihat Jadwal Gelaran Aspal (Hotmix)',
    body: 'Buka menu "Jadwal Hotmix" untuk melihat jadwal pengaspalan terbaru. Gunakan tab "Minggu Ini" atau "Bulan Ini" untuk melihat jadwal sesuai periode yang Anda butuhkan, supaya bisa mengantisipasi rute perjalanan.'
  },
  {
    title: '3. Melihat Dokumentasi Kegiatan',
    body: 'Bagian "Dokumentasi" menampilkan foto-foto kegiatan lapangan yang diunggah oleh admin DPUPR. Klik salah satu foto untuk melihat keterangan lengkapnya (lokasi, tanggal, dan deskripsi kegiatan).'
  },
  {
    title: '4. Mengisi Buku Tamu / Menyampaikan Aspirasi',
    body: 'Jika Anda memiliki laporan, kritik, atau aspirasi terkait infrastruktur jalan, isi formulir pada bagian "Buku Tamu". Isian Anda akan diterima langsung oleh admin DPUPR untuk ditindaklanjuti.'
  },
  {
    title: '5. Bertanya ke Chatbot AI',
    body: 'Klik ikon chat di pojok kanan bawah layar untuk bertanya langsung. Chatbot dapat menjawab pertanyaan seputar jadwal aspal, paket kontrak, atau informasi kontak -- berdasarkan data yang tersedia di sistem.'
  },
  {
    title: '6. Menghubungi DPUPR',
    body: 'Gulir ke bagian "Kontak" untuk melihat nomor WhatsApp, Instagram, email, jam operasional, serta lokasi kantor DPUPR di peta. Klik kartu WhatsApp/Email untuk langsung terhubung, atau salin informasinya jika aplikasi terkait tidak otomatis terbuka.'
  }
];

export default function Manual() {
  return (
    <PageLayout>
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <a href="/" style={styles.backLink}>&larr; Kembali ke Beranda</a>
          <div className="section-label">Panduan Penggunaan</div>
          <h1>Manual Pojok Si BiMa</h1>
          <p style={{ color: 'var(--color-ink-soft)' }}>
            Panduan singkat cara mengakses dan menggunakan seluruh fitur pada website Pojok Si BiMa.
          </p>
          <div className="batik-divider" />

          <div style={styles.list}>
            {steps.map((s) => (
              <div key={s.title} style={styles.item}>
                <h3 style={styles.itemTitle}>{s.title}</h3>
                <p style={styles.itemBody}>{s.body}</p>
              </div>
            ))}
          </div>
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
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginTop: 8
  },
  item: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '20px 24px'
  },
  itemTitle: {
    marginTop: 0,
    marginBottom: 8,
    fontSize: '1.05rem'
  },
  itemBody: {
    margin: 0,
    color: 'var(--color-ink-soft)',
    lineHeight: 1.7
  }
};
