import React from 'react';
import './NavBar.css';

function NavBar() {
  return (
    <div className="navbar">
      <a href="/">Home</a>
      <a href="/work">Work</a>
      <a href="/capabilities">Capabilities</a>
      <a href="/contact">Contact</a>
    </div>
  );
}

export default NavBar;
