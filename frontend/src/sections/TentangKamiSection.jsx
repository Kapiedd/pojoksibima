// Section "Tentang Kami" menggabungkan: intro Pojok Si BiMa + 3 value propositions
// + Struktur Organisasi (ringkas) + Visi & Misi

const kepalaDinas   = { name: 'Yusuf Winarsono, ST.MT',         nip: '19710507 199803 1 007' };
const sekretaris    = { name: 'M. Arqom Al Fahmi, ST, M.Si',    nip: '19750901 200801 1 008' };

const subbagian = [
  { title: 'Kasubbag Perencanaan dan Keuangan', name: 'Intihatun Munawaroh, SE.', nip: '19790526 200212 2 007' },
  { title: 'Kasubbag Umum dan Kepegawaian',     name: 'Esti Agustini, S.Si',      nip: '19690906 199803 2 008' },
];

const bidangList = [
  {
    title: 'Bidang Bangunan Gedung',
    kepala: { name: 'Resiati Widiastuti, ST', nip: '19740226 200212 2 006' },
    sub: [
      { title: 'Sub Koordinator Pembangunan & Pemeliharaan Bangunan Gedung', name: 'Yudi Lestari, ST', nip: '19800929 201001 2 012' },
      { title: 'Sub Koordinator Jasa Konstruksi', name: 'Subur Setiono, ST', nip: '19760606 199703 1 005' },
    ],
  },
  {
    title: 'Bidang Bina Marga',
    kepala: { name: 'Hermawan Tutut Indarjo, ST', nip: '19761025 200901 1 006' },
    sub: [
      { title: 'Sub Koordinator Peningkatan Jalan & Jembatan', name: 'Sigit Prabowo, ST', nip: '19800329 201101 1 001' },
      { title: 'Sub Koordinator Pemeliharaan Jalan & Jembatan', name: 'Arif Setyawan, ST', nip: '19790727 200903 1 003' },
    ],
  },
  {
    title: 'Bidang Pengelolaan Sumber Daya Air',
    kepala: { name: 'Suseno Adji Hartono, ST', nip: '19720605 199703 1 008' },
    sub: [
      { title: 'Sub Koordinator Pendayagunaan Sumber Daya Air', name: 'Agus Budiyanto, ST', nip: '19770817 200903 1 005' },
      { title: 'Sub Koordinator Irigasi, Operasi & Pemeliharaan SDA', name: 'Eko Rudianto, ST', nip: '19700710 199903 1 004' },
    ],
  },
  {
    title: 'Bidang Tata Ruang',
    kepala: { name: 'Fajar Mulato, ST.MT', nip: '19850813 201001 1 016' },
    sub: [
      { title: 'Sub Koordinator Tata Ruang Wilayah', name: null, nip: null },
      { title: 'Sub Koordinator Pengendalian Tata Ruang & Kawasan', name: 'Prasetya Adhie Nugraha, S.Si', nip: '19780529 200903 1 004' },
    ],
  },
];

const uptdList = [
  { title: 'UPTD Wilayah I',  kepala: { name: 'Satirun, ST',               nip: '19680805 199703 1 005' }, tu: null },
  { title: 'UPTD Wilayah II', kepala: { name: 'Catur Luth Hananjaya, ST',  nip: '19750729 200903 1 005' }, tu: { name: 'Dwi Satmoko, ST', nip: '19830412 200801 1 003' } },
  { title: 'UPTD Wilayah III',kepala: { name: 'Adi Purwanto, SE',          nip: '19840523 201502 1 001' }, tu: null },
  { title: 'UPTD Wilayah IV', kepala: { name: 'Achmad Mutaqin, ST',        nip: '19710515 199210 1 001' }, tu: null },
  { title: 'UPTD Wilayah V',  kepala: { name: 'Candra, ST',                nip: '19761215 200003 1 004' }, tu: { name: 'Samsul Bahri, ST', nip: '19780601 200801 1 023' } },
  { title: 'UPTD Perlengkapan & Perbengkelan', kepala: { name: 'Tarwan', nip: '19800602 201101 1 004' }, tu: null },
];

const values = [
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Transparan',
    desc: 'Status, lokasi, dan progres setiap paket pekerjaan jalan dan jembatan dapat dipantau publik secara terbuka, tanpa perlu mengajukan permohonan data secara manual.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Informatif',
    desc: 'Data jadwal aspal (hotmix) diperbarui dinamis setiap hari agar pengendara dapat mengantisipasi rute perjalanan.',
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Mudah Diakses',
    desc: 'Antarmuka ramah pengguna yang dioptimalkan baik untuk akses desktop maupun ponsel di mana saja.',
  },
];

function PersonRow({ name, nip }) {
  if (!name) return <div style={orgStyles.personEmpty}>Belum terisi</div>;
  return (
    <div style={orgStyles.personRow}>
      <div style={orgStyles.personName}>{name}</div>
      <div style={orgStyles.personNip}>NIP. {nip}</div>
    </div>
  );
}

