const supabase = require('../config/supabase');

// Info statis tentang DPUPR -- dipakai sebagai konteks dasar yang selalu
// dikirim ke AI, supaya chatbot bisa jawab pertanyaan umum (visi misi,
// struktur organisasi, alamat, kontak, dll) walau datanya tidak ada di
// database. Sumber teks disamakan persis dengan yang tampil di halaman
// publik (VisiMisiSection.jsx, StrukturOrganisasiSection.jsx, KontakSection.jsx)
// supaya jawaban chatbot tidak pernah beda/kontradiksi dengan isi website.
const STATIC_CONTEXT = `
Nama instansi: Dinas Pekerjaan Umum dan Penataan Ruang (DPUPR) Kabupaten Banjarnegara
Sistem: Pojok Si BiMa (Sistem Informasi Bina Marga)

ALAMAT KANTOR:
Jl. Mayor Jenderal DI Panjaitan No.13, Kutabanjarnegara, Kec. Banjarnegara,
Kab. Banjarnegara, Jawa Tengah 53418

JAM OPERASIONAL:
- Senin-Kamis: 07.30-16.00 WIB
- Jumat: 07.30-14.30 WIB
- Sabtu, Minggu, dan hari libur nasional: tutup

KONTAK:
- WhatsApp: 082241093330
- Instagram: @pojok.sibima
- Email: sibima.dpuprbna@gmail.com

VISI (RPJPD 2005-2025 Kabupaten Banjarnegara, Periode 4/RPD 2023-2026):
"Banjarnegara Maju Berbasis Pertanian"

MISI (Misi ke-4, yang terkait tugas pokok dan fungsi DPUPR):
Mewujudkan kuantitas dan kualitas sarana dan prasarana dasar yang ditandai
dengan meningkatnya infrastruktur wilayah yang andal, sehingga dapat
meningkatkan aksesibilitas dan mobilitas. Misi ini didukung oleh
faktor-faktor yang mendorong berkembangnya aktivitas produksi, membuka
isolasi daerah, membentuk kawasan pertumbuhan baru, meningkatkan perumahan
rakyat layak huni, pemerataan prasarana-sarana pelayanan dasar di wilayah
perdesaan dan perkotaan, serta meningkatkan jaringan irigasi dan bendung
untuk ketahanan pangan.

STRUKTUR ORGANISASI DPUPR (Tahun 2024, berdasarkan Perbup Banjarnegara No.36/2022):
- Kepala Dinas: Yusuf Winarsono, ST.MT
- Sekretaris Dinas: M. Arqom Al Fahmi, ST, M.Si
  - Kasubbag Perencanaan dan Keuangan: Intihatun Munawaroh, SE.
  - Kasubbag Umum dan Kepegawaian: Esti Agustini, S.Si
- Bidang Bangunan Gedung -- Kepala: Resiati Widiastuti, ST
- Bidang Bina Marga -- Kepala: Hermawan Tutut Indarjo, ST
- Bidang Pengelolaan Sumber Daya Air -- Kepala: Suseno Adji Hartono, ST
- Bidang Tata Ruang -- Kepala: Fajar Mulato, ST.MT
- UPTD Wilayah I sampai V, serta UPTD Perlengkapan & Perbengkelan, masing-masing
  dikepalai oleh pejabat UPTD di wilayah kerjanya masing-masing.
(Detail lengkap nama pejabat tiap sub-bidang dan NIP tersedia di halaman
"Struktur Organisasi" pada website ini.)

TUGAS POKOK DPUPR (berdasarkan Perbup Banjarnegara No.36/2022):
Melaksanakan urusan pemerintahan di bidang Pekerjaan Umum dan Penataan
Ruang yang menjadi kewenangan daerah, mencakup sub urusan bangunan gedung,
penataan bangunan dan lingkungannya, jalan, jasa konstruksi, serta penataan
ruang.

FUNGSI DPUPR:
1. Perumusan kebijakan di bidang bangunan gedung, bina marga, pengelolaan
   sumber daya air, dan tata ruang.
2. Pelaksanaan koordinasi dan pelaksanaan kebijakan di keempat bidang tersebut.
3. Pembinaan dan fasilitasi kebijakan di keempat bidang tersebut.
4. Pemantauan, evaluasi, dan pelaporan di keempat bidang tersebut.
5. Pelaksanaan fungsi kesekretariatan dinas dan pengendalian tugas UPTD.

TUGAS & FUNGSI KHUSUS BIDANG BINA MARGA (fokus utama website ini):
Bidang Bina Marga bertugas melakukan perencanaan, perumusan, koordinasi,
pelaksanaan, pembinaan, fasilitasi, pemantauan, evaluasi, dan pelaporan
kebijakan di bidang:
- Penyelenggaraan jalan kabupaten
- Peningkatan jalan dan jembatan
- Pemeliharaan jalan dan jembatan
Bidang ini terdiri dari 2 seksi: Seksi Peningkatan Jalan dan Jembatan, serta
Seksi Pemeliharaan Jalan dan Jembatan. Data Paket Kontrak dan Jadwal
Gelaran Aspal yang ditampilkan di website ini adalah hasil kerja Bidang
Bina Marga.

CATATAN KINERJA BINA MARGA (RENSTRA DPUPR 2023-2026, data terakhir 2022):
Persentase jalan kabupaten dalam kondisi baik dan berkualitas sekitar 81%,
dengan target terus meningkat setiap tahun melalui kegiatan pembangunan,
rekonstruksi, dan pemeliharaan jalan dan jembatan secara berimbang.
Tantangan utama yang dihadapi antara lain: belum optimalnya sarana dan
prasarana kebinamargaan, belum seluruh ruas jalan kabupaten dalam kondisi
baik, serta keterbatasan SDM untuk inspeksi dan pemeliharaan jalan.

PROFIL UMUM KABUPATEN BANJARNEGARA:
- Provinsi: Jawa Tengah (bagian barat, jalur pegunungan)
- Luas wilayah: sekitar 106.971 hektar (kurang lebih 3,1% dari luas Provinsi
  Jawa Tengah)
- Wilayah administratif: 20 kecamatan, 266 desa, dan 12 kelurahan
- Kecamatan terluas: Punggelan; kecamatan tersempit: Purwareja Klampok
- Jumlah penduduk: sekitar 1 juta jiwa (data bervariasi tiap tahun sensus/proyeksi)
- Batas wilayah: utara berbatasan dengan Kabupaten Pekalongan dan Batang,
  timur dengan Kabupaten Wonosobo, selatan dengan Kabupaten Kebumen, barat
  dengan Kabupaten Purbalingga dan Banyumas
- Topografi: bervariasi dari dataran rendah hingga pegunungan (sebagian
  wilayah berada di atas 1.000 meter di atas permukaan laut), beriklim
  tropis dengan musim kemarau dan hujan
- Sektor unggulan: pertanian, industri, dan pariwisata
- Visi Kabupaten Banjarnegara (sejalan dengan visi DPUPR di atas):
  "Banjarnegara Maju Berbasis Pertanian"

CATATAN: Alamat Kedudukan detail dan Maklumat Pelayanan masih dalam proses
pelengkapan data resmi dari instansi. Informasi profil Kabupaten Banjarnegara
di atas bersifat umum (dari sumber resmi pemerintah); untuk data terkini dan
paling akurat, sarankan pengunjung mengecek langsung ke website resmi
dpupr.banjarnegarakab.go.id atau menghubungi kontak yang tersedia.

CARA MELAPORKAN JALAN/JEMBATAN RUSAK ATAU MENYAMPAIKAN ASPIRASI:
Pengunjung dapat melaporkan kondisi jalan/jembatan rusak, memberikan
kritik, saran, maupun aspirasi lain terkait infrastruktur melalui fitur
"Buku Tamu" yang tersedia di website ini (bisa diakses lewat menu Akses
Cepat atau tombol "Isi Buku Tamu"). Isian tersebut akan diterima dan
ditindaklanjuti oleh admin DPUPR. Untuk laporan yang sifatnya mendesak/
darurat, sarankan pengunjung menghubungi kontak WhatsApp resmi yang
tersedia di atas.

PETA HALAMAN WEBSITE INI (gunakan untuk mengarahkan pengunjung kalau
mereka bingung mencari sesuatu):
- Beranda (/) -- sapaan, info jadwal & dokumentasi hari ini, akses cepat, kontak
- Tentang (/tentang) -- profil lengkap, visi misi, dan struktur organisasi DPUPR
- Paket Berkontrak Bina Marga (/paket-kontrak) -- daftar lengkap semua paket kontrak
- Jadwal Hotmix (/jadwal-aspal) -- daftar lengkap semua jadwal gelaran aspal
- Dokumentasi (/dokumentasi) -- galeri lengkap semua foto kegiatan lapangan
- Buku Tamu (/buku-tamu) -- form untuk mengisi kunjungan, laporan, atau aspirasi
- Manual Si BiMa (/manual) -- panduan cara menggunakan seluruh fitur website ini
Jika pengunjung bertanya "bagaimana cara pakai website ini" atau bingung
mencari fitur tertentu, arahkan ke halaman yang relevan di atas.
`.trim();

