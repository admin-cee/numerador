// backend/controllers/auditController.js
const AuditLog = require('../models/AuditLog');

exports.logEvent = async (event) => {
  try {
    await AuditLog.create({ event });
    console.log(`Evento de auditoria registrado: ${event}`);
  } catch (error) {
    console.error('Erro ao registrar auditoria:', error);
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const logs = await AuditLog.findAll({ order: [['timestamp', 'ASC']] });
    return res.status(200).json({ logs });
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    return res.status(500).json({ message: 'Erro ao buscar logs de auditoria.' });
  }
};
