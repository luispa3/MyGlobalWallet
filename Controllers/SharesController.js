const { connectToDB } = require('../connection');
const axios = require('axios');

// Función para obtener las acciones de un usuario
async function getSharesByUserID(userID) {
    try {
        const pool = await connectToDB();
        const result = await pool.request()
            .input('userID', userID)
            .execute('GetSharesByUserID');
        const shares = result.recordset;
        console.log('Acciones obtenidas:', shares);

        // Iterar sobre cada acción para obtener datos de Alpha Vantage
        const promises = shares.map(async (share) => {
            const symbol = share.Acronym;
            const alphaVantageUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=I8E8HK66MTLS48FC`;

            try {
                const response = await axios.get(alphaVantageUrl);
                // Añadir los datos obtenidos a la acción
                const alphaData = response.data['Time Series (Daily)'];
                // Convertir las claves en un array y ordenarlas
                const dates = Object.keys(alphaData).sort((a, b) => new Date(b) - new Date(a));
                const latestDate = dates[0];
                const lastValue = alphaData[latestDate]["4. close"];
                share.ActualPrice = lastValue;
            } catch (apiError) {
                console.error(`Error al obtener datos de Alpha Vantage para ${symbol}:`, apiError);
                share.alphaData = null; // O maneja el error de otra manera
            }
        });
        // Esperar a que todas las promesas se resuelvan
        await Promise.all(promises);

        return shares;
    } catch (err) {
        console.error('Error al obtener las acciones del usuario '+userID+':', err);
        throw err;
    }
}

module.exports = { getSharesByUserID };