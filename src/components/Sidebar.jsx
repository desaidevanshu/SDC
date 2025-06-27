import React from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Sidebar = () => {
  // Get user role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const isValidator = user?.role === "Validator";
  const portalLabel = isValidator ? "Validator Portal" : "Applicant Portal";
  const pendingLink = isValidator ? "/facPending" : "/pending";
  const acceptedLink = isValidator ? "/facaccepted" : "/accepted";
  const rejectedLink = isValidator ? "/facRejected" : "/rejected";

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-box">
          <h2>{portalLabel.split(" ")[0]} <br /> {portalLabel.split(" ")[1]}</h2>
          <p>Somaiya Vidyavihar University</p>
        </div>
      </div>

      {/* Sidebar Options */}
      <div className="sidebar-links">
        <p>Application Forms</p>

        {/* Application Status Section */}
        <div className="status-section">
          <p>Application Status</p>
          <div className="status-item">
            <Link to={pendingLink}>
              <FaClock className="status-icon" /> Pending 
            </Link>
          </div>
          <div className="status-item">
            <Link to={acceptedLink}>
              <FaCheckCircle className="status-icon" /> Accepted
            </Link>
          </div>
          <div className="status-item">
            <Link to={rejectedLink}>
              <FaTimesCircle className="status-icon" /> Rejected
            </Link>
          </div>
        </div>

        <Link to="/faqs" className="nav-item">FAQ's</Link>
        <br />
        <Link to="/contact" className="nav-item">Contact Us</Link>
      </div>
    </div>
  );
};

export default Sidebar;