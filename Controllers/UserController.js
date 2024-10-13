const { connectToDB } = require('../connection');

// Función para obtener todos los usuarios
async function getUsers() {
    try {
        const pool = await connectToDB();
        const result = await pool.request().query('SELECT * FROM Users');
        console.log('Usuarios obtenidos:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        throw err;
    }
}

// Función para obtener un usuario por email
async function getUserByEmail(email) {
    try {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('email', email)
            .query('SELECT * FROM Users WHERE Email = @email'); 
        console.log('Usuario obtenido:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error al obtener usuario por email:', err);
        throw err;
    }
}

// Función para obtener todos los usuarios por pais
async function getUsersByCountry(country) {
    try {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('country', country)
            .query('SELECT * FROM Users WHERE Country = @country');
        console.log('Usuarios obtenidos:', result.recordset);
        return result.recordset;
    } catch (err) {
        console.error('Error al obtener los usuarios por país:', err);
        throw err;
    }
}

module.exports = { getUsers, getUserByEmail, getUsersByCountry };
