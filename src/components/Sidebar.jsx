import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaClock, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import "../pages/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      // Auto-close sidebar when resizing to mobile if it was open
      if (window.innerWidth <= 768 && isOpen) {
        closeSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Applicant";
  const portalLabel = `${role} Portal`;

  const getRoute = (type) => {
    switch (role) {
      case "Validator":
        return `/fac${type}`;
      case "Department Coordinator":
        return `/deptcoord${type}`;
      case "Institute Coordinator":
        return `/insticoord${type}`;
      case "HOD":
        return `/hod${type}`;
      case "Principal":
        return `/principal${type}`;
      default:
        return `/${type.toLowerCase()}`;
    }
  };

  const pendingLink = getRoute("Pending");
  const acceptedLink = getRoute("Accepted");
  const rejectedLink = getRoute("Rejected");

  return (
    <>
      {/* Mobile Toggle Button - outside sidebar */}
      {isMobile && (
        <button 
          className={`mobile-toggle ${isOpen ? "open" : ""}`}
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      )}

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        {/* Desktop Toggle Button - inside sidebar */}
        {!isMobile && (
          <button 
            className="desktop-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}

        {/* Logo Section */}
        <div className="sidebar-header">
          <div className="logo-box">
            <h2>
              {portalLabel.split(" ")[0]} <br /> {portalLabel.split(" ")[1]}
            </h2>
            <p>Somaiya Vidyavihar University</p>
          </div>
        </div>

        {/* Sidebar Options */}
        <div className="sidebar-links">
          <div className="sidebar-section">
            <h3>Application Forms</h3>
          </div>

          <div className="sidebar-section">
            <h3>Application Status</h3>
            <div className="status-list">
              <Link to={pendingLink} className="status-item" onClick={closeSidebar}>
                <FaClock className="status-icon" /> Pending
              </Link>
              <Link to={acceptedLink} className="status-item" onClick={closeSidebar}>
                <FaCheckCircle className="status-icon" /> Accepted
              </Link>
              <Link to={rejectedLink} className="status-item" onClick={closeSidebar}>
                <FaTimesCircle className="status-icon" /> Rejected
              </Link>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Support</h3>
            <div className="status-list">
              <Link to="/faqs" className="status-item" onClick={closeSidebar}>
                <FaQuestionCircle className="status-icon" /> FAQ's
              </Link>
              <Link to="/contact" className="status-item" onClick={closeSidebar}>
                <FaEnvelope className="status-icon" /> Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}
    </>
  );
};

export default Sidebar;