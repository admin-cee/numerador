import React, { useContext } from 'react';
import { Box, Typography } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const DashboardWelcome = () => {
  const { user } = useContext(AuthContext);

  return (
    <Box sx={{ mb: 2, p: 2, backgroundColor: 'primary.light', borderRadius: 1 }}>
      <Typography variant="h6" component="div" color="primary.contrastText">
      Bem-vindo, {user && user.nome ? user.nome : "Usuário"}!
      </Typography>
    </Box>
  );
};

export default DashboardWelcome;