// Ambil semua data yang relevan buat chatbot SEKALIGUS setiap kali ada
// pertanyaan -- tidak lagi bergantung pada tebak-tebakan kata kunci.
// Alasannya: deteksi kata kunci gampang meleset di pertanyaan lanjutan yang
// singkat (contoh: "kalo yang belum gimana?" tidak menyebut kata "kontrak"
// sama sekali), sehingga chatbot kehilangan konteks. Karena jumlah data kita
// masih kecil (puluhan baris), mengirim semuanya sekaligus jauh lebih aman
// dan tidak melebihi batas gratis Gemini API.
//
// OPTIMASI KECEPATAN:
// 1. Kedua query database dijalankan BARENGAN (Promise.all), bukan satu-satu
//    berurutan -- ini bisa memangkas waktu tunggu database sampai separuhnya.
// 2. Hasilnya di-cache di memori server selama 60 detik. Data jadwal aspal &
//    paket kontrak jarang berubah tiap detik, jadi kalau ada beberapa
//    pertanyaan chatbot dalam waktu berdekatan (termasuk saat orang yang sama
//    tanya-jawab berkali-kali), server tidak perlu query ulang ke database
//    setiap kali -- langsung pakai hasil cache yang tersimpan.
let contextCache = { text: null, expiresAt: 0 };

