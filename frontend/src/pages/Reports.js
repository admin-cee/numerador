// frontend/src/pages/Reports.js
import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Button, Box, Alert } from "@mui/material";
import { CSVLink } from "react-csv";
import { useNavigate } from 'react-router-dom';
import { jsPDF } from "jspdf";

ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {
  const [documentStats, setDocumentStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/documents");
      const documents = response.data.documents;
      const stats = {};
      documents.forEach((doc) => {
        const tipo = doc.tipo ? doc.tipo.toUpperCase() : "SEM TIPO";
        if (stats[tipo]) {
          stats[tipo] += 1;
        } else {
          stats[tipo] = 1;
        }
      });
      setDocumentStats(stats);
      setLoading(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Erro ao buscar documentos para relatório."
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const chartData = {
    labels: Object.keys(documentStats),
    datasets: [
      {
        label: "Documentos por Tipo",
        data: Object.values(documentStats),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#8e44ad",
          "#27ae60",
          "#e74c3c",
          "#f39c12",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true, // Garante que o gráfico seja responsivo
    plugins: {
      legend: {
        position: "top", // Posição da legenda: 'top', 'bottom', 'left', 'right'
        labels: {
          font: {
            size: 14, // Tamanho da fonte da legenda
          },
          color: "#333", // Cor dos rótulos da legenda
        },
      },
      tooltip: {
        enabled: true, // Habilita os tooltips
        backgroundColor: "#fff", // Cor de fundo dos tooltips
        titleColor: "#000", // Cor do título nos tooltips
        bodyColor: "#000", // Cor do corpo dos tooltips
        borderColor: "#ccc", // Cor da borda do tooltip
        borderWidth: 1, // Largura da borda
      },
    },
  };

  // Prepara os dados para CSV
  const csvData = Object.keys(documentStats).map((tipo) => ({
    Tipo: tipo,
    Quantidade: documentStats[tipo],
  }));

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Documentos por Tipo", 20, 20);

    let yPosition = 30;
    Object.keys(documentStats).forEach((tipo) => {
      doc.text(`${tipo}: ${documentStats[tipo]}`, 20, yPosition);
      yPosition += 10;
    });

    doc.save("relatorio_documentos.pdf");
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <h2>Relatórios Estatísticos</h2>
      {loading ? (
        <p>Carregando dados para relatório...</p>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {/* Contêiner com tamanho máximo definido para o gráfico */}
          <Box
            sx={{
              maxWidth: 500, // Largura máxima de 500px
              maxHeight: 400, // Altura máxima de 400px
              width: "100%",
              margin: "0 auto",
              position: "relative",
            }}
          >
            <Pie data={chartData} options={options} />
          </Box>
          <Box sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }}>
              <CSVLink
                data={csvData}
                filename={"relatorio_documentos.csv"}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Exportar CSV
              </CSVLink>
            </Button>
            <Button variant="contained" color="secondary" onClick={exportPDF}>
              Exportar PDF
            </Button>
          </Box>
        </>
      )}
      {/* Botão para voltar à Dashboard */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="outlined" onClick={() => navigate('/dashboard')}>
          Voltar para Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;
