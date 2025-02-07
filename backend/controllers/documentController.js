// backend/controllers/documentController.js

// Array em memória para armazenar documentos (apenas para demonstração)
const documents = [];

// Função para gerar um novo número de documento para uma comissão específica
exports.generateDocumentNumber = (req, res) => {
  const { comissao } = req.body;
  if (!comissao) {
    return res.status(400).json({ message: 'A comissão é obrigatória.' });
  }

  // Filtra os documentos para a comissão informada e encontra o último número gerado
  const docsDaComissao = documents.filter(doc => doc.comissao === comissao);
  let ultimoNumero = 0;
  if (docsDaComissao.length > 0) {
    // Supondo que os números estão armazenados como inteiros; adapte conforme necessário
    ultimoNumero = Math.max(...docsDaComissao.map(doc => doc.numero));
  }
  const novoNumero = ultimoNumero + 1;

  // Formata o número com zeros à esquerda e concatena com a sigla da comissão (ex.: 003CPL)
  const numeroFormatado = novoNumero.toString().padStart(3, '0') + comissao;

  // Cria o documento e salva no array
  const novoDocumento = {
    id: documents.length + 1,
    numero: novoNumero,
    numeroFormatado,
    comissao,
    criadoEm: new Date()
  };
  documents.push(novoDocumento);

  // Opcional: use o logger para registrar essa ação
  // const logger = require('../utils/logger');
  // logger.log(`Documento gerado: ${numeroFormatado}`);

  return res.status(201).json({ message: 'Documento gerado com sucesso.', documento: novoDocumento });
};

// Função para consultar todos os documentos
exports.getDocuments = (req, res) => {
  return res.status(200).json({ documents });
};