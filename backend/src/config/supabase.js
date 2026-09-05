const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // dipakai di backend (bukan di frontend!)

if (!supabaseUrl || !supabaseKey) {
  console.warn('[WARNING] SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset di .env');
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
