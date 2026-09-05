/**
 * Script buat membuat akun admin pertama.
 * Sengaja dibuat lewat script (bukan endpoint publik), supaya orang luar
 * tidak bisa mendaftar jadi admin sendiri.
 *
 * Cara pakai:
 *   node scripts/create-admin.js <username> <password>
 *
 * Contoh:
 *   node scripts/create-admin.js admin passwordRahasia123
 */

const bcrypt = require('bcryptjs');
require('dotenv').config();
const supabase = require('../src/config/supabase');

async function run() {
  const [, , username, password] = process.argv;

  if (!username || !password) {
    console.error('Cara pakai: node scripts/create-admin.js <username> <password>');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Password minimal 8 karakter.');
    process.exit(1);
  }

  const password_hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from('users')
    .insert([{ username, password_hash, role: 'admin' }])
    .select();

  if (error) {
    console.error('Gagal membuat admin:', error.message);
    process.exit(1);
  }

  console.log(`Admin "${username}" berhasil dibuat.`);
}

run();
