import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto de recargar la página
    try {
      console.log(user+"///"+password);
      const responseLogin = await axios.post('http://localhost:3000/etoro/isValidUser', { user, password });
      
      if (responseLogin.data.success) {
        console.log(responseLogin.data);
        console.log(responseLogin.data.data.token);
        console.log(responseLogin.data.data.token.jwt)
        sessionStorage.setItem("TokenLogin",responseLogin.data.data.token.jwt);
        sessionStorage.setItem("TokenLoginExpires", responseLogin.data.data.token.expiresInMs);
        sessionStorage.setItem("TokenOTP",responseLogin.data.data.twoFactor.otp.userOtpId);
        sessionStorage.setItem("TokenOTPExpires",responseLogin.data.data.twoFactor.otp.expiresInMs);
      } else {
        setErrorMessage(responseLogin.data.message);
      }
      const jwt = sessionStorage.getItem("TokenLogin");
      const otpId = sessionStorage.getItem("TokenOTP");
      const otpNumber = sessionStorage.getItem("OtpNumber");

      const responseOTP = await axios.post('http://localhost:3000/etoro/isValidOTP', {jwt, otpId, otpNumber});

      if(responseOTP.data.success)
      console.log(responseOTP.data);
      console.log(responseOTP.data.data.token);
      console.log(responseOTP.data.data.token.jwt)
      sessionStorage.setItem("TokenOTPjwt",responseOTP.data.data.token.jwt);
      sessionStorage.setItem("TokenOTPExpires", responseOTP.data.data.token.expiresInMs);

      navigate('/dashboard');
    } catch (error) {
      console.log(error);
      setErrorMessage('Error logging in. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h2>MyGloballWallet</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <label htmlFor="username">User/Email:</label>
        <input
          type="text"
          id="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter your user or email"
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit" style={{ marginTop: '20px', padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
