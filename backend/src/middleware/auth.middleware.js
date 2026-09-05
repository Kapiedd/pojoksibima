const jwt = require('jsonwebtoken');

// Middleware ini mengecek header "Authorization: Bearer <token>".
// Kalau token valid, info user (dari dalam token) ditaruh di req.user
// supaya bisa dipakai controller berikutnya. Kalau tidak valid, request ditolak.
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'error', message: 'Token tidak ditemukan, silakan login' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ status: 'error', message: 'Token tidak valid atau sudah kedaluwarsa' });
  }
}

module.exports = { requireAuth };
