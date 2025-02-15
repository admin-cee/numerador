// backend/routes/documentRoutes.js
const express = require("express");
const router = express.Router();
const documentController = require("../controllers/documentController");
const authMiddleware = require("../middlewares/authMiddleware");

// Rota para gerar um documento
router.post(
  "/generate",
  authMiddleware,
  documentController.generateDocumentNumber
);

// Rota protegida para consultar documentos
router.get("/", authMiddleware, documentController.getDocuments);

// sdfljsldf
// sdlfkjsldf

// Atualizar documento
router.put("/:id", authMiddleware, documentController.updateDocument);

// Excluir documento
router.delete("/:id", authMiddleware, documentController.deleteDocument);

module.exports = router;

module.exports = router;
