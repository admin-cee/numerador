// tests/auth.test.js
const request = require('supertest');
const app = require('../server');
const sequelize = require('../config/database'); // ou simplesmente require('../config/database') se exportado assim
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const userData = {
  nome: 'Test User',
  email: 'testuser@example.com',
  senha: 'senha123'
};

// Antes de cada teste, limpe a tabela de usuários
beforeEach(async () => {
  await User.destroy({ where: {} });
});

// Após todos os testes, feche a conexão com o banco de dados para evitar handles abertos
afterAll(async () => {
  await sequelize.close();
});

describe('Testes de Autenticação', () => {
  it('Deve registrar um novo usuário', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(userData);
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe('Usuário registrado com sucesso.');
    expect(response.body.user).toHaveProperty('id');
  });

  it('Não deve registrar um usuário já existente', async () => {
    // Primeiro, registre o usuário
    await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(userData);

    // Tente registrar novamente
    const response = await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(userData);
    expect(response.statusCode).toBe(400);
    expect(response.body.message).toBe('Usuário já existe.');
  });

  it('Deve realizar login com credenciais corretas', async () => {
    // Primeiro, registre o usuário
    await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(userData);

    const response = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: userData.email,
        senha: userData.senha
      });
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Login realizado com sucesso.');
    expect(response.body).toHaveProperty('token');
  });

  it('Não deve realizar login com credenciais incorretas', async () => {
    // Primeiro, registre o usuário
    await request(app)
      .post('/api/auth/register')
      .set('Content-Type', 'application/json')
      .send(userData);

    const response = await request(app)
      .post('/api/auth/login')
      .set('Content-Type', 'application/json')
      .send({
        email: userData.email,
        senha: 'senhaerrada'
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Credenciais inválidas.');
  });
});
