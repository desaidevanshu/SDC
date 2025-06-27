
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const RejectedApplications = () => {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("rejectedApps")) || [];
    setApps(stored);
  }, []);

  return (
    <div className="main-wrapper">
      <Navbar />
      <Sidebar />
      <div className="page-wrapper">
        <div className="content-area">
          <h2 className="page-title">Rejected Applications</h2>
          <div className="table-wrapper">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Name</th>
                  <th>Submitted</th>
                  <th>Branch</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {apps.length > 0 ? (
                  apps.map((app) => (
                    <tr key={app.id}>
                      <td>{app.topic}</td>
                      <td>{app.name}</td>
                      <td>{app.submitted}</td>
                      <td>{app.branch}</td>
                      <td>{app.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="no-data">
                      No rejected applications found.
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

export default RejectedApplications;
