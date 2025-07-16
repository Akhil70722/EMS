import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <h1 className="brand">Employee Dashboard</h1>

      <div className="navbar-right">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="avatar" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
