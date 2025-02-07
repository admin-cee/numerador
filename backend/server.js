// backend/server.js

require("dotenv").config(); // Carrega variáveis do .env
const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database'); // Importa a conexão com o DB

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.send("Olá, CEE-Numerador! Backend funcionando.");
});

// Importando e usando as rotas de autenticação (exemplo)
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const documentRoutes = require("./routes/documentRoutes");
app.use("/api/documents", documentRoutes);

const auditRoutes = require("./routes/auditRoutes");
app.use("/api/audit", auditRoutes);


// Se o módulo for executado diretamente, sincroniza os modelos e inicia o servidor
if (require.main === module) {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log('Modelos sincronizados com sucesso.');
      const PORT = process.env.PORT || 5001;
      app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
      });
    })
    .catch((error) => {
      console.error('Erro ao sincronizar modelos:', error);
    });
}

module.exports = app;
