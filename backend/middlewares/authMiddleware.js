// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // O token pode vir com o prefixo "Bearer ", então vamos removê-lo, se necessário
  const tokenLimpo = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  jwt.verify(tokenLimpo, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido.' });
    }
    // Armazena os dados do token no objeto de requisição para uso posterior, se necessário
    req.user = decoded;
    next();
  });
};
