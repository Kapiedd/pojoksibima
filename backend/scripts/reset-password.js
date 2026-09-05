/**
 * Script buat ganti password akun admin yang sudah ada.
 *
 * Cara pakai:
 *   node scripts/reset-password.js <username> <password_baru>
 *
 * Contoh:
 *   node scripts/reset-password.js admin PasswordBaru456
 */

const bcrypt = require('bcryptjs');
require('dotenv').config();
const supabase = require('../src/config/supabase');

async function run() {
  const [, , username, newPassword] = process.argv;

  if (!username || !newPassword) {
    console.error('Cara pakai: node scripts/reset-password.js <username> <password_baru>');
    process.exit(1);
  }

  if (newPassword.length < 8) {
    console.error('Password minimal 8 karakter.');
    process.exit(1);
  }

  const password_hash = await bcrypt.hash(newPassword, 10);

  const { data, error } = await supabase
    .from('users')
    .update({ password_hash })
    .eq('username', username)
    .select();

  if (error) {
    console.error('Gagal reset password:', error.message);
    process.exit(1);
  }

  if (!data.length) {
    console.error(`Username "${username}" tidak ditemukan.`);
    process.exit(1);
  }

  console.log(`Password untuk "${username}" berhasil diganti.`);
}

run();
