import React from "react";
import "../style.css";

const Sidebar = ({ setSelectedForm }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h3>Applicant Portal</h3>
        <p>Somaiya Vidyavihar University</p>
      </div>
      <ul className="sidebar-menu">
        <li onClick={() => setSelectedForm(null)}>Application Forms</li>
        <li className="sidebar-submenu">Application Status</li>
        <li className="status-option">🔄 Pending</li>
        <li className="status-option">✅ Accepted</li>
        <li className="status-option">❌ Rejected</li>
        <li className="sidebar-submenu">FAQ’s</li>
        <li className="sidebar-submenu">Contact Us</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
