import React from "react";
import { Link } from "react-router-dom"; 
import "../style.css";
import somaiyaLogo from "../assets/somaiya-logo.png";

const Navbar = () => {
  return (
    <nav className="navbar-home">
      
      <div className="navbar-left">
        <img src={somaiyaLogo} alt="Somaiya Logo" className="navbar-logo" />
      </div>

      
      <div className="navbar-center">
        <Link to="/home" className="nav-link">Home</Link>
        <Link to="/dashboard" className="nav-link">Dashboard</Link>
        <Link to="/policy" className="nav-link">Policy</Link>
        <Link to="/" className="nav-link logout-btn">Logout</Link>
      </div>

      
      <div className="navbar-user-home">
        <span className="user-name">Devanshu Desai</span>
        <span className="user-role">UG (A1&DS)</span>
      </div>
    </nav>
  );
};

export default Navbar;
