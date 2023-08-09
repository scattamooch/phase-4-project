import React from "react";
import { Link } from "react-router-dom";

function Main() {
  return (
    <div className="main-container">
      <h1>Welcome to Our Website!</h1>
      <p>
        We're excited to have you here!
      </p>
      <p>
        Feel free to explore the different sections of our site using the links below:
      </p>
      <ul>
        <li>
          <Link to="/movies">View Movie Catalog</Link>
        </li>
        <li>
          <Link to="/users">Meet Our Users</Link>
        </li>
        <li>
          <Link to={`/profile/${userId}`}>Your Profile</Link>
        </li>
      </ul>
    </div>
  );
}

export default Main;