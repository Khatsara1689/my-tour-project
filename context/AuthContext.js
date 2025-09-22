// file: context/AuthContext.js
'use client';

import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้ เช่น { email: '...', role: 'member' }

  const login = (userData) => {
    // ในอนาคต userData จะมาจาก API
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);