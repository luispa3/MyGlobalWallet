// db/connection.js
const sql = require('mssql');

const config = {
    user: 'sa', // Usuario de SQL Server
    password: 'Admin123', // Contraseña de SQL Server
    server: 'localhost', // Dirección del servidor
    database: 'MyGlobalWallet', // Nombre de la base de datos
    options: {
        encrypt: false, // Desactivar SSL si no se usa
        trustServerCertificate: true, // Si usas SQL Server local, debe estar en true
    },
    port: 1433, // Puerto por defecto de SQL Server
};

// Función para conectarse a la base de datos
async function connectToDB() {
    try {
        const pool = await sql.connect(config);
        console.log('Conexión exitosa a la base de datos');
        return pool;
    } catch (err) {
        console.error('Error al conectar a la base de datos:', err);
        throw err;
    }
}

module.exports = {
    connectToDB,
    sql
};
