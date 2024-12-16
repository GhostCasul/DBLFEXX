const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'DBFLEX'
});

db.connect(err => {
  if (err) throw err;
  console.log('Conectado a MySQL');
});

// Definir la función authenticate
function authenticate(req, res, next) {
  // Aquí puedes verificar un token JWT o una sesión
  const token = req.headers['authorization'];

  if (token) {
    // Verificar el token (deberías usar una librería como jsonwebtoken para esto)
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
}

// Usar el middleware authenticate para proteger rutas
app.get('/api/usuarios', authenticate, (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      console.error('Error al obtener usuarios:', err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    } else {
      res.json(results);
    }
  });
});

app.post('/api/usuarios', authenticate, (req, res) => {
  const { nombre, email, tipo } = req.body;
  db.query('INSERT INTO usuarios (nombre, email, tipo) VALUES (?, ?, ?)', [nombre, email, tipo], (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, nombre, email, tipo });
  });
});

app.put('/api/usuarios/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { nombre, email, tipo } = req.body;
  db.query('UPDATE usuarios SET nombre = ?, email = ?, tipo = ? WHERE id = ?', [nombre, email, tipo, id], (err) => {
    if (err) throw err;
    res.json({ id, nombre, email, tipo });
  });
});

app.delete('/api/usuarios/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Usuario eliminado' });
  });
});

app.get('/api/inventario', authenticate, (req, res) => {
  db.query('SELECT * FROM inventario', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/api/inventario', authenticate, (req, res) => {
  const { nombre, precio, cantidad, categoria } = req.body;
  const producto = { nombre, precio, cantidad, categoria };
  db.query('INSERT INTO inventario SET ?', producto, (err, result) => {
    if (err) throw err;
    res.json({ id: result.insertId, ...producto });
  });
});

app.put('/api/inventario/:id', authenticate, (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad, categoria } = req.body;
  const producto = { nombre, precio, cantidad, categoria };
  db.query('UPDATE inventario SET ? WHERE id = ?', [producto, id], (err) => {
    if (err) throw err;
    res.json({ id, ...producto });
  });
});

app.delete('/api/inventario/:id', authenticate, (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM inventario WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Producto eliminado' });
  });
});

app.get('/api/categorias', authenticate, (req, res) => {
  db.query('SELECT * FROM categorias', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
