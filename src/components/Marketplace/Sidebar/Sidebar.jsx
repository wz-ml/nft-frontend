import React from 'react';

import './Navbar.css'

function Navbar () {
  return (
    <section className="navbar">
      <a href="/" className="navbar-item">Home</a>
      <a href="/about" className="navbar-item">About</a>
      <a href="/resources" className="navbar-item">Resources</a>
      <a href="/market" className="navbar-item">Market</a>
      <a href="/create" className="navbar-item">Create</a>
      <a href="/contact" className="navbar-item">Contact</a>
  </section>
  )
}

export default Navbar;
