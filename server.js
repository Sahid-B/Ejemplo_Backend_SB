const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());           // permite que el frontend acceda
app.use(express.json());   // para leer JSON del body

// "Base de datos" simulada en memoria
let users = [
    { id: 1, name: 'Sahid', email: 'sahid@espe.edu.ec' },
    { id: 2, name: 'Jose', email: 'jose@espe.edu.ec' }
];

// GET /api/v1/users — obtener todos
app.get('/api/v1/users', (req, res) => {
    res.status(200).json(users);
});

// GET /api/v1/users/:id — obtener uno
app.get('/api/v1/users/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(user);
});

// POST /api/v1/users — crear uno nuevo
app.post('/api/v1/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Faltan datos' });
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/v1/users/:id — actualizar completo
app.put('/api/v1/users/:id', (req, res) => {
    const index = users.findIndex(u => u.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Usuario no encontrado' });
    users[index] = { id: parseInt(req.params.id), ...req.body };
    res.status(200).json(users[index]);
});

// DELETE /api/v1/users/:id — eliminar
app.delete('/api/v1/users/:id', (req, res) => {
    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

app.listen(3000, () => console.log('API corriendo en http://localhost:3000'));