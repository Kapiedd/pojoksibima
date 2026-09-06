import PageLayout from '../components/PageLayout';
import TentangKamiSection from '../sections/TentangKamiSection';

export default function TentangPage() {
  return (
    <PageLayout>
      <div className="container" style={{ paddingTop: 24 }}>
        <a href="/" style={styles.backLink}>&larr; Kembali ke Beranda</a>
      </div>
      <TentangKamiSection />
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
