// backend/models/Document.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Document = sequelize.define(
  "Document",
  {
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroFormatado: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    comissao: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assunto: {
      // Novo campo para a descrição breve do assunto
      type: DataTypes.STRING,
      allowNull: true, // opcional
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Em andamento",
    },

    criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "documents",
    timestamps: false, // ou timestamps: true se desejar createdAt e updatedAt
  }
);

module.exports = Document;
