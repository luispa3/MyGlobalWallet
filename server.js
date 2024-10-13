const express = require('express');
const { getUsers, getUserByEmail, getUsersByCountry } = require('./Controllers/UserController');
const {getSharesByUserID } = require('./Controllers/SharesController');

const app = express();
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/users/get', async (req, res) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

// Ruta para obtener un usuario por el email
app.get('/users/get/email/:email', async (req, res) => {
    const { email } = req.params; 
    console.log('Parametro recibido: '+email);
    try {
        const user = await getUserByEmail(email);
        if (user.length > 0) {
            res.json(user);
        } else {
            res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener usuario por email' });
    }
});

// Ruta para obtener los usuarios por el país
app.get('/users/get/country/:country', async (req, res) => {
    const { country } = req.params;
    console.log('Parametro recibido: '+country);
    try {
        const users = await getUsersByCountry(country);
        if (users.length > 0) {
            res.json(users);
        } else {
            res.status(404).json({ mensaje: 'Usuarios no encontrados' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios por pais' });
    }
});

// Ruta para obtener las acciones de un usuario
app.get('/shares/get/user/:userID', async (req, res) => {
    const { userID } = req.params;
    console.log('Parametro recibido: '+userID);
    try {
        const shares = await getSharesByUserID(userID);
        if (shares.length > 0) {
            res.json(shares);
        } else {
            res.status(404).json({ mensaje: 'Acciones no encontradas' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener las acciones del usuario '+userID });
    }
});







const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
