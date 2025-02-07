// Atualização em Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import GenerateDocumentForm from '../components/GenerateDocumentForm';

const Dashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

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

  // Função para atualizar a lista quando um novo documento for gerado
  const handleDocumentGenerated = (newDocument) => {
    setDocuments(prevDocuments => [...prevDocuments, newDocument]);
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Dashboard</h2>
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
