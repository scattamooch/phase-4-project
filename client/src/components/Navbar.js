import React from 'react';
import {NavLink} from "react-router-dom";

function Navbar() {
  return (
          <nav className="nav-bar">
        <div className="nav-bar-container">
          <div className="nav-links-container">
            <NavLink exact to="/" className="nav-links">Home</NavLink>
            <NavLink exact to="/movies" className="nav-links">Movies</NavLink>
            <NavLink exact to="/profile" className="nav-links">Profile</NavLink>
            <NavLink exact to="/" className="nav-links">Filler</NavLink>
          </div>
          <div className="auth-links-container">
            <NavLink exact to="/login" className="auth-link">Login</NavLink>
            <NavLink exact to="/sign-up" className="auth-link">Sign Up</NavLink>
          </div>
        </div>
      </nav>
  );
}

export default Navbar;

