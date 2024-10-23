const express = require('express');
const { getUsers, getUserByEmail, getUsersByCountry, isValidUser } = require('./Controllers/UserController');
const {getSharesByUserID } = require('./Controllers/SharesController');
const { EtoroUserLogin, EtoroOTPLogin } = require('./Controllers/EtoroController');

const app = express();
app.use(express.json());
const cors = require('cors');
const { EtoroUserLOgin } = require('./Controllers/EtoroController');
app.use(cors());

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

// Ruta para saber si el usuario introducido es válido o no.
app.post('/users/isValidUser/', async (req, res) => {
    const { user, password } = req.body;

    try {
        const result = await isValidUser(user, password);
        if (result.status === 'OK') { // Cambiado para usar 'status' en lugar de 'success'
            res.json({ 
                success: true, 
                message: result.message, // Mensaje devuelto desde el controlador
                data: result.data // Datos del usuario devueltos desde el controlador
            });
        } else {
            res.status(401).json({ 
                success: false, 
                message: result.message // Mensaje devuelto desde el controlador
            });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al validar el usuario' });
    }
});


//Ruta para hacer login en la app de ETORO
app.post('/etoro/isValidUser/', async (req, res) => {
    const {user, password} = req.body;
    try{
        const result = await EtoroUserLogin(user, password);
        res.json({ 
            success: true, // Mensaje devuelto desde el controlador
            data: result.data // Datos del usuario devueltos desde el controlador
        });
        if (result) {
            console.log('ok');
        } else {
            console.log('error');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al validar el usuario' });
    }
});

//Ruta para validar el OTP en la app de ETORO
app.post('/etoro/isValidOTP/', async (req, res) => {
    const {jwt,otpId, otpNumber} = req.body;
    try{
        const result = await EtoroOTPLogin(jwt,otpId,otpNumber);
        res.json({ 
            success: true, // Mensaje devuelto desde el controlador
            data: result.data // Datos del usuario devueltos desde el controlador
        });
        if (result) {
            console.log('ok');
        } else {
            console.log('error');
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al validar el usuario' });
    }
});



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
