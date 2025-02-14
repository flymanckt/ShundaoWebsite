import React from "react";
import "../App.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} Shundao. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
