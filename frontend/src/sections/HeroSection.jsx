import { useEffect, useRef, useState } from 'react';
import { api } from '../api/client';

// Animated counter hook
function useCountUp(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, sublabel, suffix = '', started }) {
  const num = useCountUp(value, 1600, started);
  return (
    <div style={statStyles.card}>
      <div style={statStyles.value}>
        {num.toLocaleString('id-ID')}{suffix}
      </div>
      <div style={statStyles.label}>{label}</div>
      <div style={statStyles.sublabel}>{sublabel}</div>
    </div>
  );
}

const statStyles = {
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 18px',
    textAlign: 'center',
    backdropFilter: 'blur(4px)',
    flex: '1 1 160px',
    minWidth: 130,
  },
  value: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
    fontWeight: 700,
    color: 'var(--color-gold-light)',
    lineHeight: 1,
    marginBottom: 6,
  },
  label: {
    color: '#FFFFFF',
    fontWeight: 600,
    fontSize: '0.9rem',
    marginBottom: 2,
  },
  sublabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.72rem',
  },
};

export default function HeroSection() {
  const [started, setStarted] = useState(false);
  const heroRef = useRef(null);

  // Statistik diambil dari data asli, bukan angka karangan.
  // Default 0 dulu selagi masih diambil dari server.
  const [stats, setStats] = useState({
    totalPaket: 0,
    totalJadwal: 0,
    totalDokumentasi: 0,
    totalKunjungan: 0
  });

  // "Info Hari Ini" -- digabung langsung ke dalam Hero (bukan section
  // terpisah lagi) supaya orang langsung lihat begitu buka web, dan warnanya
  // menyatu dengan tema gelap Hero. Ada 2 hal yang ditonjolkan: jadwal aspal
  // yang sedang berlangsung HARI INI, dan dokumentasi yang diunggah HARI INI.
  const [highlight, setHighlight] = useState({
    loading: true,
    jumlahJadwal: 0,
    dokumentasiHariIni: null, // null = belum ada, object = ada 1 foto terbaru hari ini
  });

  useEffect(() => {
    Promise.all([
      api.getPaketKontrak().catch(() => ({ data: [] })),
      api.getJadwalAspal().catch(() => ({ data: [] })),
      api.getDokumentasi().catch(() => ({ data: [] })),
      api.getVisitorCounter().catch(() => ({ total_kunjungan: 0 }))
    ]).then(([paket, jadwal, dokumentasi, visitor]) => {
      setStats({
        totalPaket: (paket.data || []).length,
        totalJadwal: (jadwal.data || []).length,
        totalDokumentasi: (dokumentasi.data || []).length,
        totalKunjungan: visitor.total_kunjungan || 0
      });

      const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

      const jadwalBerlangsung = (jadwal.data || []).filter((item) => {
        if (!item.tanggal_mulai) return false;
        const mulai = item.tanggal_mulai.slice(0, 10);
        const selesai = (item.tanggal_selesai || item.tanggal_mulai).slice(0, 10);
        return todayStr >= mulai && todayStr <= selesai;
      });

      const dokumentasiHariIni = (dokumentasi.data || []).find(
        (d) => d.tanggal_kegiatan && d.tanggal_kegiatan.slice(0, 10) === todayStr
      ) || null;

      setHighlight({
        loading: false,
        jumlahJadwal: jadwalBerlangsung.length,
        dokumentasiHariIni,
      });
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="beranda" ref={heroRef} style={styles.hero}>
      {/* Background decoration */}
      <div style={styles.bgPattern} aria-hidden="true" />
      <div style={styles.bgGradient} aria-hidden="true" />

      <div className="container" style={styles.container}>
        <div className="animate-fade-up" style={styles.content}>
          {/* Badge */}
          <div style={styles.badge}>
            <span style={styles.badgeDot} />
            PORTAL RESMI DINAS PEKERJAAN UMUM
          </div>

          {/* Tagline */}
          <p style={styles.tagline}>SISTEM INFORMASI BINA MARGA</p>

          {/* Headline */}
          <h1 style={styles.headline}>
            Informasi Bina Marga,{' '}
            <span style={styles.headlineAccent}>Lebih Mudah Diakses.</span>
          </h1>

          {/* Description */}
          <p style={styles.description}>
            Pojok Si BiMa hadir sebagai pusat transparansi pembangunan infrastruktur jalan dan jembatan.
            Pantau paket pekerjaan aktif, jadwal pengaspalan hotmix, serta sampaikan aspirasi Anda secara real-time.
          </p>

          {/* CTAs */}
          <div style={styles.ctas}>
            <a href="/#akses-cepat" className="btn btn-primary" style={styles.ctaPrimary}>
              Jelajahi Informasi
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="/buku-tamu" className="btn btn-outline" style={styles.ctaSecondary}>
              Isi Buku Tamu
            </a>
          </div>
        </div>

        {/* Highlight Hari Ini -- Jadwal & Dokumentasi -- tetap satu warna
            dengan Hero, jadi terasa menyatu, bukan strip terpisah */}
        <div className="animate-fade-up-delay-1" style={styles.highlightGrid}>
          <a href="/jadwal-aspal" style={styles.highlightCard} className="highlight-card">
            <div style={styles.highlightIconWrap}>
              <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={styles.highlightLabel}>Jadwal Hari Ini</div>
              {highlight.loading ? (
                <div style={styles.highlightText}>Memuat...</div>
              ) : highlight.jumlahJadwal > 0 ? (
                <div style={styles.highlightText}>
                  <strong style={styles.highlightNum}>{highlight.jumlahJadwal}</strong> jadwal gelaran aspal sedang berlangsung
                </div>
              ) : (
                <div style={styles.highlightText}>Tidak ada jadwal aspal yang berlangsung hari ini</div>
              )}
            </div>
            <span style={styles.highlightArrow}>&rarr;</span>
          </a>

          <a href="/dokumentasi" style={styles.highlightCard} className="highlight-card">
            {highlight.dokumentasiHariIni ? (
              <img
                src={highlight.dokumentasiHariIni.file_url}
                alt={highlight.dokumentasiHariIni.judul}
                style={styles.highlightThumb}
              />
            ) : (
              <div style={styles.highlightIconWrap}>
                <svg width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>
            )}
            <div style={{ flex: 1 }}>
              <div style={styles.highlightLabel}>Dokumentasi Hari Ini</div>
              {highlight.loading ? (
                <div style={styles.highlightText}>Memuat...</div>
              ) : highlight.dokumentasiHariIni ? (
                <div style={styles.highlightText}>{highlight.dokumentasiHariIni.judul}</div>
              ) : (
                <div style={styles.highlightText}>Belum ada dokumentasi yang diunggah hari ini</div>
              )}
            </div>
            <span style={styles.highlightArrow}>&rarr;</span>
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-up-delay-2" style={styles.stats}>
          <div style={styles.statsLabel}>Layanan Transparansi Publik</div>
          <p style={styles.statsSubLabel}>
            Pembangunan berkelanjutan berlandaskan keterbukaan data dan partisipasi aktif seluruh warga.
          </p>
          <div style={styles.statsGrid}>
            <StatCard value={stats.totalPaket} label="Total Paket" sublabel="Paket kontrak Bina Marga" started={started} />
            <StatCard value={stats.totalJadwal} label="Jadwal Hotmix" sublabel="Jadwal gelaran aspal" started={started} />
            <StatCard value={stats.totalDokumentasi} label="Dokumentasi" sublabel="Foto progres lapangan" started={started} />
            <StatCard value={stats.totalKunjungan} label="Pengunjung" sublabel="Total akses website" suffix="" started={started} />
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div style={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: '100%', height: '100%', display: 'block' }}>
          <path d="M0,40 C360,0 1080,60 1440,20 L1440,60 L0,60 Z" fill="var(--color-bg)" />
        </svg>
      </div>

      <style>{`
        .highlight-card:hover {
          background: rgba(255,255,255,0.1);
          border-color: var(--color-gold-light);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}

const styles = {
  hero: {
    background: 'var(--color-dark)',
    color: 'var(--color-white)',
    padding: '88px 0 0',
    position: 'relative',
    overflow: 'hidden',
  },
  bgPattern: {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      repeating-linear-gradient(135deg,
        rgba(201,162,39,0.04) 0px, rgba(201,162,39,0.04) 1px,
        transparent 1px, transparent 40px
      )
    `,
    zIndex: 0,
  },
  bgGradient: {
    position: 'absolute',
    top: '-40%',
    right: '-10%',
    width: '60%',
    height: '200%',
    background: 'radial-gradient(ellipse, rgba(201,162,39,0.08) 0%, transparent 70%)',
    zIndex: 0,
  },
  container: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: 56,
  },
  content: {
    maxWidth: 680,
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '6px 14px',
    background: 'rgba(201,162,39,0.12)',
    border: '1px solid rgba(201,162,39,0.25)',
    borderRadius: 20,
    color: 'var(--color-gold-light)',
    fontSize: '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    marginBottom: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: 'var(--color-gold)',
    display: 'inline-block',
    animation: 'pulse-ring 1.5s infinite',
    boxShadow: '0 0 0 0 rgba(201,162,39,0.4)',
  },
  tagline: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: '0.8rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    margin: '0 0 12px',
  },
  headline: {
    color: '#FFFFFF',
    marginBottom: 20,
    fontWeight: 700,
  },
  headlineAccent: {
    color: 'var(--color-gold-light)',
  },
  description: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: '1.05rem',
    lineHeight: 1.75,
    maxWidth: 600,
    marginBottom: 32,
  },
  ctas: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  ctaPrimary: {
    fontSize: '0.95rem',
    padding: '12px 26px',
    borderRadius: 8,
  },
  ctaSecondary: {
    fontSize: '0.95rem',
    padding: '12px 26px',
    borderRadius: 8,
  },
  stats: {
    paddingBottom: 64,
  },
  highlightGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 14,
  },
  highlightCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(201,162,39,0.25)',
    borderRadius: 'var(--radius-lg)',
    padding: '18px 20px',
    textDecoration: 'none',
    transition: 'background 0.22s, border-color 0.22s, transform 0.22s',
  },
  highlightIconWrap: {
    flexShrink: 0,
    width: 48,
    height: 48,
    borderRadius: 10,
    background: 'rgba(201,162,39,0.15)',
    color: 'var(--color-gold-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightThumb: {
    flexShrink: 0,
    width: 48,
    height: 48,
    borderRadius: 10,
    objectFit: 'cover',
  },
  highlightLabel: {
    color: 'var(--color-gold-light)',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 4,
  },
  highlightText: {
    color: '#FFFFFF',
    fontSize: '0.98rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  highlightNum: {
    color: 'var(--color-gold-light)',
    fontSize: '1.15rem',
  },
  highlightArrow: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1.3rem',
    flexShrink: 0,
  },
  statsLabel: {
    color: 'var(--color-gold-light)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  statsSubLabel: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '0.88rem',
    margin: '0 0 24px',
    maxWidth: 520,
  },
  statsGrid: {
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap',
  },
  wave: {
    height: 60,
    marginTop: -1,
  },
};
