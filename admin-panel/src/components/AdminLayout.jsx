import Sidebar from './Sidebar';

export default function AdminLayout({ title, description, children }) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <main style={styles.main}>
        <header style={styles.header}>
          <h1 style={styles.title}>{title}</h1>
          {description && <p style={styles.description}>{description}</p>}
        </header>
        <div style={styles.content}>{children}</div>
      </main>
    </div>
  );
}

const styles = {
  main: {
    flex: 1,
    minHeight: '100vh',
    background: 'var(--color-bg)'
  },
  header: {
    padding: '32px 40px 20px',
    borderBottom: '1px solid var(--color-border)'
  },
  title: {
    fontSize: '1.8rem'
  },
  description: {
    color: 'var(--color-ink-soft)',
    marginTop: 6,
    marginBottom: 0
  },
  content: {
    padding: '32px 40px'
  }
};
