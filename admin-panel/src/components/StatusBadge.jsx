const statusStyles = {
  Berkontrak: { bg: 'var(--color-success-bg)', text: 'var(--color-success-text)' },
  Selesai: { bg: 'var(--color-success-bg)', text: 'var(--color-success-text)' },
  Pending: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-text)' },
  SPPBJ: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-text)' },
  Jadwal: { bg: 'var(--color-warning-bg)', text: 'var(--color-warning-text)' },
  Off: { bg: 'var(--color-danger-bg)', text: 'var(--color-danger-text)' }
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || { bg: '#F0F0F0', text: '#666' };

  return (
    <span
      style={{
        display: 'inline-block',
        padding: '4px 12px',
        borderRadius: 20,
        fontSize: '0.82rem',
        fontWeight: 600,
        background: style.bg,
        color: style.text
      }}
    >
      {status || 'Belum diisi'}
    </span>
  );
}
