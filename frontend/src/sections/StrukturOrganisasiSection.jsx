// Sumber: Struktur Organisasi DPUPR Kabupaten Banjarnegara Tahun 2024,
// berdasarkan Peraturan Bupati Banjarnegara Nomor 36 Tahun 2022.
//
// Catatan desain: sengaja dibuat sebagai daftar bertingkat (bukan bagan lebar
// dengan garis penghubung), supaya selalu rapi di layar sempit maupun lebar
// tanpa risiko kotak saling tumpang tindih.

const kepalaDinas = { name: 'Yusuf Winarsono, ST.MT', nip: '19710507 199803 1 007' };
const sekretaris = { name: 'M. Arqom Al Fahmi, ST, M.Si', nip: '19750901 200801 1 008' };

const subbagian = [
  { title: 'Kasubbag Perencanaan dan Keuangan', name: 'Intihatun Munawaroh, SE.', nip: '19790526 200212 2 007' },
  { title: 'Kasubbag Umum dan Kepegawaian', name: 'Esti Agustini, S.Si', nip: '19690906 199803 2 008' }
];

const bidangList = [
  {
    title: 'Bidang Bangunan Gedung',
    kepala: { name: 'Resiati Widiastuti, ST', nip: '19740226 200212 2 006' },
    sub: [
      { title: 'Sub Koordinator Pembangunan & Pemeliharaan Bangunan Gedung', name: 'Yudi Lestari, ST', nip: '19800929 201001 2 012' },
      { title: 'Sub Koordinator Jasa Konstruksi', name: 'Subur Setiono, ST', nip: '19760606 199703 1 005' }
    ]
  },
  {
    title: 'Bidang Bina Marga',
    kepala: { name: 'Hermawan Tutut Indarjo, ST', nip: '19761025 200901 1 006' },
    sub: [
      { title: 'Sub Koordinator Peningkatan Jalan & Jembatan', name: 'Sigit Prabowo, ST', nip: '19800329 201101 1 001' },
      { title: 'Sub Koordinator Pemeliharaan Jalan & Jembatan', name: 'Arif Setyawan, ST', nip: '19790727 200903 1 003' }
    ]
  },
  {
    title: 'Bidang Pengelolaan Sumber Daya Air',
    kepala: { name: 'Suseno Adji Hartono, ST', nip: '19720605 199703 1 008' },
    sub: [
      { title: 'Sub Koordinator Pendayagunaan Sumber Daya Air', name: 'Agus Budiyanto, ST', nip: '19770817 200903 1 005' },
      { title: 'Sub Koordinator Irigasi, Operasi & Pemeliharaan SDA', name: 'Eko Rudianto, ST', nip: '19700710 199903 1 004' }
    ]
  },
  {
    title: 'Bidang Tata Ruang',
    kepala: { name: 'Fajar Mulato, ST.MT', nip: '19850813 201001 1 016' },
    sub: [
      { title: 'Sub Koordinator Tata Ruang Wilayah', name: null, nip: null },
      { title: 'Sub Koordinator Pengendalian Tata Ruang & Kawasan', name: 'Prasetya Adhie Nugraha, S.Si', nip: '19780529 200903 1 004' }
    ]
  }
];

const uptdList = [
  { title: 'UPTD Wilayah I', kepala: { name: 'Satirun, ST', nip: '19680805 199703 1 005' }, tu: null },
  { title: 'UPTD Wilayah II', kepala: { name: 'Catur Luth Hananjaya, ST', nip: '19750729 200903 1 005' }, tu: { name: 'Dwi Satmoko, ST', nip: '19830412 200801 1 003' } },
  { title: 'UPTD Wilayah III', kepala: { name: 'Adi Purwanto, SE', nip: '19840523 201502 1 001' }, tu: null },
  { title: 'UPTD Wilayah IV', kepala: { name: 'Achmad Mutaqin, ST', nip: '19710515 199210 1 001' }, tu: null },
  { title: 'UPTD Wilayah V', kepala: { name: 'Candra, ST', nip: '19761215 200003 1 004' }, tu: { name: 'Samsul Bahri, ST', nip: '19780601 200801 1 023' } },
  { title: 'UPTD Perlengkapan & Perbengkelan', kepala: { name: 'Tarwan', nip: '19800602 201101 1 004' }, tu: null }
];

