import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = ({ onLogout }) => {
  const [message, setMessage] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userCount, setUserCount] = useState(0);
  const [users, setUsers] = useState([]);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:4000/api/user', { withCredentials: true });
        setUserEmail(userResponse.data.email);
        setAuthorized(true);
        setMessage('Welcome to the dashboard!');

        // Fetch user count
        const countResponse = await axios.get('http://localhost:4000/api/usercount', { withCredentials: true });
        setUserCount(countResponse.data.count);

        // Fetch all users with login counts
        const usersResponse = await axios.get('http://localhost:4000/api/users', { withCredentials: true });
        setUsers(usersResponse.data.users);
      } catch (error) {
        setAuthorized(false);
        setMessage('Unauthorized');
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/logout', {}, { withCredentials: true });
      onLogout();
    } catch (error) {
      setMessage('Logout failed');
    }
  };

  return (
    <div style={{
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '700px',
      margin: '50px auto',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      borderRadius: '10px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#222', marginBottom: '20px' }}>Dashboard</h2>
      <p style={{ fontSize: '20px', color: authorized ? '#4caf50' : '#f44336', marginBottom: '10px' }}>{message}</p>
      {authorized && (
        <>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '10px' }}>Logged in as: <strong>{userEmail}</strong></p>
          <p style={{ fontSize: '18px', color: '#555', marginBottom: '30px' }}>Total users registered: <strong>{userCount}</strong></p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f2f2f2' }}>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Login Count</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.email}</td>
                  <td style={{ border: '1px solid #ddd', padding: '8px' }}>{user.login_count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
      <button
        onClick={handleLogout}
        style={{
          padding: '12px 30px',
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '18px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease'
        }}
        onMouseOver={e => e.currentTarget.style.backgroundColor = '#d32f2f'}
        onMouseOut={e => e.currentTarget.style.backgroundColor = '#f44336'}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
