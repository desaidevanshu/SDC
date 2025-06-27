import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const FacRejectedApplications = () => {
  const [rejected, setRejected] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rejectedApps")) || [];
    setRejected(data);
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
                {rejected.length > 0 ? (
                  rejected.map((app) => (
                    <tr key={app.id}>
                      <td>{app.topic}</td>
                      <td>{app.name}</td>
                      <td>{app.submitted}</td>
                      <td>{app.branch}</td>
                      <td>{app.remarks}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">No Rejected Applications</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacRejectedApplications;
