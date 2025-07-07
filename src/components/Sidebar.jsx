import React from "react";
import { Link } from "react-router-dom";

import { FaClock, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaEnvelope } from "react-icons/fa";

const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role || "Applicant";

  // Set portal label
  const portalLabel = `${role} Portal`;

  // Set role-based routing
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
        return `/${type.toLowerCase()}`; // fallback for Student or unknown roles
    }
  };

  const pendingLink = getRoute("Pending");
  const acceptedLink = getRoute("Accepted");
  const rejectedLink = getRoute("Rejected");

  return (
    <div className="sidebar" >
      {/* Logo Section */}
      <div className="logo-container">
        <div className="logo-box">
          <h2>
            {portalLabel.split(" ")[0]} <br /> {portalLabel.split(" ")[1]}
          </h2>
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

        {/* Support Section */}
        <div className="support-section">
          <div className="status-item">
            <Link to="/faqs">
              <FaQuestionCircle className="status-icon" /> FAQ's
            </Link>
          </div>
          <div className="status-item">
            <Link to="/contact">
              <FaEnvelope className="status-icon" /> Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;