import React from "react";
import "./css/navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-elements">
        <div className="app-title">
          <span>Translation App</span>
        </div>
        <div className="nav-links">
          <Link to="home">Home Page</Link>
          <Link to="doc-scanner">Upload File</Link>
          <Link to="about">About Us</Link>
          <Link to="contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
