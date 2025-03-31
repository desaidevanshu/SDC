import React from "react";
import "../style.css";
import { FaClock, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-box">
          <h2>Applicant <br /> Portal</h2>
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
            <FaClock className="status-icon" /> Pending
          </div>
          <div className="status-item">
            <FaCheckCircle className="status-icon" /> Accepted
          </div>
          <div className="status-item">
            <FaTimesCircle className="status-icon" /> Rejected
          </div>
        </div>

        <p>FAQ’s</p>
        <p>Contact Us</p>
      </div>
    </div>
  );
};

export default Sidebar;
