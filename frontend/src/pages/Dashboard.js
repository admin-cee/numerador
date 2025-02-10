// frontend/src/pages/Dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import api from '../services/api';
import GenerateDocumentForm from '../components/GenerateDocumentForm';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  // Função para buscar documentos do backend
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/documents');
      setDocuments(response.data.documents);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar documentos.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Função chamada quando um novo documento é gerado
  const handleDocumentGenerated = (newDocument) => {
    setDocuments(prevDocs => [...prevDocs, newDocument]);
  };

  // Função de logout: remove o token e redireciona para o login
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Filtra os documentos com base no texto digitado no filtro
  const filteredDocuments = documents.filter(doc => {
    // Se não houver filtro, retorna todos os documentos.
    if (!filter) return true;
    // Verifica se o identificador do documento (numeroFormatado) contém o texto do filtro (ignora maiúsculas/minúsculas)
    return doc.numeroFormatado.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
      <button 
        onClick={handleLogout} 
        style={{ float: 'right', padding: '0.5rem 1rem', marginBottom: '1rem' }}
      >
        Logout
      </button>
      <p>Bem-vindo, {user ? user.email : 'Usuário'}!</p>
      
      {/* Componente para gerar um novo documento */}
      <GenerateDocumentForm onDocumentGenerated={handleDocumentGenerated} />
      
      <div style={{ marginTop: '1rem' }}>
        <h3>Documentos Gerados</h3>
        {/* Campo para filtrar a lista de documentos */}
        <input
          type="text"
          placeholder="Filtrar documentos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
        />
        {/* Botão para atualizar manualmente a lista */}
        <button 
          onClick={fetchDocuments} 
          style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
        >
          Atualizar Lista
        </button>
        {/* Indicador de carregamento ou lista de documentos */}
        {loading ? (
          <p>Carregando documentos...</p>
        ) : filteredDocuments.length === 0 ? (
          <p>Nenhum documento encontrado.</p>
        ) : (
          <ul>
            {filteredDocuments.map(doc => (
              <li key={doc.id}>
                {doc.numeroFormatado} – Criado em: {new Date(doc.criadoEm).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
