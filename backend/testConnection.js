// backend/testConnection.js
require('dotenv').config(); // Carrega as variáveis do .env
const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o PostgreSQL estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar com o PostgreSQL:', error);
  });
