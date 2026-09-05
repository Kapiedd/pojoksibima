import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LANDING_URL = import.meta.env.VITE_LANDING_URL || 'http://localhost:5174';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Gagal masuk. Periksa username atau kata sandi Anda.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.page}>
      {/* Tombol Kembali ke Landing Page */}
      <div style={styles.topNav}>
        <a href={LANDING_URL} style={styles.backButton}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Kembali ke Landing Page</span>
        </a>
      </div>

      <div style={styles.card}>
        {/* Brand Header */}
        <div style={styles.brandRow}>
          <div style={styles.logoBadge}>
            <img
              src="/arjuna-logo.png"
              alt="Logo Arjuna Pojok Si BiMa"
              style={styles.logoImg}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <div style={styles.brandText}>
            <div style={styles.brandTitle}>POJOK Si BiMa</div>
            <div style={styles.brandSubtitle}>SISTEM INFORMASI BINA MARGA</div>
          </div>
        </div>

        {/* Form Title */}
        <div style={styles.titleArea}>
          <h1 style={styles.mainTitle}>Login Admin</h1>
          <p style={styles.subtitle}>Masuk untuk mengelola data infrastruktur</p>
        </div>

        {error && (
          <div style={styles.errorBox}>
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Field Username / Email */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="username">
              Email atau Username
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin@binamarga.go.id"
                style={styles.input}
                required
                autoFocus
              />
            </div>
          </div>

          {/* Field Password */}
          <div style={styles.fieldGroup}>
            <label style={styles.label} htmlFor="password">
              Kata Sandi
            </label>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
              </span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                style={{ ...styles.input, paddingRight: 42 }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
              >
                {showPassword ? (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Remember me & Forgot password */}
          <div style={styles.actionsRow}>
            <label style={styles.rememberLabel}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={styles.checkbox}
              />
              <span>Ingat saya</span>
            </label>
            <button
              type="button"
              onClick={() => alert('Silakan hubungi administrator SIMDA / Pusdatin DPUPR untuk reset kata sandi akun Anda.')}
              style={styles.forgotBtn}
            >
              Lupa password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              ...styles.submitBtn,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            disabled={loading}
          >
            {loading ? 'Memeriksa kredensial...' : 'Masuk'}
          </button>
        </form>

        {/* Footer info */}
        <div style={styles.copyright}>
          Hak Cipta {new Date().getFullYear()} Dinas Pekerjaan Umum Bina Marga
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#F8F9FA',
    padding: '24px 16px',
    fontFamily: 'var(--font-body)',
  },
  topNav: {
    width: '100%',
    maxWidth: 440,
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  backButton: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    color: '#4B5563',
    fontSize: '0.88rem',
    fontWeight: 600,
    textDecoration: 'none',
    padding: '8px 14px',
    borderRadius: 8,
    background: '#FFFFFF',
    border: '1px solid #E5E7EB',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
  },
  card: {
    background: '#FFFFFF',
    borderRadius: 16,
    padding: '40px 36px',
    width: '100%',
    maxWidth: 440,
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05), 0 1px 4px rgba(0, 0, 0, 0.03)',
    border: '1px solid #EEF0F2',
  },
  brandRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 26,
  },
  logoBadge: {
    width: 44,
    height: 44,
    borderRadius: 10,
    background: '#FAB005',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    boxShadow: '0 2px 8px rgba(250, 176, 5, 0.3)',
  },
  logoImg: {
    width: 32,
    height: 32,
    objectFit: 'contain',
  },
  brandText: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  brandTitle: {
    fontSize: '1.05rem',
    fontWeight: 800,
    color: '#111827',
    letterSpacing: '0.03em',
    lineHeight: 1.15,
  },
  brandSubtitle: {
    fontSize: '0.66rem',
    fontWeight: 700,
    color: '#6B7280',
    letterSpacing: '0.04em',
    marginTop: 3,
  },
  titleArea: {
    textAlign: 'center',
    marginBottom: 24,
  },
  mainTitle: {
    fontSize: '1.45rem',
    fontWeight: 800,
    color: '#111827',
    letterSpacing: '-0.02em',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6B7280',
    fontSize: '0.88rem',
    margin: 0,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    background: '#FEF2F2',
    color: '#991B1B',
    border: '1px solid #FEE2E2',
    borderRadius: 8,
    padding: '10px 14px',
    fontSize: '0.84rem',
    marginBottom: 18,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  fieldGroup: {
    marginBottom: 18,
  },
  label: {
    display: 'block',
    fontSize: '0.86rem',
    fontWeight: 600,
    color: '#374151',
    marginBottom: 6,
    textAlign: 'left',
  },
  inputWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  inputIcon: {
    position: 'absolute',
    left: 14,
    color: '#9CA3AF',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '11px 14px 11px 42px',
    borderRadius: 10,
    border: '1.5px solid #E5E7EB',
    background: '#F9FAFB',
    fontSize: '0.92rem',
    color: '#111827',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
  },
  eyeBtn: {
    position: 'absolute',
    right: 12,
    background: 'none',
    border: 'none',
    color: '#9CA3AF',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  actionsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    marginTop: 2,
  },
  rememberLabel: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    fontSize: '0.84rem',
    color: '#4B5563',
    cursor: 'pointer',
    userSelect: 'none',
  },
  checkbox: {
    width: 16,
    height: 16,
    accentColor: '#FAB005',
    cursor: 'pointer',
    borderRadius: 4,
  },
  forgotBtn: {
    background: 'none',
    border: 'none',
    color: '#1F2937',
    fontSize: '0.84rem',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0,
    textDecoration: 'none',
  },
  submitBtn: {
    width: '100%',
    padding: '12px 18px',
    background: '#FAB005',
    color: '#111827',
    border: 'none',
    borderRadius: 10,
    fontSize: '0.96rem',
    fontWeight: 700,
    boxShadow: '0 2px 10px rgba(250, 176, 5, 0.3)',
    transition: 'all 0.2s ease',
  },
  copyright: {
    textAlign: 'center',
    color: '#9CA3AF',
    fontSize: '0.76rem',
    marginTop: 26,
    lineHeight: 1.4,
  },
};
