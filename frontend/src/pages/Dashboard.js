// frontend/src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, TextField, Alert } from "@mui/material";
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
    <div style={{ padding: "1rem" }}>
      <h2>Dashboard</h2>
      <Button
        onClick={handleLogout}
        variant="contained"
        color="error"
        sx={{ float: "right", mb: 2 }}
      >
        Logout
      </Button>

      {/* Componente de boas-vindas que utiliza os dados do usuário */}
      <DashboardWelcome />

      {/* Exibe um alerta de erro, se houver */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Componente para gerar um novo documento */}
      <GenerateDocumentForm onDocumentGenerated={handleDocumentGenerated} />

      <div style={{ marginTop: "1rem" }}>
        <h3>Documentos Gerados</h3>
        <TextField
          label="Filtrar documentos..."
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 2 }}
        />
        {/* Links para acessar as páginas de auditoria e relatórios */}
        <div style={{ marginTop: "2rem" }}>
          <p>
            <Link to="/audit" style={{ textDecoration: "none", color: "blue" }}>
              Ver Logs de Auditoria
            </Link>
          </p>
          <p>
            <Link
              to="/reports"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Ver Relatórios Estatísticos
            </Link>
          </p>
        </div>

        <Button
          variant="contained"
          onClick={fetchDocuments}
          fullWidth
          sx={{ mb: 2 }}
        >
          Atualizar Lista
        </Button>
        {loading ? (
          <p>Carregando documentos...</p>
        ) : filteredDocuments.length === 0 ? (
          <p>Nenhum documento encontrado.</p>
        ) : (
          <DocumentsTable documents={filteredDocuments} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
