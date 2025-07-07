import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import somaiyaLogo from "../assets/somaiya-logo.png";
import Sidebar from "./Sidebar";

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
  const [showSidebar, setShowSidebar] = useState(false);
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

  const toggleSidebar = () => {
    if(isMobile){
        setIsMobileMenuOpen(false);
        setTimeout(() => setShowSidebar(true), 300); 
    }
    setShowSidebar(!showSidebar);
    
  };

  const closeAllMenus = () => {
    setIsMobileMenuOpen(false);
    setShowSidebar(false);
  };

  return (
    <>
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
          <div className="nav-link" onClick={toggleSidebar}>
            Application Status
          </div>
          <Link to={homeLink} className="nav-link" onClick={closeAllMenus}>
            Home
          </Link>
          {userRole === "Admin" ? (
            <Link to="/adduser" className="nav-link" onClick={closeAllMenus}>
              Add User
            </Link>
          ) : (
            <Link to="/dashboard" className="nav-link" onClick={closeAllMenus}>
              Dashboard
            </Link>
          )}
          <Link to="/policy" className="nav-link" onClick={closeAllMenus}>
            Policy
          </Link>
          <Link to="/" className="nav-link logout-btn" onClick={closeAllMenus}>
            Logout
          </Link>
        </div>

        <div className="navbar-user-home">
          <span className="user-name">{userName}</span>
          <span className="user-role">{displayRole}</span>
        </div>
      </nav>

      <div className={`sidebar ${showSidebar ? "active" : ""} ${isMobile ? "mobile" : ""}`}>
        <Sidebar />
      </div>

      {isMobile && showSidebar && (
        <div className="sidebar-overlay" onClick={closeAllMenus} />
      )}
    </>
  );
};

export default Navbar;