const supabase = require('../config/supabase');

// Info statis tentang DPUPR -- SESUAIKAN dengan info asli dari ayah/instansi.
// Ini dipakai sebagai konteks dasar yang selalu dikirim ke AI, supaya chatbot
// bisa jawab pertanyaan umum (visi misi, kontak, dll) walau datanya tidak ada
// di database.
const STATIC_CONTEXT = `
Nama instansi: Dinas Pekerjaan Umum dan Penataan Ruang (DPUPR)
Sistem: Pojok Si BiMa (Sistem Informasi Bina Marga)
Kontak:
- WhatsApp: 082241093330
- Instagram: @pojok.sibima
- Email: sibima.dpuprbna@gmail.com

CATATAN UNTUK DEVELOPER: lengkapi bagian Visi Misi, Struktur Organisasi,
Alamat Kedudukan, dan Maklumat Pelayanan di sini setelah dapat teks aslinya
dari instansi, supaya chatbot bisa menjawab pertanyaan seputar itu juga.
`.trim();

// Ambil semua data yang relevan buat chatbot SEKALIGUS setiap kali ada
// pertanyaan -- tidak lagi bergantung pada tebak-tebakan kata kunci.
// Alasannya: deteksi kata kunci gampang meleset di pertanyaan lanjutan yang
// singkat (contoh: "kalo yang belum gimana?" tidak menyebut kata "kontrak"
// sama sekali), sehingga chatbot kehilangan konteks. Karena jumlah data kita
// masih kecil (puluhan baris), mengirim semuanya sekaligus jauh lebih aman
// dan tidak melebihi batas gratis Gemini API.
async function buildContext() {
  let context = STATIC_CONTEXT + '\n\n';

  const { data: jadwal } = await supabase
    .from('jadwal_aspal')
    .select('nama_paket, tanggal_mulai, tanggal_selesai, status, lokasi_maps_url')
    .order('tanggal_mulai', { ascending: false })
    .limit(40);
  context += 'DATA JADWAL GELARAN ASPAL:\n' + JSON.stringify(jadwal, null, 2) + '\n\n';

  const { data: paket } = await supabase
    .from('paket_kontrak')
    .select('nama_paket, kategori, lokasi, status, tahun')
    .limit(100);
  context += 'DATA PAKET KONTRAK BINA MARGA:\n' + JSON.stringify(paket, null, 2) + '\n\n';

  return context;
}

// POST /api/chatbot
// Body: { pertanyaan, riwayat? }
// riwayat (opsional): array percakapan sebelumnya dalam sesi ini, format:
// [{ role: 'user', text: '...' }, { role: 'model', text: '...' }, ...]
// Dipakai supaya chatbot "ingat" pertanyaan lanjutan yang tidak menyebut
// ulang kata kunci topiknya (contoh: "kalo yang belum gimana?").
async function askChatbot(req, res) {
  try {
    const { pertanyaan, riwayat } = req.body;

    if (!pertanyaan || !pertanyaan.trim()) {
      return res.status(400).json({ status: 'error', message: 'Field "pertanyaan" wajib diisi' });
    }

    const context = await buildContext();

    const systemPrompt = `Kamu adalah asisten virtual untuk website DPUPR (Pojok Si BiMa). Jawab pertanyaan pengunjung HANYA berdasarkan data yang diberikan di bawah ini. Kalau informasi yang ditanyakan tidak ada di data, katakan dengan jujur bahwa kamu tidak punya informasinya dan sarankan menghubungi kontak yang tersedia.

ATURAN FORMAT JAWABAN (penting, wajib diikuti):
- Tulis dalam Bahasa Indonesia yang natural, singkat, dan langsung ke inti jawaban.
- Kalau menyebutkan daftar/list lebih dari 2 item, WAJIB pisahkan tiap item ke baris baru (gunakan enter/newline), jangan digabung jadi satu paragraf panjang.
- Kalau daftar hasilnya lebih dari 6 item, JANGAN sebutkan semua satu-satu. Cukup sebutkan jumlah totalnya dan 2-3 contoh saja, lalu tawarkan untuk menyebutkan sisanya kalau pengunjung minta lebih detail.
- Gunakan cetak tebal (diapit **) hanya untuk angka atau kata kunci penting, jangan berlebihan.
- Ingat konteks percakapan sebelumnya kalau pertanyaan lanjutan terasa menyambung dari topik sebelumnya, meskipun kata kuncinya tidak persis sama.

${context}`;

    // Susun riwayat percakapan (maksimal 6 pesan terakhir, biar hemat token)
    // jadi format "contents" multi-turn yang dipahami Gemini API.
    const riwayatValid = Array.isArray(riwayat) ? riwayat.slice(-6) : [];
    const contents = [
      ...riwayatValid.map((m) => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text || '') }]
      })),
      { role: 'user', parts: [{ text: pertanyaan }] }
    ];

    // Model gratis di free tier Gemini API. Kalau nanti nama modelnya berubah
    // lagi (Google sering update), cek daftar model terbaru di https://ai.google.dev/gemini-api/docs/models
    const MODEL = 'gemini-3.6-flash';

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': process.env.GEMINI_API_KEY
        },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: systemPrompt }] },
          contents
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Gagal menghubungi AI');
    }

    const jawaban =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Maaf, saya tidak bisa menjawab pertanyaan itu saat ini.';

    // Simpan history chat, supaya admin bisa lihat & periksa nanti.
    // Sengaja tidak pakai "await" + tidak menggagalkan response ke user
    // kalau proses simpan ini error (biar chatbot tetap jalan lancar).
    supabase.from('chat_logs').insert([{ pertanyaan, jawaban }]).then(({ error: logError }) => {
      if (logError) console.error('Gagal menyimpan chat log:', logError.message);
    });

    res.json({ jawaban });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

// GET /api/admin/chat-logs
// Untuk admin melihat history percakapan dengan chatbot, terbaru duluan
async function getChatLogs(req, res) {
  try {
    const { data, error } = await supabase
      .from('chat_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error) throw error;

    res.json({ data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}

module.exports = { askChatbot, getChatLogs };
