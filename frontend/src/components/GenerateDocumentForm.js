// frontend/src/components/GenerateDocumentForm.js
import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, FormControl, InputLabel, Box, Alert } from '@mui/material';
import api from '../services/api';

const GenerateDocumentForm = ({ onDocumentGenerated }) => {
  const [comissao, setComissao] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState(null);

  const documentTypes = [
    'ANÁLISE',
    'COMUNICAÇÃO INTERNA',
    'DILIGÊNCIA',
    'OFÍCIO',
    'PORTARIA',
    'INFORME',
    'PAUTA',
    'PARECER',
    'NOTA TÉCNICA',
    'RESOLUÇÃO'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comissao || !tipo) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    try {
      const response = await api.post('/api/documents/generate', { comissao, tipo });
      onDocumentGenerated(response.data.documento);
      setComissao('');
      setTipo('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao gerar documento.');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, marginBottom: 2 }}>
      <h3>Gerar Novo Documento</h3>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Comissão"
          variant="outlined"
          fullWidth
          margin="normal"
          value={comissao}
          onChange={(e) => setComissao(e.target.value)}
          required
        />
        <FormControl variant="outlined" fullWidth margin="normal" required>
          <InputLabel id="tipo-label">Tipo de Documento</InputLabel>
          <Select
            labelId="tipo-label"
            label="Tipo de Documento"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <MenuItem value="">
              <em>Selecione o tipo</em>
            </MenuItem>
            {documentTypes.map((docType, index) => (
              <MenuItem key={index} value={docType}>
                {docType}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" type="submit" fullWidth>
          Gerar
        </Button>
      </form>
    </Box>
  );
};

export default GenerateDocumentForm;