function PersonRow({ name, nip }) {
  if (!name) {
    return <div style={styles.personEmpty}>Belum terisi</div>;
  }
  return (
    <div style={styles.personRow}>
      <div style={styles.personName}>{name}</div>
      <div style={styles.personNip}>NIP. {nip}</div>
    </div>
  );
}

export default function StrukturOrganisasiSection() {
  return (
    <section id="struktur-organisasi" className="section" style={{ background: 'var(--color-white)' }}>
      <div className="container" style={{ maxWidth: 820 }}>
        <h2>Struktur Organisasi</h2>
        <p style={{ color: 'var(--color-ink-soft)', marginTop: 0 }}>
          Dinas Pekerjaan Umum dan Penataan Ruang Kabupaten Banjarnegara — Tahun 2024
          (Peraturan Bupati Banjarnegara Nomor 36 Tahun 2022)
        </p>
        <div className="batik-divider" />

        {/* Pimpinan */}
        <div style={styles.leaderCard}>
          <div style={styles.leaderLabel}>Kepala Dinas</div>
          <div style={styles.leaderName}>{kepalaDinas.name}</div>
          <div style={styles.leaderNip}>NIP. {kepalaDinas.nip}</div>
        </div>

        <div style={styles.groupCard}>
          <div style={styles.groupHeader}>Sekretaris Dinas</div>
          <PersonRow {...sekretaris} />
          <div style={styles.subDivider} />
          {subbagian.map((s) => (
            <div key={s.title} style={styles.subItem}>
              <div style={styles.subTitle}>{s.title}</div>
              <PersonRow name={s.name} nip={s.nip} />
            </div>
          ))}
        </div>

        {/* Bidang-bidang */}
        <h3 style={{ marginTop: 44 }}>Bidang</h3>
        <div style={styles.bidangList}>
          {bidangList.map((b) => (
            <div key={b.title} style={styles.groupCard}>
              <div style={styles.groupHeader}>{b.title}</div>
              <PersonRow {...b.kepala} />
              <div style={styles.subDivider} />
              {b.sub.map((s) => (
                <div key={s.title} style={styles.subItem}>
                  <div style={styles.subTitle}>{s.title}</div>
                  <PersonRow name={s.name} nip={s.nip} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* UPTD */}
        <h3 style={{ marginTop: 44 }}>Unit Pelaksana Teknis Dinas (UPTD)</h3>
        <div style={styles.uptdGrid}>
          {uptdList.map((u) => (
            <div key={u.title} style={styles.uptdCard}>
              <div style={styles.groupHeader}>{u.title}</div>
              <PersonRow {...u.kepala} />
              {u.tu && (
                <>
                  <div style={styles.subDivider} />
                  <div style={styles.subItem}>
                    <div style={styles.subTitle}>Kasubag Tata Usaha</div>
                    <PersonRow name={u.tu.name} nip={u.tu.nip} />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  leaderCard: {
    background: 'var(--color-dark)',
    borderRadius: 'var(--radius)',
    padding: '24px 28px',
    textAlign: 'center',
    marginBottom: 16
  },
  leaderLabel: {
    color: 'var(--color-gold-light)',
    fontSize: '0.78rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    marginBottom: 8
  },
  leaderName: {
    color: 'var(--color-white)',
    fontWeight: 700,
    fontSize: '1.15rem'
  },
  leaderNip: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: '0.82rem',
    marginTop: 2
  },
  groupCard: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '20px 22px'
  },
  groupHeader: {
    fontWeight: 700,
    color: 'var(--color-maroon)',
    fontSize: '0.95rem',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.02em'
  },
  personRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    gap: 8
  },
  personName: {
    fontWeight: 600,
    fontSize: '0.98rem'
  },
  personNip: {
    fontSize: '0.8rem',
    color: 'var(--color-ink-soft)'
  },
  personEmpty: {
    fontSize: '0.9rem',
    color: 'var(--color-ink-soft)',
    fontStyle: 'italic'
  },
  subDivider: {
    height: 1,
    background: 'var(--color-border)',
    margin: '14px 0'
  },
  subItem: {
    marginTop: 12
  },
  subTitle: {
    fontSize: '0.82rem',
    color: 'var(--color-ink-soft)',
    marginBottom: 4
  },
  bidangList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 14,
    marginTop: 20
  },
  uptdGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: 14,
    marginTop: 20
  },
  uptdCard: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius)',
    padding: '18px 20px'
  }
};
