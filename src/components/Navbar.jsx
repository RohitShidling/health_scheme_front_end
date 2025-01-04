import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleApplyNowClick = () => {
    navigate("/more-schemes");
  };

 
  const handleOutsideClick = (e) => {
    if (!e.target.closest(".nav-links") && !e.target.closest(".hamburger")) {
      setIsMenuOpen(false);
    }
  };

  React.useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      {/* Logo Section */}
     
      <div className="logo-section">
        <span className="logo-icon">&#9829;</span>
        <NavLink to="/schemes" id="logo-text">
          <h1 className="logo-text">HealthSchemes</h1>
        </NavLink>
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
        <li className="nav-item">
          <NavLink
            to="/schemes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Scheme
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/more-schemes"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            More Schemes
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/nearest-hospital"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Nearest Hospital
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/hospitals"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Hospitals
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/contact-us"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact Us
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/faq"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            FAQ
          </NavLink>
        </li>
      </ul>

      {/* Hamburger Icon */}
      <button className="hamburger" onClick={toggleMenu}>
        &#9776;
      </button>

      {/* Button Group */}
      <div className="button-group">
        
        <button className="sign-in-button">Sign In</button>
        <button className="apply-now-button" onClick={handleApplyNowClick}>
          Apply Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
