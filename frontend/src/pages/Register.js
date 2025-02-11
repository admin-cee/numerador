// frontend/src/pages/Register.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        nome,
        email,
        senha,
      });
      navigate('/'); // Redireciona para a página de login após o registro
    } catch (err) {
      setError(err.response?.data?.message || 'Erro no registro.');
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
        Registro
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome"
          variant="outlined"
          fullWidth
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <TextField
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
          sx={{ mb: 2 }}
        />
        <Button variant="contained" type="submit" fullWidth>
          Registrar
        </Button>
      </Box>
      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        Já tem conta? <a href="/">Faça login</a>
      </Typography>
    </Box>
  );
}

export default Register;
