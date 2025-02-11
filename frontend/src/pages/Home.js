// frontend/src/pages/Home.js
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        p: 3,
        backgroundColor: 'background.default',
      }}
    >
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Dashboard CEE-Numerador
      </Typography>
      <Typography variant="h6" component="p" gutterBottom align="center">
        Bem-vindo ao sistema de numeração de documentos do CEE-SC.
      </Typography>
      <Typography
        variant="body1"
        component="p"
        align="center"
        sx={{ maxWidth: 600, mb: 4 }}
      >
        Gerencie a numeração dos documentos administrativos de forma automatizada, garantindo consistência e rastreabilidade. Navegue pelo sistema para registrar novos documentos, consultar históricos e acessar relatórios detalhados.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Button variant="contained" component={Link} to="/login">
          Login
        </Button>
        <Button variant="outlined" component={Link} to="/register">
          Registrar-se
        </Button>
        <Button variant="contained" color="secondary" component={Link} to="/dashboard">
          Acessar Dashboard
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
