// frontend/src/pages/Reports.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const [documentStats, setDocumentStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar documentos e calcular estatísticas por tipo
  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/documents');
      const documents = response.data.documents;
      // Calcula a quantidade de documentos para cada tipo
      const stats = {};
      documents.forEach((doc) => {
        // Considera o campo "tipo" do documento (caso o backend esteja enviando)
        // Se o campo "tipo" não existir, usa uma categoria padrão, por exemplo, "SEM TIPO"
        const tipo = doc.tipo ? doc.tipo.toUpperCase() : 'SEM TIPO';
        if (stats[tipo]) {
          stats[tipo] += 1;
        } else {
          stats[tipo] = 1;
        }
      });
      setDocumentStats(stats);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao buscar documentos para relatório.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Prepara os dados para o gráfico
  const chartData = {
    labels: Object.keys(documentStats),
    datasets: [
      {
        label: 'Documentos por Tipo',
        data: Object.values(documentStats),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#8e44ad',
          '#27ae60',
          '#e74c3c',
          '#f39c12',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Relatórios Estatísticos</h2>
      {loading ? (
        <p>Carregando dados para relatório...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div>
          <Pie data={chartData} />
        </div>
      )}
    </div>
  );
};

export default Reports;
