import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
  return (
    <nav className="nav-bar">
      <div className="nav-bar-container">
        <div className="nav-links-container">
          <NavLink exact to="/" className="nav-links">Home</NavLink>
          <NavLink exact to="/movies" className="nav-links">Movies</NavLink>
          <NavLink exact to="/" className="nav-links">Filler</NavLink>
          <NavLink exact to="/" className="nav-links">Filler</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