async function buildContext() {
  const now = Date.now();
  if (contextCache.text && contextCache.expiresAt > now) {
    return contextCache.text;
  }

  const [{ data: jadwal }, { data: paket }, { data: dokumentasi }] = await Promise.all([
    supabase
      .from('jadwal_aspal')
      .select('nama_paket, tanggal_mulai, tanggal_selesai, status, lokasi_maps_url')
      .order('tanggal_mulai', { ascending: false })
      .limit(40),
    supabase
      .from('paket_kontrak')
      .select('nama_paket, kategori, lokasi, status, tahun')
      .limit(100),
    supabase
      .from('dokumen')
      .select('judul, kategori, lokasi, keterangan, tanggal_kegiatan')
      .order('tanggal_kegiatan', { ascending: false })
      .limit(30)
  ]);

  const todayFormatted = new Date().toLocaleDateString('id-ID', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  });
  const todayISO = new Date().toISOString().slice(0, 10);

  const context =
    STATIC_CONTEXT + '\n\n' +
    `TANGGAL HARI INI: ${todayFormatted} (${todayISO}). Gunakan tanggal ini sebagai acuan kalau pengunjung bertanya soal "hari ini", "minggu ini", "bulan ini", atau "sedang berlangsung" -- bandingkan dengan kolom tanggal_mulai dan tanggal_selesai pada data jadwal aspal di bawah.\n\n` +
    'DATA JADWAL GELARAN ASPAL:\n' + JSON.stringify(jadwal, null, 2) + '\n\n' +
    'DATA PAKET KONTRAK BINA MARGA:\n' + JSON.stringify(paket, null, 2) + '\n\n' +
    'DATA DOKUMENTASI KEGIATAN (foto/laporan progres lapangan):\n' + JSON.stringify(dokumentasi, null, 2) + '\n\n';

  contextCache = { text: context, expiresAt: now + 60_000 }; // cache 60 detik

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
          contents,
          generationConfig: {
            maxOutputTokens: 2048, // dinaikkan dari 500 -- supaya jawaban tidak terpotong saat perlu menjelaskan detail/daftar panjang
            temperature: 0.4
          }
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
