// frontend/src/pages/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // Realiza a requisição de login utilizando a URL definida nas variáveis de ambiente
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        email,
        senha,
      });

      // Armazena o token recebido (p.ex., no localStorage)
      localStorage.setItem('token', response.data.token);

      // Redireciona para a dashboard ou outra página protegida
      navigate('/dashboard');
    } catch (err) {
      // Trata o erro e exibe uma mensagem para o usuário
      setError(err.response?.data?.message || 'Erro no login. Tente novamente.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem' }}>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="senha">Senha:</label>
          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        <button type="submit" style={{ padding: '0.5rem 1rem' }}>
          Entrar
        </button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        Não tem conta? <a href="/register">Registre-se</a>
      </p>
    </div>
  );
}

export default Login;
