import PageLayout from '../components/PageLayout';
import DokumentasiSection from '../sections/DokumentasiSection';

export default function DokumentasiPage() {
  return (
    <PageLayout>
      <div className="container" style={{ paddingTop: 24 }}>
        <a href="/" style={styles.backLink}>&larr; Kembali ke Beranda</a>
      </div>
      <DokumentasiSection />
    </PageLayout>
  );
}

const styles = {
  backLink: {
    display: 'inline-block',
    color: 'var(--color-maroon)',
    fontWeight: 600,
    fontSize: '0.92rem'
  }
};
