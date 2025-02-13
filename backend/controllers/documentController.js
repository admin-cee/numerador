// backend/controllers/documentController.js
const Document = require('../models/Document');
const auditController = require('./auditController');

// Função para gerar um novo número de documento com base no TIPO (numeração independente da comissão)
exports.generateDocumentNumber = async (req, res) => {
  const { comissao, tipo, assunto } = req.body;
  
  if (!comissao || !tipo) {
    return res.status(400).json({ message: 'Comissão e tipo de documento são obrigatórios.' });
  }

  try {
    // Filtra os documentos apenas pelo tipo (normalizando para caixa alta)
    const docsDoTipo = await Document.findAll({
      where: {
        tipo: tipo.toUpperCase()
      },
      order: [['numero', 'DESC']]
    });

    const ultimoNumero = docsDoTipo.length > 0 ? Math.max(...docsDoTipo.map(doc => doc.numero)) : 0;
    const novoNumero = ultimoNumero + 1;

    // Formata o identificador no formato: TIPO_NNN_COMISSAO
    const numeroFormatado = `${tipo.toUpperCase()}_${novoNumero.toString().padStart(3, '0')}_${comissao}`;

    // Cria o novo documento no banco de dados
    const novoDocumento = await Document.create({
      numero: novoNumero,
      numeroFormatado,
      comissao,
      tipo,
      assunto, // Pode ser nulo se não for fornecido
      criadoEm: new Date()
    });

    // Registra o evento de auditoria, incluindo o usuário, se disponível
    auditController.logEvent(`Documento gerado: ${numeroFormatado} pelo usuário ${req.user ? req.user.email : 'desconhecido'}`);

    return res.status(201).json({ message: 'Documento gerado com sucesso.', documento: novoDocumento });
  } catch (error) {
    console.error('Erro ao gerar documento:', error);
    return res.status(500).json({ message: 'Erro ao gerar documento.' });
  }
};

// Função para consultar todos os documentos
exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.findAll({ order: [['criadoEm', 'ASC']] });
    return res.status(200).json({ documents });
  } catch (error) {
    console.error('Erro ao buscar documentos:', error);
    return res.status(500).json({ message: 'Erro ao buscar documentos.' });
  }
};

// Função para atualizar documento (edição)
exports.updateDocument = async (req, res) => {
  const { id } = req.params;
  const { assunto, status } = req.body; // Supondo que esses campos sejam editáveis
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado.' });
    }
    document.assunto = assunto || document.assunto;
    document.status = status || document.status;
    await document.save();

    auditController.logEvent(`Documento ${document.numeroFormatado} atualizado. Novo assunto: ${document.assunto}, novo status: ${document.status} pelo usuário ${req.user ? req.user.email : 'desconhecido'}`);

    return res.status(200).json({ message: 'Documento atualizado com sucesso.', document });
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    return res.status(500).json({ message: 'Erro ao atualizar documento.' });
  }
};

// Função para excluir documento
exports.deleteDocument = async (req, res) => {
  const { id } = req.params;
  try {
    const document = await Document.findByPk(id);
    if (!document) {
      return res.status(404).json({ message: 'Documento não encontrado.' });
    }
    await document.destroy();

    auditController.logEvent(`Documento ${document.numeroFormatado} excluído pelo usuário ${req.user ? req.user.email : 'desconhecido'}`);

    return res.status(200).json({ message: 'Documento excluído com sucesso.' });
  } catch (error) {
    console.error('Erro ao excluir documento:', error);
    return res.status(500).json({ message: 'Erro ao excluir documento.' });
  }
};
