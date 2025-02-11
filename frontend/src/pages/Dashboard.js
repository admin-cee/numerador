// frontend/src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Alert, Box, Typography } from "@mui/material";
import api from "../services/api";
import GenerateDocumentForm from "../components/GenerateDocumentForm";
import DocumentsTable from "../components/DocumentsTable";
import { AuthContext } from "../context/AuthContext";
import DashboardWelcome from "../components/DashboardWelcome";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();

  // Função para buscar documentos do backend
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/documents");
      setDocuments(response.data.documents);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Erro ao buscar documentos.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Função chamada quando um novo documento é gerado
  const handleDocumentGenerated = (newDocument) => {
    setDocuments((prevDocs) => [...prevDocs, newDocument]);
  };

  const handleDocumentUpdated = (updatedDoc) => {
    setDocuments((prevDocs) =>
      prevDocs.map((doc) => (doc.id === updatedDoc.id ? updatedDoc : doc))
    );
  };

  const handleDocumentDeleted = (deletedId) => {
    setDocuments((prevDocs) => prevDocs.filter((doc) => doc.id !== deletedId));
  };

  // Função de logout: remove o token e redireciona para o login
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Filtra os documentos com base no texto digitado no filtro
  const filteredDocuments = documents.filter((doc) => {
    if (!filter) return true;
    return doc.numeroFormatado.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <Box sx={{ p: 2 }}>
      {/* Cabeçalho com título e botão de logout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: { xs: 2, sm: 0 } }}>
          Dashboard
        </Typography>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>

      {/* Componente de boas-vindas */}
      <DashboardWelcome />

      {/* Exibe alerta de erro, se houver */}
      {error && (
        <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Formulário para geração de documento */}
      <GenerateDocumentForm onDocumentGenerated={handleDocumentGenerated} />

      {/* Seção de documentos */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Documentos Gerados
        </Typography>
        <TextField
          label="Filtrar documentos..."
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          onClick={fetchDocuments}
          fullWidth
          sx={{ mb: 2 }}
        >
          Atualizar Lista
        </Button>
        {loading ? (
          <Typography>Carregando documentos...</Typography>
        ) : filteredDocuments.length === 0 ? (
          <Typography>Nenhum documento encontrado.</Typography>
        ) : (
          <DocumentsTable
            documents={filteredDocuments}
            onDocumentUpdated={handleDocumentUpdated}
            onDocumentDeleted={handleDocumentDeleted}
          />
        )}
      </Box>

      {/* Links para auditoria e relatórios */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography>
          <Link to="/audit" style={{ textDecoration: "none", color: "blue" }}>
            Ver Logs de Auditoria
          </Link>
        </Typography>
        <Typography>
          <Link to="/reports" style={{ textDecoration: "none", color: "blue" }}>
            Ver Relatórios Estatísticos
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
