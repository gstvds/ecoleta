import express from 'express';

const app = express();

app.get('/users', (req, res) => {
  res.send({ message: 'Listagem de usuários' });
});

app.listen('3333');
