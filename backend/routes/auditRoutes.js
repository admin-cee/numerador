// backend/routes/auditRoutes.js
const express = require('express');
const router = express.Router();

const auditController = require('../controllers/auditController');
const authMiddleware = require('../middlewares/authMiddleware');

// Rota protegida para consultar os logs de auditoria
router.get('/', authMiddleware, auditController.getAuditLogs);

module.exports = router;
