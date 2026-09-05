/**
 * Script buat import data dari file "PAKET BERKONTRAK BINA MARGA" (CSV) ke
 * tabel paket_kontrak.
 *
 * Cara pakai:
 * 1. Taruh file csv-nya di folder ini (backend/data/), rename jadi "paket-kontrak-2026.csv"
 * 2. Jalankan migration sql/006_update_paket_kontrak.sql di Supabase SQL Editor dulu
 * 3. Jalankan: node scripts/import-paket-kontrak.js
 *
 * Catatan: nomor "No." di file di-reset tiap ganti kategori (Sub Kegiatan),
 * jadi TIDAK dipakai sebagai id -- id tetap generate otomatis dari Supabase (uuid).
 * TAHUN diambil dari nama file (2026), sesuaikan variable TAHUN di bawah kalau
 * suatu saat import file tahun lain.
 */

const path = require('path');
const fs = require('fs');
require('dotenv').config();
const supabase = require('../src/config/supabase');

const FILE_PATH = path.join(__dirname, '../data/paket-kontrak-2026.csv');
const TAHUN = 2026;

// parser csv sederhana (cukup untuk file ini, tidak ada koma di dalam quote yang aneh)
function parseCSV(text) {
  return text
    .split(/\r?\n/)
    .map((line) => {
      // split by comma tapi hormati quote
      const result = [];
      let cur = '';
      let inQuotes = false;
      for (const char of line) {
        if (char === '"') inQuotes = !inQuotes;
        else if (char === ',' && !inQuotes) {
          result.push(cur);
          cur = '';
        } else cur += char;
      }
      result.push(cur);
      return result.map((c) => c.trim());
    });
}

async function run() {
  console.log('Membaca file:', FILE_PATH);
  const text = fs.readFileSync(FILE_PATH, 'utf-8').replace(/^\uFEFF/, ''); // buang BOM kalau ada
  const rows = parseCSV(text);

  const records = [];
  let currentKategori = null;

  for (const row of rows) {
    const [no, uraian, lokasi, status] = row;

    // baris kategori: kolom "No." kosong tapi kolom uraian diawali "Sub Kegiatan"
    if ((!no || no === '') && uraian && uraian.startsWith('Sub Kegiatan')) {
      currentKategori = uraian.trim();
      continue;
    }

    // baris data valid: "No." berupa angka
    if (no && /^\d+$/.test(no) && uraian) {
      records.push({
        nama_paket: uraian.trim(),
        kategori: currentKategori,
        lokasi: lokasi ? lokasi.trim() : null,
        status: status ? status.trim() : null,
        tahun: TAHUN
      });
    }
  }

  console.log(`Ditemukan ${records.length} paket pekerjaan. Mengirim ke Supabase...`);

  const { data, error } = await supabase.from('paket_kontrak').insert(records).select();

  if (error) {
    console.error('Gagal import:', error.message);
    process.exit(1);
  }

  console.log(`Berhasil import ${data.length} baris.`);
}

run();
