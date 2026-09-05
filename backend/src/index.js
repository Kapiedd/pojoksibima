const express = require('express');
const cors = require('cors');
require('dotenv').config();

const testRoutes = require('./routes/test.routes');
const jadwalAspalRoutes = require('./routes/jadwalAspal.routes');
const paketKontrakRoutes = require('./routes/paketKontrak.routes');
const bukuTamuRoutes = require('./routes/bukuTamu.routes');
const visitorCounterRoutes = require('./routes/visitorCounter.routes');
const chatbotRoutes = require('./routes/chatbot.routes');
const authRoutes = require('./routes/auth.routes');
const dashboardRoutes = require('./routes/dashboard.routes');
const adminRoutes = require('./routes/admin.routes');
const dokumentasiRoutes = require('./routes/dokumentasi.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'DPUPR API is running' });
});

app.use('/api', testRoutes);
app.use('/api', jadwalAspalRoutes);
app.use('/api', paketKontrakRoutes);
app.use('/api', bukuTamuRoutes);
app.use('/api', visitorCounterRoutes);
app.use('/api', chatbotRoutes);
app.use('/api', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', adminRoutes);
app.use('/api', dokumentasiRoutes);

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});
