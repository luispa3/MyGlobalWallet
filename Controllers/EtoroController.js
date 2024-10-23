const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const config = require('./../config');

// Función login usuario para obtener otpid
async function EtoroUserLogin(username, password) {
  try {
    const guid = uuidv4();
    const url = `${config.etoro.loginUrl}${guid}`;
    console.log(url);
    const headers = config.etoro.headersLogin;


    const data = {
        loginIdentifier: username,
        password: password,
        requestedScopes: [],
        isTemporalDevice: false,
        deviceTokens: null
    };

    const response = await axios.post(url, data, { headers });
    return {
      status: 'OK',
      data: response.data,
      message: 'Valid user'
  };

  } catch (error) {
      console.log(error);
      return false;
  }
}

async function EtoroOTPLogin(jwt, OTPId, OTPnumber) {
  try {
    const guid = uuidv4();
    const url = `${config.etoro.loginOTPUrl}${guid}`;
    console.log(url);
    const headers = config.etoro.headerLoginOTP;
    headers['Authorization'] = jwt;

    
    const data = {
      userOTPId: OTPId,
      otp: OTPnumber,
      requestedScopes: []
    };
    
    const response = await axios.post(url, data, {headers});
    return {
      status: 'OK',
      data: response.data,
      message: 'Valid OTPNumber'
    };
  } catch (error) {
    console.log(error);
    return false;
  }
}



module.exports = { EtoroUserLogin, EtoroOTPLogin };