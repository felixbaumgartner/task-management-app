import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header">
      <h1>Task Management App</h1>
      <nav>
        <Link to="/" style={{ color: 'white', marginRight: '20px', textDecoration: 'none' }}>
          All Tasks
        </Link>
        <Link to="/add" style={{ color: 'white', textDecoration: 'none' }}>
          Add New Task
        </Link>
      </nav>
    </div>
  );
};

export default Header;