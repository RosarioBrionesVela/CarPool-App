import React, { createContext, useState, useContext } from 'react';

type Usuario = { id: string; nombre: string; correo: string; };

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (userData: Usuario) => setUsuario(userData);
  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); 