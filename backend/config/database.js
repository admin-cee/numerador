// backend/config/database.js
const { Sequelize } = require("sequelize");

// Cria uma instância do Sequelize usando as variáveis de ambiente
const sequelize = new Sequelize(
  process.env.DB_NAME, // Nome do banco de dados: numerador-cee
  process.env.DB_USER, // Usuário: admin-numerador-cee
  process.env.DB_PASSWORD, // Senha: admin-numerador-cee
  {
    host: process.env.DB_HOST, // localhost
    port: process.env.DB_PORT, // 5432
    dialect: "postgres", // Dialeto utilizado
    logging: false,
    dialectOptions: {
      // Caso o Render requeira conexão via SSL
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }, // Desabilita logs SQL; altere para true para depuração
    },
  }
);

module.exports = sequelize;
