// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./css/Navbar.css"; // Import your CSS file

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/cart" className="nav-link">
        Cart
      </Link>
    </nav>
  );
};

export default Navbar;
