import { createContext, useContext, useState } from 'react';
import { api } from '../api/client';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('dpupr_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  async function login(username, password) {
    const data = await api.login(username, password);
    localStorage.setItem('dpupr_admin_token', data.token);
    localStorage.setItem('dpupr_admin_user', JSON.stringify(data.user));
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('dpupr_admin_token');
    localStorage.removeItem('dpupr_admin_user');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
