// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Armazenamento em memória para os usuários (para demonstração)
const users = [];

// Função para registro de usuário
exports.register = async (req, res) => {
  const { nome, email, senha } = req.body;
  
  if (!nome || !email || !senha) {
    return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
  }

  // Verifica se o usuário já existe
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe.' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    // Cria o usuário (atribui um id incremental simples)
    const newUser = {
      id: users.length + 1,
      nome,
      email,
      senha: hashedPassword
    };

    users.push(newUser);

    return res.status(201).json({ message: 'Usuário registrado com sucesso.' });
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

  // Procura o usuário pelo email
  const user = users.find(user => user.email === email);
  if (!user) {
    return res.status(401).json({ message: 'Credenciais inválidas.' });
  }

  try {
    // Compara a senha informada com a armazenada (criptografada)
    const passwordMatch = await bcrypt.compare(senha, user.senha);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    // Cria um token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error('Erro no login:', error);
    return res.status(500).json({ message: 'Erro durante o login.' });
  }
};
