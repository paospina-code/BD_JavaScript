const express = require('express');
const db = require('./db');

const app = express ();

app.use(express.json());
app.use(express.static('public'));

// READ ALL
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// READ ONE
app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!rows.length) return res.status(404).json({ message: 'No encontrado' });
      res.json(rows[0]);
    });
});

// CREATE
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  db.query('INSERT INT users (name, email) VALUES (?, ?)',
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Creado', id: result.insertId });
    });
});

// UPDATE
app.put('/api/users/:id', (req, res) => {
  const { name, email } = req.body;
  db.query('UPDATE users SET name=?, email=? WHERE id=?',
    [name, email, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Actualizado' });
    });
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Eliminado' });
    });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));

console.log("PRUEBA DEFINITIVA");

