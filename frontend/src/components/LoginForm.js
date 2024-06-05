import React, { useState } from 'react';
import axios from "../api/axiosConfig";
import '../LoginForm.css';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    if (username.trim() === '' || password.trim() === '') {
        alert('Please fill in all fields before registering.');
        return;
    }
    e.preventDefault();
    try {
      await axios.post('/users/login', { username, password });
      onLogin(username);
    } catch (error) {
      alert("Login Failed");
      setPassword('');
      console.error('Login failed', error);
      return;
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
