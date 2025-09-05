import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL + '/api/dashboard', { withCredentials: true })
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(error.response?.data?.error || 'Failed to load dashboard');
      });
  }, []);

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Dashboard</h2>
      <p>{message}</p>
    </div>
  );
};

export default Dashboard;
