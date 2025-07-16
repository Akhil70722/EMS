import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <h1 className="brand">Admin Dashboard</h1>

      <div className="navbar-right">
        <input className="search-box" placeholder="Search employees..." />

        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="User" className="avatar" />
          <span className="username">Akhil Mate</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
