const express = require('express');
const mysql = require('mysql2');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: '3.90.34.161', 
  user: 'Pedro',
  password: 'Strong@@password123',
  database: 'aula_aws' 
});

// Home - Listar todos os usuários
app.get('/', (req, res) => {
  const query = 'SELECT * FROM usuarios';
  connection.query(query, (err, results) => {
    if (err) {
      res.send('Erro ao listar usuários');
    } else {
      res.render('index', { usuarios: results });
    }
  });
});

// Formulário para adicionar usuário
app.get('/adicionar', (req, res) => {
  res.render('adicionar');
});

// Criar novo usuário
app.post('/usuarios', (req, res) => {
  const { email, nome } = req.body;
  const query = 'INSERT INTO usuarios (email, nome) VALUES (?, ?)';
  connection.query(query, [email, nome], (err) => {
    if (err) {
      res.send('Erro ao adicionar usuário');
    } else {
      res.redirect('/');
    }
  });
});

// Deletar usuário
app.post('/usuarios/delete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM usuarios WHERE id = ?';
  connection.query(query, [id], (err) => {
    if (err) {
      res.send('Erro ao deletar usuário');
    } else {
      res.redirect('/');
    }
  });
});

// Iniciar o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
