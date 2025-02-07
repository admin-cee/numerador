// frontend/src/components/GenerateDocumentForm.js
import React, { useState } from 'react';
import api from '../services/api';

const GenerateDocumentForm = ({ onDocumentGenerated }) => {
  const [comissao, setComissao] = useState('');
  const [error, setError] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/documents/generate', { comissao });
      onDocumentGenerated(response.data.documento);
      setComissao('');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Erro ao gerar documento.');
    }
  };

  return (
    <div>
      <h3>Gerar Novo Documento</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleGenerate}>
        <label>
          Comissão:
          <input 
            type="text" 
            value={comissao} 
            onChange={(e) => setComissao(e.target.value)} 
            required 
          />
        </label>
        <button type="submit">Gerar</button>
      </form>
    </div>
  );
};

export default GenerateDocumentForm;
