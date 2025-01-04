import React from "react";
import "../styles/Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div style={{userSelect:"none"}}>
      {/* Header Section */}
      <header className="header">
        <div className="logo">
          <span className="icon">❤</span>HealthSchems
        </div>
        <nav className="nav-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <Link to="/contact-us">Contact</Link>
          
          <a href="#twitter">Twitter</a>
          <a href="#facebook">Facebook</a>
          <a href="#instagram">Instagram</a>
        </nav>
      </header>
    </div>
  );
}

export default Footer;
