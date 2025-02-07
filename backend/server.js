// backend/server.js

require('dotenv').config(); // Carrega variáveis do .env
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get('/', (req, res) => {
  res.send('Olá, CEE-Numerador! Backend funcionando.');
});

// Importando e usando as rotas de autenticação (exemplo)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Porta configurada no .env ou padrão 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
