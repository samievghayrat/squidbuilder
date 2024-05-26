import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './index';


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedInStatus);
  }, []);

  const handleLogin = (data) => {
    console.log("Login data:", data);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleRegister = (data) => {
    console.log("Register data:", data);
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };


  return (
    <Router>
      <Routes>
        <Route path='/room' element={ !isLoggedIn ? <Navigate to="/" /> :
          <button className="header logout-button" onClick={handleLogout}>Logout</button>
        }/>
        <Route path="/" element={ isLoggedIn ? <Navigate to="/room" /> :
            <div className="App">
            <h1>Welcome to SquidBuilder</h1>
            {isLogin ? (
              <LoginForm onLogin={handleLogin} />
            ) : (
              <RegisterForm onRegister={handleRegister} />
            )}
            <button className="toggle-button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </div>
        } />
      </Routes>
    </Router>
  );
};

export default App;
