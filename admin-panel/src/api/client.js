const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('dpupr_admin_token');
}

async function request(path, options = {}) {
  const token = getToken();

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers
    }
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || 'Terjadi kesalahan pada server backend.');
  }

  return data;
}

// Khusus upload file (multipart/form-data) -- TIDAK boleh set Content-Type
// manual, browser yang mengatur otomatis (termasuk boundary-nya).
async function requestUpload(path, formData) {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: formData
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Gagal mengunggah file.');
  }
  return data;
}

export const api = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  getStatistik: () => request('/dashboard/statistik'),

  getPaketKontrak: () => request('/paket-kontrak'),
  createPaketKontrak: (payload) =>
    request('/admin/paket-kontrak', { method: 'POST', body: JSON.stringify(payload) }),
  updatePaketKontrak: (id, payload) =>
    request(`/admin/paket-kontrak/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deletePaketKontrak: (id) => request(`/admin/paket-kontrak/${id}`, { method: 'DELETE' }),

  getJadwalAspal: () => request('/jadwal-aspal'),
  createJadwalAspal: (payload) =>
    request('/admin/jadwal-aspal', { method: 'POST', body: JSON.stringify(payload) }),
  updateJadwalAspal: (id, payload) =>
    request(`/admin/jadwal-aspal/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteJadwalAspal: (id) => request(`/admin/jadwal-aspal/${id}`, { method: 'DELETE' }),

  getBukuTamu: () => request('/admin/buku-tamu'),

  getChatLogs: () => request('/admin/chat-logs'),

  getDokumentasi: () => request('/dokumentasi'),
  createDokumentasi: (formData) => requestUpload('/admin/dokumentasi', formData),
  deleteDokumentasi: (id) => request(`/admin/dokumentasi/${id}`, { method: 'DELETE' })
};

export { getToken };
