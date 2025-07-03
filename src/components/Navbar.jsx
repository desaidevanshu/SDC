// Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom"; 
import "../style.css";
import somaiyaLogo from "../assets/somaiya-logo.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.svvNetId?.split("@")[0] || "User";
  const userRole = user?.role || "Student";
  const location = useLocation();

  let displayRole = userRole === "Validator" ? "Faculty" : userRole;

  const roleRoutes = {
    Student: "/home",
    Validator: "/facHome",
    Admin: "/AdHome",
    "Department Coordinator": "/deptcoordHome",
    "Institute Coordinator": "/insticoordHome",
    HOD: "/hodHome",
    Principal: "/principalHome",
  };

  const homeLink = roleRoutes[userRole] || "/home";

  return (
    <nav className="navbar-home">
      <div className="navbar-left">
        <img src={somaiyaLogo} alt="Somaiya Logo" className="navbar-logo" />
      </div>

      <div className="navbar-center">
        <Link to={homeLink} className="nav-link">Home</Link>
        {userRole === "Admin" ? (
          <Link to="/adduser" className="nav-link">Add User</Link>
        ) : (
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        )}
        <Link to="/policy" className="nav-link">Policy</Link>
        <Link to="/" className="nav-link logout-btn">Logout</Link>
      </div>

      <div className="navbar-user-home">
        <span className="user-name">{userName}</span>
        <span className="user-role">{displayRole}</span>
      </div>
    </nav>
  );
};

export default Navbar;
