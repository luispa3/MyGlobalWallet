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

// Función para saber si el usuario es válido o no.
async function isValidUser(user, password) {
    try {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('user', user)
            .input('password', password)
            .execute('isValidUser');

        const userExists = result.recordset;

        if (userExists.length === 1) {
            return {
                status: 'OK',
                data: {
                    userID: userExists[0].ID,
                    userName: userExists[0].User, 
                    email: userExists[0].Email
                },
                message: 'Valid user'
            };
        } else {
            return {
                status: 'BadRequest',
                message: 'Invalid username, email or password'
            };
        }
    } catch (err) {
        console.error('Error validating user: '+user, err);
        throw err;
    }
}

module.exports = { getUsers, getUserByEmail, getUsersByCountry, isValidUser };
