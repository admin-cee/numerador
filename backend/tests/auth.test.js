// backend/tests/auth.test.js
const request = require('supertest');
const app = require('../server');

describe('Testando a rota de autenticação', () => {
  it('Deve responder com 200 na rota raiz', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Olá, CEE-Numerador backend!');
  });
});
