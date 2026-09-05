import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/dashboard', label: 'Beranda', icon: '⌂' },
  { path: '/paket-kontrak', label: 'Paket Kontrak', icon: '📋' },
  { path: '/jadwal-aspal', label: 'Jadwal Aspal', icon: '🛣' },
  { path: '/dokumentasi', label: 'Dokumentasi', icon: '📷' },
  { path: '/buku-tamu', label: 'Buku Tamu', icon: '✉' },
  { path: '/chat-log', label: 'Riwayat Chatbot', icon: '💬' }
];

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside style={styles.sidebar}>
      <div style={styles.brand}>
        <img src="/arjuna-logo.png" alt="" style={styles.logo} />
        <div>
          <div style={styles.brandTitle}>Pojok Si BiMa</div>
          <div style={styles.brandSubtitle}>Panel Admin</div>
        </div>
      </div>

      <div className="batik-divider" style={{ margin: '20px 24px' }} />

      <nav style={styles.nav}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              ...styles.navItem,
              ...(isActive ? styles.navItemActive : {})
            })}
          >
            <span style={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div style={styles.footer}>
        <div style={styles.userInfo}>
          <div style={styles.userName}>{user?.username}</div>
          <div style={styles.userRole}>Admin</div>
        </div>
        <button onClick={logout} style={styles.logoutButton}>
          Keluar
        </button>
      </div>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: 260,
    minHeight: '100vh',
    background: 'var(--color-bg-sidebar)',
    color: 'var(--color-white)',
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '24px 24px 0'
  },
  logo: {
    width: 44,
    height: 44,
    objectFit: 'contain'
  },
  brandTitle: {
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize: '1.1rem',
    color: 'var(--color-white)'
  },
  brandSubtitle: {
    fontSize: '0.78rem',
    color: 'var(--color-gold-light)'
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    padding: '0 16px',
    flex: 1
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '13px 16px',
    borderRadius: 8,
    color: 'rgba(255,255,255,0.75)',
    textDecoration: 'none',
    fontSize: '1rem',
    fontWeight: 500
  },
  navItemActive: {
    background: 'var(--color-gold)',
    color: 'var(--color-ink)',
    fontWeight: 700
  },
  navIcon: {
    fontSize: '1.15rem',
    width: 22,
    textAlign: 'center'
  },
  footer: {
    padding: '20px 24px',
    borderTop: '1px solid rgba(255,255,255,0.12)'
  },
  userInfo: {
    marginBottom: 12
  },
  userName: {
    fontWeight: 600,
    color: 'var(--color-white)'
  },
  userRole: {
    fontSize: '0.8rem',
    color: 'rgba(255,255,255,0.6)'
  },
  logoutButton: {
    width: '100%',
    padding: '10px',
    background: 'transparent',
    border: '1.5px solid var(--color-gold)',
    color: 'var(--color-gold)',
    borderRadius: 6,
    fontWeight: 600,
    fontSize: '0.9rem'
  }
};
