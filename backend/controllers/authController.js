// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Função para registro de usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  try {
    // Verifica se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Criptografa a senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Cria o usuário no banco de dados usando o modelo do Sequelize
    const newUser = await User.create({
      nome,
      email,
      senha: hashedPassword
    });

    return res.status(201).json({ message: 'Usuário registrado com sucesso.', user: newUser });
  } catch (error) {
    console.error('Erro no registro:', error);
    return res.status(500).json({ message: 'Erro ao registrar o usuário.' });
  }
};

// Função para login de usuário
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  try {
    // Procura o usuário no banco de dados
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Compara a senha informada com a armazenada (criptografada)
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Cria um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nome: user.nome },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro durante o login.' });
  }
};
