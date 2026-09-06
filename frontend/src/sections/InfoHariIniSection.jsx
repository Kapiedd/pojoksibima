import { useEffect, useState } from 'react';
import { api } from '../api/client';

// Section kecil, satu baris info -- nunjukin data jadwal aspal yang paling
// relevan buat HARI INI dibuka (bukan daftar panjang). Tujuannya: pengunjung
// yang buka web hari itu langsung tau ada berapa pengerjaan aspal yang lagi
// berlangsung, tanpa harus scroll/klik apapun.

function isBerlangsungHariIni(item) {
  if (!item.tanggal_mulai) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const mulai = new Date(item.tanggal_mulai);
  mulai.setHours(0, 0, 0, 0);
  const selesai = item.tanggal_selesai ? new Date(item.tanggal_selesai) : mulai;
  selesai.setHours(0, 0, 0, 0);
  return today >= mulai && today <= selesai;
}

export default function InfoHariIniSection() {
  const [jumlah, setJumlah] = useState(null);

  useEffect(() => {
    api.getJadwalAspal()
      .then((res) => {
        const data = res.data || [];
        const berlangsung = data.filter(isBerlangsungHariIni);
        setJumlah(berlangsung.length);
      })
      .catch(() => setJumlah(null));
  }, []);

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  let pesan;
  if (jumlah === null) {
    pesan = 'Memuat info terbaru...';
  } else if (jumlah > 0) {
    pesan = `Hari ini ada ${jumlah} jadwal gelaran aspal yang sedang berlangsung.`;
  } else {
    pesan = 'Tidak ada jadwal gelaran aspal yang berlangsung hari ini.';
  }

  return (
    <section id="info-hari-ini" style={styles.wrap}>
      <div className="container" style={styles.inner}>
        <span style={styles.dot} />
        <span style={styles.date}>{today}</span>
        <span style={styles.sep}>&bull;</span>
        <span style={styles.msg}>{pesan}</span>
        <a href="/jadwal-aspal" style={styles.link}>Lihat detail &rarr;</a>
      </div>
    </section>
  );
}

const styles = {
  wrap: {
    background: 'var(--color-dark)',
    padding: '12px 0',
  },
  inner: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 10,
    fontSize: '0.88rem',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#4ade80',
    flexShrink: 0,
  },
  date: {
    color: 'rgba(255,255,255,0.6)',
    fontWeight: 600,
  },
  sep: {
    color: 'rgba(255,255,255,0.3)',
  },
  msg: {
    color: '#FFFFFF',
    fontWeight: 500,
    flex: 1,
  },
  link: {
    color: 'var(--color-gold-light)',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
};
