import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../pages/Navbar.css";
import somaiyaLogo from "../assets/somaiya-logo.png";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userName = user?.svvNetId?.split("@")[0] || "User";
  const userRole = user?.role || "Student";

  const displayRole = userRole === "Validator" ? "Faculty" : userRole;

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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="navbar-home">
      <div className="navbar-left">
        <img src={somaiyaLogo} alt="Somaiya Logo" className="navbar-logo" />
      </div>

      <div
        className={`hamburger ${isMobileMenuOpen ? "active" : ""}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className={`navbar-center ${isMobileMenuOpen ? "active" : ""}`}>
       
        <Link to={homeLink} className="nav-link" onClick={closeMobileMenu}>
          Home
        </Link>
        {userRole === "Admin" ? (
          <Link to="/adduser" className="nav-link" onClick={closeMobileMenu}>
            Add User
          </Link>
        ) : (
          <Link to="/dashboard" className="nav-link" onClick={closeMobileMenu}>
            Dashboard
          </Link>
        )}
        <Link to="/policy" className="nav-link" onClick={closeMobileMenu}>
          Policy
        </Link>
        <Link to="/" className="nav-link logout-btn" onClick={closeMobileMenu}>
          Logout
        </Link>
      </div>

      <div className="navbar-user-home">
        <span className="user-name">{userName}</span>
        <span className="user-role">{displayRole}</span>
      </div>
    </nav>
  );
};

export default Navbar;