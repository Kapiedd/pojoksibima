import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PaketKontrak from './pages/PaketKontrak';
import JadwalAspal from './pages/JadwalAspal';
import BukuTamu from './pages/BukuTamu';
import ChatLog from './pages/ChatLog';
import Dokumentasi from './pages/Dokumentasi';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/paket-kontrak" element={<ProtectedRoute><PaketKontrak /></ProtectedRoute>} />
          <Route path="/jadwal-aspal" element={<ProtectedRoute><JadwalAspal /></ProtectedRoute>} />
          <Route path="/dokumentasi" element={<ProtectedRoute><Dokumentasi /></ProtectedRoute>} />
          <Route path="/buku-tamu" element={<ProtectedRoute><BukuTamu /></ProtectedRoute>} />
          <Route path="/chat-log" element={<ProtectedRoute><ChatLog /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
