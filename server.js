const express = require('express');
const db = require('./db');

const app = express ();

app.use(express.json());
app.use(express.static('public'));

app.get('/api/first', (req, res) => {
    db.query('SELECT * FROM users LIMIT 1', (err, rows) => {
        if (err) {
          return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res.json({ message: 'No hay registros' });

    }
    res.json(rows[0]);

    });
    });


    const PORT = 3000;
    app.listen(PORT, () => {
        console.log('Servidor activo en http://localhost:${PORT}');
    });
