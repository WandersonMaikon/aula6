const express = require('express');
const mysql = require('mysql');
const path = require('path'); 

const app = express();

app.use(express.json()); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'aula'
});

app.post('/inserir', (req, res) => {
    const { nome, idade } = req.body;

    connection.query('INSERT INTO conta (nome, idade) VALUES (?, ?)', [nome, idade], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao inserir' });
        }
        res.json({ message: 'Inserido com sucesso', insertId: result.insertId });
    });
});

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`);
});