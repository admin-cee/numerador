// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Cria o contexto
export const AuthContext = createContext({});

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  // Inicializa o token com o que estiver no localStorage (se houver)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  // Função para fazer login (armazenando o token)
  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  // Função de logout que remove o token e limpa o estado
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Você pode, por exemplo, buscar informações do usuário com base no token aqui
  useEffect(() => {
    if (token) {
      // Para exemplo, vamos simular que o usuário é recuperado a partir do token
      // Em um aplicativo real, você faria uma requisição para a API
      setUser({ email: 'usuario@exemplo.com' });
    } else {
      setUser(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