function OrgCard({ title, children }) {
  return (
    <div style={orgStyles.groupCard}>
      <div style={orgStyles.groupHeader}>{title}</div>
      {children}
    </div>
  );
}

export default function TentangKamiSection() {
  return (
    <>
      {/* ── Tentang Kami ── */}
      <section id="tentang" className="section" style={styles.tentangSection}>
        <div className="container">
          <div style={styles.tentangGrid}>
            {/* Left: text */}
            <div style={styles.tentangText}>
              <div className="section-label">Tentang Kami</div>
              <h2>Tentang Pojok Si BiMa</h2>
              <p style={styles.tentangSubtitle}>Pusat Keterbukaan Informasi Jalan &amp; Jembatan Daerah Anda</p>
              <div className="batik-divider" />
              <p style={styles.tentangPara}>
                Pojok Si BiMa merupakan inisiasi strategis dari Bidang Bina Marga untuk mewujudkan tata kelola
                pemerintahan yang bersih dan transparan. Melalui portal ini, masyarakat dapat mengawal langsung
                kualitas jalan dari tahap perencanaan hingga penyerahan berkas.
              </p>
              <p style={styles.tentangPara}>
                Kami berkomitmen memberikan sajian data akurat terkait jadwal pengerjaan aspal panas (hotmix)
                guna meminimalisir kendala lalu lintas harian warga pengguna jalan.
              </p>
            </div>

            {/* Right: value cards */}
            <div style={styles.valueGrid}>
              {values.map((v) => (
                <div key={v.title} style={styles.valueCard}>
                  <div style={styles.valueIcon}>{v.icon}</div>
                  <div style={styles.valueTitle}>{v.title}</div>
                  <p style={styles.valueDesc}>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Visi & Misi ── */}
      <section id="visi-misi" className="section-sm" style={styles.visiSection}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div className="section-label">Kebijakan</div>
          <h2>Visi &amp; Misi</h2>
          <p style={styles.metaText}>RPJPD 2005–2025 Kabupaten Banjarnegara — Periode 4, RPD Tahun 2023–2026</p>
          <div className="batik-divider" />

          <div style={styles.visiCard}>
            <div style={styles.visiLabel}>Visi</div>
            <p style={styles.visiText}>&ldquo;Banjarnegara Maju Berbasis Pertanian&rdquo;</p>
          </div>

          <h3 style={{ marginTop: 44 }}>Misi ke-4 (terkait DPUPR)</h3>
          <blockquote style={styles.pullQuote}>
            Mewujudkan kuantitas dan kualitas sarana dan prasarana dasar yang ditandai dengan meningkatnya
            infrastruktur wilayah yang andal, sehingga dapat meningkatkan aksesibilitas dan mobilitas.
          </blockquote>

          <div style={styles.detailCard}>
            <p style={styles.detailPara}>
              Misi ini didukung oleh faktor-faktor yang mendorong berkembangnya aktivitas produksi, membuka
              isolasi daerah, serta membentuk kawasan-kawasan pertumbuhan baru.
            </p>
            <p style={styles.detailPara}>
              Selain itu, misi ini juga mencakup peningkatan perumahan rakyat layak huni beserta fasilitas
              pendukungnya untuk mewujudkan daerah tanpa permukiman kumuh, serta pemerataan kebutuhan
              prasarana dan sarana pelayanan dasar di seluruh wilayah perdesaan dan perkotaan.
            </p>
            <p style={{ ...styles.detailPara, marginBottom: 0 }}>
              Termasuk di dalamnya adalah peningkatan jaringan irigasi dan bendung dalam rangka menciptakan
              ketahanan pangan bagi masyarakat Banjarnegara.
            </p>
          </div>
        </div>
      </section>

      {/* ── Struktur Organisasi ── */}
      <section id="struktur-organisasi" className="section" style={styles.orgSection}>
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="section-label">Kelembagaan</div>
          <h2>Struktur Organisasi</h2>
          <p style={styles.metaText}>
            Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Banjarnegara — Tahun 2024<br />
            (Peraturan Bupati Banjarnegara Nomor 36 Tahun 2022)
          </p>
          <div className="batik-divider" />

          {/* Kepala Dinas */}
          <div style={orgStyles.leaderCard}>
            <div style={orgStyles.leaderLabel}>Kepala Dinas</div>
            <div style={orgStyles.leaderName}>{kepalaDinas.name}</div>
            <div style={orgStyles.leaderNip}>NIP. {kepalaDinas.nip}</div>
          </div>

          {/* Sekretaris */}
          <OrgCard title="Sekretaris Dinas">
            <PersonRow {...sekretaris} />
            <div style={orgStyles.divider} />
            {subbagian.map((s) => (
              <div key={s.title} style={orgStyles.subItem}>
                <div style={orgStyles.subTitle}>{s.title}</div>
                <PersonRow name={s.name} nip={s.nip} />
              </div>
            ))}
          </OrgCard>

          {/* Bidang */}
          <h3 style={{ marginTop: 40 }}>Bidang</h3>
          <div style={orgStyles.bidangGrid}>
            {bidangList.map((b) => (
              <OrgCard key={b.title} title={b.title}>
                <PersonRow {...b.kepala} />
                <div style={orgStyles.divider} />
                {b.sub.map((s) => (
                  <div key={s.title} style={orgStyles.subItem}>
                    <div style={orgStyles.subTitle}>{s.title}</div>
                    <PersonRow name={s.name} nip={s.nip} />
                  </div>
                ))}
              </OrgCard>
            ))}
          </div>

          {/* UPTD */}
          <h3 style={{ marginTop: 44 }}>Unit Pelaksana Teknis Dinas (UPTD)</h3>
          <div style={orgStyles.uptdGrid}>
            {uptdList.map((u) => (
              <div key={u.title} style={orgStyles.uptdCard}>
                <div style={orgStyles.groupHeader}>{u.title}</div>
                <PersonRow {...u.kepala} />
                {u.tu && (
                  <>
                    <div style={orgStyles.divider} />
                    <div style={orgStyles.subItem}>
                      <div style={orgStyles.subTitle}>Kasubag Tata Usaha</div>
                      <PersonRow name={u.tu.name} nip={u.tu.nip} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

const styles = {
  tentangSection: { background: 'var(--color-bg)' },
  tentangGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: 56,
    alignItems: 'start',
  },
  tentangText: {},
  tentangSubtitle: {
    color: 'var(--color-maroon)',
    fontWeight: 600,
    fontSize: '1.05rem',
    marginBottom: 16,
    marginTop: -4,
  },
  tentangPara: {
    color: 'var(--color-ink-soft)',
    lineHeight: 1.8,
    marginBottom: 14,
  },
  valueGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
  },
  valueCard: {
    display: 'flex',
    gap: 16,
    alignItems: 'flex-start',
    padding: '18px 20px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    transition: 'box-shadow 0.22s, border-color 0.22s',
  },
  valueIcon: {
    flexShrink: 0,
    width: 44,
    height: 44,
    background: 'var(--color-gold-dim)',
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--color-gold)',
  },
  valueTitle: {
    fontWeight: 700,
    marginBottom: 4,
    fontSize: '0.97rem',
  },
  valueDesc: {
    margin: 0,
    fontSize: '0.86rem',
    color: 'var(--color-ink-soft)',
    lineHeight: 1.6,
  },
  visiSection: { background: 'var(--color-surface)' },
  orgSection:  { background: 'var(--color-bg)' },
  metaText: { color: 'var(--color-ink-soft)', marginTop: 0, lineHeight: 1.6 },
  visiCard: {
    background: 'var(--color-dark)',
    borderRadius: 'var(--radius-lg)',
    padding: '32px 36px',
    textAlign: 'center',
    marginBottom: 12,
  },
  visiLabel: {
    color: 'var(--color-gold-light)',
    fontWeight: 700,
    fontSize: '0.75rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  visiText: {
    color: '#FFFFFF',
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    margin: 0,
    fontStyle: 'italic',
    fontWeight: 500,
  },
  pullQuote: {
    margin: '20px 0',
    padding: '8px 0 8px 22px',
    borderLeft: '4px solid var(--color-gold)',
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--color-maroon)',
    lineHeight: 1.6,
  },
  detailCard: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px 28px',
    marginTop: 20,
  },
  detailPara: {
    lineHeight: 1.8,
    marginBottom: 16,
    color: 'var(--color-ink)',
  },
};

const orgStyles = {
  leaderCard: {
    background: 'var(--color-dark)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px 28px',
    textAlign: 'center',
    marginBottom: 14,
  },
  leaderLabel: {
    color: 'var(--color-gold-light)',
    fontSize: '0.72rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    marginBottom: 8,
  },
  leaderName: { color: '#FFFFFF', fontWeight: 700, fontSize: '1.1rem' },
  leaderNip:  { color: 'rgba(255,255,255,0.55)', fontSize: '0.8rem', marginTop: 2 },
  groupCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '18px 22px',
    marginBottom: 12,
  },
  groupHeader: {
    fontWeight: 700,
    color: 'var(--color-maroon)',
    fontSize: '0.88rem',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.02em',
  },
  personRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 6,
  },
  personName:  { fontWeight: 600, fontSize: '0.95rem' },
  personNip:   { fontSize: '0.78rem', color: 'var(--color-ink-soft)' },
  personEmpty: { fontSize: '0.88rem', color: 'var(--color-ink-muted)', fontStyle: 'italic' },
  divider:     { height: 1, background: 'var(--color-border-soft)', margin: '12px 0' },
  subItem:     { marginTop: 10 },
  subTitle:    { fontSize: '0.78rem', color: 'var(--color-ink-soft)', marginBottom: 3 },
  bidangGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 0,
    marginTop: 16,
  },
  uptdGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
    gap: 12,
    marginTop: 16,
  },
  uptdCard: {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '16px 18px',
  },
};
