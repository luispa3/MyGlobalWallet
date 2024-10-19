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
      const response = await axios.post('http://localhost:3000/users/isValidUser', { user, password });
      
      if (response.data.success) {
        sessionStorage.setItem('profile', JSON.stringify(response.data.data));
        navigate('/dashboard');
    } else {
        setErrorMessage(response.data.message);
    }
    } catch (error) {
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
