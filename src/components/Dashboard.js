import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userEmail, setUserEmail] = useState('');
  const [loginCount, setLoginCount] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [usersList, setUsersList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch logged-in user info
    axios.get(process.env.REACT_APP_BACKEND_URL + '/api/user', { withCredentials: true })
      .then(response => {
        setUserEmail(response.data.email);
        setLoginCount(response.data.login_count);
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Failed to load user data');
      });

    // Fetch total registered users count
    axios.get(process.env.REACT_APP_BACKEND_URL + '/api/usercount', { withCredentials: true })
      .then(response => {
        setTotalUsers(response.data.count);
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Failed to load user count');
      });

    // Fetch all users list
    axios.get(process.env.REACT_APP_BACKEND_URL + '/api/users', { withCredentials: true })
      .then(response => {
        setUsersList(response.data.users);
      })
      .catch(error => {
        setError(error.response?.data?.error || 'Failed to load users list');
      });
  }, []);

  return (
    <div style={{
      maxWidth: '900px',
      margin: '50px auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: '#f0f4f8',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Dashboard</h2>
      {userEmail ? (
        <>
          <p style={{ fontSize: '18px', fontWeight: '600', color: '#555', textAlign: 'center' }}>Welcome, <span style={{ color: '#1976d2' }}>{userEmail}</span>!</p>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Metric</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Your Login Count</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{loginCount}</td>
              </tr>
              <tr>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Total Registered Users</td>
                <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{totalUsers}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '40px', color: '#333' }}>All Registered Users</h3>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '10px',
            backgroundColor: 'white',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#1976d2', color: 'white' }}>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>Login Count</th>
              </tr>
            </thead>
            <tbody>
              {usersList.map((user, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'center' }}>{user.login_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <p style={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</p>
      )}
    </div>
  );
};

export default Dashboard;
