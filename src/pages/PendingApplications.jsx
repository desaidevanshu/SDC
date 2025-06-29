import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const PendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = [
      {
        id:16014223035,
        topic: "UG_1",
        name: "Faculty_Computer_KJSCE",
        submitted: "24/03/2025",
        branch: "AIML",
      },
      {
        id: 16014210456,
        topic: "PG_2",
        name: "Faculty_Electronics_KJSCE",
        submitted: "25/03/2025",
        branch: "Electronics",
      },
      {
        id: 16014204256,
        topic: "UG_3",
        name: "Faculty_Mechanical_KJSCE",
        submitted: "26/03/2025",
        branch: "Mechanical",
      },
    ];

    // Only initialize if pendingApps is empty (first load)
    const existing = localStorage.getItem("pendingApps");
    if (!existing) {
      localStorage.setItem("pendingApps", JSON.stringify(mockData));
    }

    const pending = JSON.parse(localStorage.getItem("pendingApps")) || [];
    setApplications(pending);
  }, []);

  const handleViewClick = (id) => {
    navigate(`/application/${id}`);
  };

  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content-area">
          <h2 className="page-title">Pending Applications</h2>
          <p className="subtitle">
            These are the applications you’ve submitted and are waiting for faculty approval.
          </p>

          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Name</th>
                  <th>Submitted</th>
                  <th>Branch</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app) => (
                    <tr key={app.id}>
                      <td>{app.topic}</td>
                      <td>{app.name}</td>
                      <td>{app.submitted}</td>
                      <td>{app.branch}</td>
                      <td>
                        <button
                          onClick={() => handleViewClick(app.id)}
                          className="view-button"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No pending applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApplications;
