// frontend/src/components/GenerateDocumentForm.js

import React, { useState } from 'react';
import api from '../services/api';

const GenerateDocumentForm = ({ onDocumentGenerated }) => {
  const [comissao, setComissao] = useState('');
  const [tipo, setTipo] = useState('');
  const [error, setError] = useState(null);

  // Lista dos tipos de documentos disponíveis
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
      // Envia a requisição para o endpoint de geração, passando "comissao" e "tipo"
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
    <div>
      <h3>Gerar Novo Documento</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Comissão:</label>
          <input
            type="text"
            value={comissao}
            onChange={(e) => setComissao(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ marginRight: '0.5rem' }}>Tipo de Documento:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
            <option value="">Selecione o tipo</option>
            {documentTypes.map((docType, index) => (
              <option key={index} value={docType}>
                {docType}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Gerar</button>
      </form>
    </div>
  );
};

export default GenerateDocumentForm;
