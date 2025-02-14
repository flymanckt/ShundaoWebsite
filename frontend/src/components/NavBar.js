import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar({ onLanguageChange }) {
  return (
    <div className="navbar-outer">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="Shundao Logo" className="logo-image" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/sustainability">Sustainability</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        </ul>
        <div className="language-selector">
          <button onClick={() => onLanguageChange("en")}>English</button>
          <button onClick={() => onLanguageChange("vi")}>Vietnamese</button>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
