/**
 * Script buat import data dari file "Jadwal Gelaran Aspal" (Excel) ke tabel jadwal_aspal.
 *
 * Cara pakai:
 * 1. Taruh file excel-nya di folder ini (backend/data/), rename jadi "jadwal-aspal.xlsx"
 * 2. Install library xlsx dulu: npm install xlsx
 * 3. Jalankan migration sql/004_update_jadwal_aspal.sql di Supabase SQL Editor dulu
 * 4. Jalankan: node scripts/import-jadwal-aspal.js
 */

const path = require('path');
const XLSX = require('xlsx');
require('dotenv').config();
const supabase = require('../src/config/supabase');

const FILE_PATH = path.join(__dirname, '../data/jadwal-aspal.xlsx');

// Excel bisa nyimpen tanggal sebagai serial number ATAU string kayak "Senin, 25/11/2024"
// Fungsi ini coba dua-duanya
function parseTanggal(value) {
  if (!value) return null;

  // Kalau tanggal Excel (serial number / Date object)
  if (value instanceof Date) {
    return value.toISOString().split('T')[0];
  }

  // Kalau string format "Senin, 25/11/2024" atau "28/11/24"
  if (typeof value === 'string') {
    const match = value.match(/(\d{1,2})\/(\d{1,2})\/(\d{2,4})/);
    if (match) {
      let [, day, month, year] = match;
      if (year.length === 2) year = '20' + year;
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
  }

  return null;
}

async function run() {
  console.log('Membaca file:', FILE_PATH);
  const workbook = XLSX.readFile(FILE_PATH);
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: false, defval: null });

  const records = [];

  // Data mulai dari baris ke-5 (index 4), lewatin baris header
  for (let i = 4; i < rows.length; i++) {
    const row = rows[i];
    if (!row || row[0] === null || row[0] === undefined) continue; // skip baris breakdown harian

    const [
      no, namaPaket, tglMulaiRaw, tglSelesaiRaw, status, , hariKe, jam,
      sta, panjang, lebar, lokasi, kontak
    ] = row;

    // skip kalau nama paketnya kosong (data tidak lengkap di file sumber, misal "Paket No. 4")
    if (!namaPaket) {
      console.log(`Baris No. ${no} dilewati karena nama paket kosong di file sumber.`);
      continue;
    }

    let staMulai = null;
    let staSelesai = null;
    if (sta && typeof sta === 'string' && sta.includes('s/d')) {
      const parts = sta.split('s/d').map((s) => s.trim());
      staMulai = parts[0];
      staSelesai = parts[1];
    }

    records.push({
      nama_paket: namaPaket,
      tanggal_mulai: parseTanggal(tglMulaiRaw),
      tanggal_selesai: parseTanggal(tglSelesaiRaw),
      status,
      sta_mulai: staMulai,
      sta_selesai: staSelesai,
      panjang_m: panjang ? Number(panjang) : null,
      lebar_m: lebar ? Number(lebar) : null,
      lokasi_maps_url: lokasi,
      kontak_person: kontak
    });
  }

  console.log(`Ditemukan ${records.length} paket pekerjaan. Mengirim ke Supabase...`);

  const { data, error } = await supabase.from('jadwal_aspal').insert(records).select();

  if (error) {
    console.error('Gagal import:', error.message);
    process.exit(1);
  }

  console.log(`Berhasil import ${data.length} baris.`);
}

run();
