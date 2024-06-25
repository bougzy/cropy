
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Riders from './Riders';
import Users from './Users';
import Settings from './Settings';
import RiderProfile from './RiderProfile';
import Login from './Login'; // Assuming you create a Login component

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const menus = [
    { name: 'Riders', path: '/riders' },
    { name: 'Users', path: '/users' },
    { name: 'Settings', path: '/settings' },
  ];

  useEffect(() => {
    // Check if user is logged in based on credentials
    if (username === 'cropncarry' && password === '1234') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [username, password]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleLogin = (user: string, pass: string) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <Router>
      {isLoggedIn ? (
        <div style={{ display: 'flex' }}>
          <Sidebar menus={menus} handleLogout={handleLogout} />
          <div style={{ marginLeft: 240, padding: 20, width: '100%' }}>
            <Routes>
              <Route path="/riders" element={<Riders />} />
              <Route path="/users" element={<Users />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/rider/:id" element={<RiderProfile />} />
              <Route path="/" element={<div>Select a page</div>} />
            </Routes>
          </div>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </Router>
  );
};

export default App;
