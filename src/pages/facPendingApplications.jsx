import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const FacPendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pendingApps")) || [];
    setApplications(stored);
  }, []);

  const updateStorage = (key, item) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...existing, item]));
  };

  const handleAction = (type, id) => {
    const actionName = type === "approve" ? "Approve" : "Reject";
    const confirmed = window.confirm(`Are you sure to ${actionName}?`);
    if (!confirmed) return;

    let remarks = "";
    while (!remarks) {
      remarks = window.prompt(`Enter remarks for ${actionName}:`);
      if (!remarks) alert("Remarks are required.");
    }

    const app = applications.find((a) => a.id === id);
    const updated = { ...app, remarks };

    // Save to approved or rejected
    updateStorage(type === "approve" ? "approvedApps" : "rejectedApps", updated);

    // Remove from shared pending
    const newList = applications.filter((a) => a.id !== id);
    setApplications(newList);
    localStorage.setItem("pendingApps", JSON.stringify(newList));

    // Navigate
    navigate(`/${type === "approve" ? "facaccepted" : "facRejected"}`);
  };

  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content-area">
          <h2 className="page-title">Pending Applications</h2>
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
                        <button className="view-button">View</button>
                        <button onClick={() => handleAction("approve", app.id)} className="approve-button">Approve</button>
                        <button onClick={() => handleAction("reject", app.id)} className="reject-button">Reject</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No Pending Applications</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacPendingApplications;
