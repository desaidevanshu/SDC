import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../style.css";

const HodDashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingApps")) || [];
    const approved = JSON.parse(localStorage.getItem("approveApps")) || [];
    const rejected = JSON.parse(localStorage.getItem("rejectedApps")) || [];

    const withStatus = (data, status) =>
      data.map((app) => ({
        ...app,
        status,
        validatorId: app.validatorId || generateValidatorID(), 
      }));

    const allApps = [
      ...withStatus(pending, "Pending"),
      ...withStatus(approved, "Approved"),
      ...withStatus(rejected, "Rejected"),
    ];

    setApplications(allApps);
  }, []);

  const generateValidatorID = () => {
    const id = Math.floor(100 + Math.random() * 900);
    return `VA_${id}`;
  };

  return (
    <>
      <Navbar />
      <div className="home-container">
        <div className="container">
          <Sidebar />
          <main className="content">
            <div className="dashboard-header">
              <div className="role-box">
                <strong>Signed in as</strong>
                <p>HOD</p>
              </div>
            </div>

            <h2 className="dashboard-title">Recents</h2>
            <table className="app-table">
              <thead>
                <tr>
                  <th>Form</th>
                  <th>Applicant’s Roll No.</th>
                  <th>Application Date</th>
                  <th>Status</th>
                  <th>Validator ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.length > 0 ? (
                  applications.map((app, index) => (
                    <tr key={index}>
                      <td>{app.topic}</td>
                      <td>{app.id}</td>
                      <td>{app.submitted}</td>
                      <td className={`status ${app.status.toLowerCase()}`}>
                        {app.status}
                      </td>
                      <td>{app.validatorId}</td>
                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(`/fachome/${app.path || app.formId.toLowerCase()}`)
                          }
                        >
                          View Form
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No Applications Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </main>
        </div>
      </div>
    </>
  );
};

export default HodDashboard;
