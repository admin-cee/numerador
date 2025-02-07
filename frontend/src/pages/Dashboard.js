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
  const navigate = useNavigate();

  // Função para buscar documentos do backend
  const fetchDocuments = async () => {
    try {
      const response = await api.get('/api/documents');
      setDocuments(response.data.documents);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar documentos.');
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <GenerateDocumentForm onDocumentGenerated={handleDocumentGenerated} />
      <h3>Documentos Gerados</h3>
      {documents.length === 0 ? (
        <p>Nenhum documento encontrado.</p>
      ) : (
        <ul>
          {documents.map(doc => (
            <li key={doc.id}>
              {doc.numeroFormatado} – Criado em: {new Date(doc.criadoEm).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
