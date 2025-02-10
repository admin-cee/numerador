// frontend/src/pages/AuditLogs.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

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
    <div style={{ padding: '1rem' }}>
      <h2>Logs de Auditoria</h2>
      <button 
        onClick={() => navigate(-1)} 
        style={{ marginBottom: '1rem', padding: '0.5rem 1rem' }}
      >
        Voltar
      </button>
      {loading ? (
        <p>Carregando logs...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : logs.length === 0 ? (
        <p>Nenhum log de auditoria encontrado.</p>
      ) : (
        <ul>
          {logs.map((log, index) => (
            <li key={index}>
              {log.event} – {new Date(log.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AuditLogs;
