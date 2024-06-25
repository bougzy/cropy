import React, { useState } from 'react';
import darklogo from './assets/darklogo.png'; // Import your logo image

const Login: React.FC<{ onLogin: (username: string, password: string) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate credentials
    if (username === 'cropncarry' && password === '1234') {
      onLogin(username, password);
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ textAlign: 'center', padding: '20px', width: '300px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: 'white' }}>
        <img src={darklogo} alt="darklogo" style={{ marginBottom: '20px', width: '100px', height: '100px' }} />
        <h2 style={{ marginBottom: '20px' }}>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ marginBottom: '10px', padding: '8px', width: '100%', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' }} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ marginBottom: '20px', padding: '8px', width: '100%', boxSizing: 'border-box', borderRadius: '5px', border: '1px solid #ccc' }} required />
          <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
