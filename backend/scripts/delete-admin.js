/**
 * Script buat menghapus akun admin.
 *
 * Cara pakai:
 *   node scripts/delete-admin.js <username>
 *
 * Contoh:
 *   node scripts/delete-admin.js admin
 */

require('dotenv').config();
const supabase = require('../src/config/supabase');

async function run() {
  const [, , username] = process.argv;

  if (!username) {
    console.error('Cara pakai: node scripts/delete-admin.js <username>');
    process.exit(1);
  }

  const { data, error } = await supabase
    .from('users')
    .delete()
    .eq('username', username)
    .select();

  if (error) {
    console.error('Gagal menghapus admin:', error.message);
    process.exit(1);
  }

  if (!data.length) {
    console.error(`Username "${username}" tidak ditemukan.`);
    process.exit(1);
  }

  console.log(`Akun "${username}" berhasil dihapus.`);
}

run();
