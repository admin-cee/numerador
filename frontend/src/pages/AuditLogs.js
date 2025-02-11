// frontend/src/pages/AuditLogs.js
import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/audit');
      setLogs(response.data.logs);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar logs de auditoria.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  return (
    <Box
      sx={{
        p: 2,
        maxWidth: { xs: '90%', sm: '600px' },
        mx: 'auto',
        mt: 4,
      }}
    >
      <Typography variant="h4" gutterBottom align="center">
        Logs de Auditoria
      </Typography>
      <Button
        variant="outlined"
        onClick={() => navigate(-1)}
        sx={{ mb: 2, display: 'block', mx: 'auto' }}
      >
        Voltar
      </Button>
      {loading ? (
        <Typography align="center">Carregando logs...</Typography>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      ) : logs.length === 0 ? (
        <Typography align="center">Nenhum log de auditoria encontrado.</Typography>
      ) : (
        <List>
          {logs.map((log, index) => (
            <ListItem key={index} divider>
              <ListItemText
                primary={log.event}
                secondary={new Date(log.timestamp).toLocaleString()}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AuditLogs;
