// backend/controllers/auditController.js

// Armazenamento em memória para logs de auditoria
const auditLogs = [];

// Função para registrar um evento de auditoria
exports.logEvent = (event) => {
  auditLogs.push({ event, timestamp: new Date() });
};

// Endpoint para consultar os logs de auditoria
exports.getAuditLogs = (req, res) => {
  return res.status(200).json({ logs: auditLogs });
};
