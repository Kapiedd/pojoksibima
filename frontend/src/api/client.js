const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Terjadi kesalahan, coba lagi.');
  }

  return data;
}

export const api = {
  getPaketKontrak: () => request('/paket-kontrak'),
  getJadwalAspal: () => request('/jadwal-aspal'),
  getDokumentasi: (kategori) => request(`/dokumentasi${kategori && kategori !== 'Semua' ? `?kategori=${encodeURIComponent(kategori)}` : ''}`),

  submitBukuTamu: (payload) =>
    request('/buku-tamu', { method: 'POST', body: JSON.stringify(payload) }),

  getVisitorCounter: () => request('/visitor-counter'),
  incrementVisitorCounter: () => request('/visitor-counter/increment', { method: 'POST' }),

  askChatbot: (pertanyaan, riwayat) =>
    request('/chatbot', { method: 'POST', body: JSON.stringify({ pertanyaan, riwayat }) })
};
