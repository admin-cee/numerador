// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Cria o contexto
export const AuthContext = createContext({});

// Provedor de autenticação
export const AuthProvider = ({ children }) => {
  // Inicializa o token com o que estiver no localStorage (se houver)
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  // Função para fazer login (armazenando o token)
  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  // Função de logout que remove o token e limpa o estado
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Armazena tanto o email quanto o nome
        setUser({ email: decoded.email, nome: decoded.nome });
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
        setUser(null);
      }
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
