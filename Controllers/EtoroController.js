const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const config = require('./../config');

// Función para hacer la solicitud al endpoint
async function EtoroUserLogin(username, password) {
    try {
      // Definir el URL del endpoint
      const guid = uuidv4();
      const url = `${config.etoro.url}${guid}`;
      console.log(url);
      // Definir las cabeceras personalizadas
      const headers = config.etoro.headersLogin;

      // Cuerpo de la solicitud
      const data = {
          loginIdentifier: username,
          password: password,
          requestedScopes: [],
          isTemporalDevice: false,
          deviceTokens: null
      };

      const response = await axios.post(url, data, { headers });
      console.log('Respuesta del servidor:', response.data);
      return true;
    } catch (error) {
        console.error('Error realizando la solicitud:', error.message);
        return false;
    }
  }

module.exports = { EtoroUserLogin };