// frontend/src/components/GenerateDocumentForm.js
import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Alert,
  Typography,
} from "@mui/material";
import api from "../services/api";

const GenerateDocumentForm = ({ onDocumentGenerated }) => {
  const [comissao, setComissao] = useState("");
  const [tipo, setTipo] = useState("");
  const [assunto, setAssunto] = useState(""); // Novo estado para o assunto
  const [error, setError] = useState(null);

  const documentTypes = [
    "ANÁLISE",
    "COMUNICAÇÃO INTERNA",
    "DILIGÊNCIA",
    "OFÍCIO",
    "PORTARIA",
    "INFORMAÇÃO",
    "PAUTA",
    "PARECER",
    "NOTA TÉCNICA",
    "RESOLUÇÃO",
    "TERMO DE SANEAMENTO",
    "RELATÓRIO DE VISITAS",
  ];

  // Lista das siglas das comissões disponíveis
  const comissoes = ["CLN", "CEDP", "CEDB", "CEDS", "CEASPE", "CEED","PRES", "SEREV", "COADM", "COADM/PROT" ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comissao || !tipo) {
      setError("Por favor, preencha todos os campos.");
      return;
    }
    try {
      const response = await api.post("/api/documents/generate", {
        comissao,
        tipo,
        assunto,
      });
      onDocumentGenerated(response.data.documento);
      setComissao("");
      setTipo("");
      setAssunto("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao gerar documento.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: "100%", sm: 400 },
        mx: "auto",
        mb: 2,
        p: 2,
      }}
    >
<Typography variant="h5" component="h3" gutterBottom>
        Gerar novo número de documento
      </Typography>      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth margin="normal" required>
          <InputLabel id="comissao-label">Solicitante</InputLabel>
          <Select
            labelId="comissao-label"
            label="Comissão"
            value={comissao}
            onChange={(e) => setComissao(e.target.value)}
          >
            <MenuItem value="">
              <em>Selecione a comissão</em>
            </MenuItem>
            {comissoes.map((sigla, index) => (
              <MenuItem key={index} value={sigla}>
                {sigla}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" required>
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
        <TextField
          label="Assunto (Opcional)"
          variant="outlined"
          fullWidth
          margin="normal"
          value={assunto}
          onChange={(e) => setAssunto(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>
          Gerar
        </Button>
      </form>
    </Box>
  );
};

export default GenerateDocumentForm;
