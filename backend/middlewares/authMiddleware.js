// backend/middlewares/authMiddleware.js

// Middleware de exemplo para verificação de token (a ser aprimorado)
module.exports = (req, res, next) => {
    // Exemplo: extrair token dos headers, verificar validade, etc.
    console.log("Middleware de autenticação executado");
    
    // Se a autenticação for bem-sucedida, chama next()
    next();
  };
  