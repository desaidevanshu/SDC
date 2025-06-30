import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../style.css";

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = () => {
    const pending = JSON.parse(localStorage.getItem("pendingApps")) || [];
    const approved = JSON.parse(localStorage.getItem("approveApps")) || [];
    const rejected = JSON.parse(localStorage.getItem("rejectedApps")) || [];

    const withStatus = (data, status) =>
      data.map((app) => ({
        ...app,
        status,
      }));

    const allApps = [
      ...withStatus(pending, "Pending"),
      ...withStatus(approved, "Approved"),
      ...withStatus(rejected, "Rejected"),
    ];

    setApplications(allApps);
  };

  const handleEdit = (app) => {
    const newStatus = window.prompt("Enter new status: Approved / Rejected", app.status);
    if (!newStatus || !["Approved", "Rejected"].includes(newStatus)) {
      alert("Invalid status. Use 'Approved' or 'Rejected'.");
      return;
    }

    const newRemarks = window.prompt("Enter new remarks:", app.remarks || "");
    if (!newRemarks) {
      alert("Remarks required.");
      return;
    }

    // Remove from all buckets
    ["pendingApps", "approveApps", "rejectedApps"].forEach((key) => {
      const data = JSON.parse(localStorage.getItem(key)) || [];
      const updated = data.filter((a) => a.id !== app.id);
      localStorage.setItem(key, JSON.stringify(updated));
    });

    // Save into new bucket
    const targetKey = newStatus === "Approved" ? "approveApps" : "rejectedApps";
    const updatedApp = { ...app, remarks: newRemarks };
    const newList = JSON.parse(localStorage.getItem(targetKey)) || [];
    localStorage.setItem(targetKey, JSON.stringify([...newList, updatedApp]));

    loadApplications(); // reload local state
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
                <p>Admin</p>
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
                  <th>Action</th>
                  <th>Edit</th>
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
                      <td>
                        <button
                          className="view-btn"
                          onClick={() =>
                            navigate(`/facHome/${app.path || app.formId?.toLowerCase?.() || ""}`)
                          }
                        >
                          View Form
                        </button>
                      </td>
                      <td>
                        {(app.status === "Approved" || app.status === "Rejected") && (
                          <button className="edit-btn" onClick={() => handleEdit(app)}>
                            Edit
                          </button>
                        )}
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

export default AdminDashboard;
