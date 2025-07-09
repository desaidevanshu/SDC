import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const FacPendingApplications = () => {
  const [applications, setApplications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [currentAction, setCurrentAction] = useState(null); // 'approve' or 'reject'
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const mockData = [
      {
        id: 16014223035,
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

    const stored = JSON.parse(localStorage.getItem("pendingApps")) || [];
    setApplications(stored);
  }, []);

  const updateStorage = (key, item) => {
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    localStorage.setItem(key, JSON.stringify([...existing, item]));
  };

  const handleActionClick = (type, id) => {
    const actionName = type === "approve" ? "Approve" : "Reject";
    const confirmed = window.confirm(`Are you sure to ${actionName}?`);
    if (!confirmed) return;

    setCurrentAction(type);
    setCurrentId(id);
    setShowModal(true);
  };

  const handleModalSubmit = () => {
    if (!remarks) {
      alert("Remarks are required.");
      return;
    }

    const app = applications.find((a) => a.id === currentId);
    const updated = { ...app, remarks };

    // Save to approved or rejected
    updateStorage(currentAction === "approve" ? "approveApps" : "rejectedApps", updated);

    // Remove from shared pending
    const newList = applications.filter((a) => a.id !== currentId);
    setApplications(newList);
    localStorage.setItem("pendingApps", JSON.stringify(newList));

    // Reset and close modal
    setRemarks("");
    setShowModal(false);
    setCurrentAction(null);
    setCurrentId(null);

    // Navigate
    navigate(`/${currentAction === "approve" ? "facaccepted" : "facRejected"}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setRemarks("");
    setCurrentAction(null);
    setCurrentId(null);
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
                        <button onClick={() => handleActionClick("approve", app.id)} className="approve-button">
                          Approve
                        </button>
                        <button onClick={() => handleActionClick("reject", app.id)} className="reject-button">
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Pending Applications</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Remarks Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>Enter Remarks</h3>
              <button className="modal-close" onClick={handleModalClose}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder={`Enter remarks for ${currentAction === "approve" ? "approval" : "rejection"}...`}
                rows={5}
              />
            </div>
            <div className="modal-footer">
              <button onClick={handleModalClose} className="modal-cancel">
                Cancel
              </button>
              <button onClick={handleModalSubmit} className="modal-submit">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacPendingApplications;