import { useState, useRef, useEffect } from 'react';
import { api } from '../api/client';
import { renderChatText } from '../utils/renderChatText';
import { SiBiMaText } from './BrandWordmark';

const QUICK_PROMPTS = [
  'Jadwal pengaspalan hotmix minggu ini?',
  'Bagaimana alur lapor jalan rusak?',
  'Apa saja paket jalan yang sedang berjalan?',
  'Di mana alamat kantor DPUPR?',
];

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Halo! Saya asisten AI Pojok Si BiMa. Ada yang bisa saya bantu seputar paket jalan, jadwal hotmix, atau layanan DPUPR Banjarnegara?'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function sendQuestion(questionText) {
    const q = questionText || input;
    if (!q.trim() || loading) return;

    // Susun riwayat dari pesan yang sudah ada (skip pesan sapaan pembuka),
    // format role 'user'/'model' sesuai yang diharapkan backend & Gemini.
    const riwayat = messages
      .filter((_, idx) => idx > 0) // skip sapaan pembuka bot di awal
      .map((m) => ({ role: m.role === 'user' ? 'user' : 'model', text: m.text }));

    setMessages((prev) => [...prev, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.askChatbot(q, riwayat);
      setMessages((prev) => [...prev, { role: 'bot', text: res.jawaban || res.message || 'Informasi berhasil diterima.' }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Mohon maaf, terjadi kendala saat memproses jawaban. Silakan coba beberapa saat lagi atau hubungi kontak kami.' }
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    sendQuestion();
  }

  return (
    <>
      {/* Floating Panel */}
      {open && (
        <div style={styles.panel}>
          {/* Header */}
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <div style={styles.avatar}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 2a2 2 0 012 2v2a2 2 0 01-2 2 2 2 0 01-2-2V4a2 2 0 012-2zM4 11a2 2 0 012-2h12a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7z" />
                  <path d="M9 16v-2m6 2v-2" />
                </svg>
              </div>
              <div>
                <div style={styles.title}>Tanya <SiBiMaText /> AI</div>
                <div style={styles.statusRow}>
                  <span style={styles.onlineDot} />
                  <span style={styles.statusText}>Asisten Digital DPUPR</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              style={styles.closeBtn}
              aria-label="Tutup chatbot"
            >
              ✕
            </button>
          </div>

          {/* Messages list */}
          <div style={styles.messages}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  ...styles.bubble,
                  ...(m.role === 'user' ? styles.bubbleUser : styles.bubbleBot)
                }}
              >
                {m.role === 'bot' ? renderChatText(m.text) : m.text}
              </div>
            ))}

            {loading && (
              <div style={{ ...styles.bubble, ...styles.bubbleBot, fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                Sedang mencari jawaban...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick chips (only show if few messages) */}
          {messages.length <= 2 && (
            <div style={styles.chipsRow}>
              {QUICK_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendQuestion(prompt)}
                  style={styles.chip}
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input form */}
          <form onSubmit={handleFormSubmit} style={styles.inputRow}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda di sini..."
              style={styles.input}
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                ...styles.sendBtn,
                opacity: !input.trim() ? 0.6 : 1,
              }}
              aria-label="Kirim"
            >
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...styles.fab,
          ...(open ? styles.fabOpen : {})
        }}
        aria-label="Buka Chatbot Tanya Si BiMa AI"
        title="Tanya Si BiMa AI"
      >
        {open ? (
          <span style={{ fontSize: '1.3rem' }}>✕</span>
        ) : (
          <div style={styles.fabInner}>
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={styles.fabText}>Tanya <SiBiMaText /></span>
          </div>
        )}
      </button>
    </>
  );
}

const styles = {
  fab: {
    position: 'fixed',
    bottom: 55,
    right: 24,
    background: 'linear-gradient(135deg, var(--color-navy) 0%, #152A4A 100%)',
    color: 'var(--color-gold-light)',
    border: '1.5px solid rgba(212, 175, 55, 0.4)',
    borderRadius: 30,
    padding: '12px 20px',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(10, 25, 47, 0.35)',
    zIndex: 999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  fabOpen: {
    padding: '12px',
    borderRadius: '50%',
    width: 50,
    height: 50,
    background: 'var(--color-maroon)',
    borderColor: 'transparent',
    color: '#fff',
  },
  fabInner: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  fabText: {
    fontWeight: 700,
    fontSize: '0.92rem',
    letterSpacing: '0.02em',
  },
  panel: {
    position: 'fixed',
    bottom: 117,
    right: 24,
    width: 380,
    maxWidth: 'calc(100vw - 48px)',
    height: 520,
    maxHeight: 'calc(100vh - 120px)',
    background: 'var(--color-surface)',
    borderRadius: 20,
    boxShadow: '0 16px 48px rgba(10, 25, 47, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    zIndex: 999,
    border: '1px solid var(--color-border)',
    animation: 'slideUp 0.25s ease-out',
  },
  header: {
    background: 'linear-gradient(135deg, var(--color-navy) 0%, #142847 100%)',
    color: 'var(--color-white)',
    padding: '16px 18px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '2px solid var(--color-gold)',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: 'rgba(212, 175, 55, 0.2)',
    color: 'var(--color-gold-light)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(212, 175, 55, 0.4)',
  },
  title: {
    fontWeight: 700,
    fontSize: '0.98rem',
    color: '#ffffff',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#10b981',
    display: 'inline-block',
  },
  statusText: {
    fontSize: '0.75rem',
    color: 'var(--color-gold-light)',
  },
  closeBtn: {
    background: 'rgba(255, 255, 255, 0.1)',
    border: 'none',
    color: 'white',
    width: 30,
    height: 30,
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '0.9rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  messages: {
    flex: 1,
    padding: 16,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    background: 'var(--color-bg)',
  },
  bubble: {
    padding: '12px 16px',
    borderRadius: 16,
    fontSize: '0.9rem',
    lineHeight: 1.5,
    maxWidth: '85%',
    wordBreak: 'break-word',
  },
  bubbleBot: {
    background: 'var(--color-surface)',
    color: 'var(--color-text-primary)',
    alignSelf: 'flex-start',
    border: '1px solid var(--color-border)',
    borderBottomLeftRadius: 4,
    boxShadow: '0 2px 6px rgba(0,0,0,0.03)',
  },
  bubbleUser: {
    background: 'linear-gradient(135deg, var(--color-navy) 0%, #152A4A 100%)',
    color: '#ffffff',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
    boxShadow: '0 2px 8px rgba(10,25,47,0.2)',
  },
  chipsRow: {
    padding: '8px 14px',
    display: 'flex',
    gap: 6,
    overflowX: 'auto',
    background: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)',
  },
  chip: {
    background: 'var(--color-bg)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-navy)',
    padding: '6px 12px',
    borderRadius: 14,
    fontSize: '0.78rem',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    fontWeight: 600,
  },
  inputRow: {
    display: 'flex',
    padding: '10px 12px',
    background: 'var(--color-surface)',
    borderTop: '1px solid var(--color-border)',
    gap: 8,
  },
  input: {
    flex: 1,
    border: '1px solid var(--color-border)',
    borderRadius: 24,
    padding: '10px 16px',
    fontSize: '0.9rem',
    outline: 'none',
    background: 'var(--color-bg)',
    color: 'var(--color-text-primary)',
  },
  sendBtn: {
    background: 'var(--color-navy)',
    color: 'var(--color-gold-light)',
    border: 'none',
    width: 40,
    height: 40,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'background 0.2s',
  },
};
