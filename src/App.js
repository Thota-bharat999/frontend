import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <Router>
      <div className="App" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <nav style={{ padding: '10px', backgroundColor: '#222', color: 'white', display: 'flex', justifyContent: 'center', gap: '30px', fontWeight: 'bold', fontSize: '18px' }}>
          {!isLoggedIn && (
            <>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', borderRadius: '5px', backgroundColor: '#4CAF50' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', borderRadius: '5px', backgroundColor: '#2196F3' }}>Register</Link>
            </>
          )}
          {isLoggedIn && (
            <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '8px 15px', borderRadius: '5px', backgroundColor: '#f44336' }}>Dashboard</Link>
          )}
        </nav>
        <Routes>
          <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
