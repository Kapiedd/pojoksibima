export default function StatCard({ label, value, accent }) {
  return (
    <div style={{ ...styles.card, borderTopColor: accent || 'var(--color-gold)' }}>
      <div style={styles.value}>{value}</div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  card: {
    background: 'var(--color-white)',
    border: '1px solid var(--color-border)',
    borderTop: '4px solid var(--color-gold)',
    borderRadius: 8,
    padding: '24px 22px',
    boxShadow: 'var(--shadow-sm)'
  },
  value: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem',
    fontWeight: 700,
    color: 'var(--color-ink)',
    lineHeight: 1
  },
  label: {
    marginTop: 8,
    color: 'var(--color-ink-soft)',
    fontSize: '0.95rem',
    fontWeight: 500
  }
};
