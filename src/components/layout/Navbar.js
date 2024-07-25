import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/jobs">Jobs</Link></li>
        <li><Link to="/chat">Chat</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/documentation">Documentation</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;