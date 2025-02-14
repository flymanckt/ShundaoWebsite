import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function NavBar() {
  return (
    <div className="navbar-outer">
      <nav className="navbar">
        <Link to="/" className="logo">
          <img src="/assets/images/logo.png" alt="Shundao Logo" className="logo-image" />
        </Link>
        <ul className="nav-links">
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/news">News</Link></li>
          <li><Link to="/sustainability">Sustainability</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/careers">Careers</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
