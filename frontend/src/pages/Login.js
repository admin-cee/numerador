// frontend/src/pages/Login.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
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
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email, senha }
      );

      // Armazena o token recebido (por exemplo, no localStorage)
      localStorage.setItem('token', response.data.token);

      // Redireciona para a dashboard ou outra página protegida
      navigate('/dashboard');
    } catch (err) {
      // Trata o erro e exibe uma mensagem para o usuário
      setError(err.response?.data?.message || 'Erro no login. Tente novamente.');
    }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: '90%', sm: 400 },
        mx: 'auto',
        p: 2,
        mt: 4,
        boxShadow: 3,
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Entrar
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Não tem conta? <a href="/register">Registre-se</a>
      </Typography>
    </Box>
  );
}

export default Login;
