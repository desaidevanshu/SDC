import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/styles/facPending.css";

const FacRejectedApplications = () => {
  const [rejected, setRejected] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [editedRemarks, setEditedRemarks] = useState("");

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("rejectedApps")) || [];
    setRejected(data);
  }, []);

  const handleEditClick = (app) => {
    setCurrentApp(app);
    setEditedRemarks(app.remarks);
    setShowModal(true);
  };

  const handleSaveChanges = () => {
    const updatedApps = rejected.map(app => 
      app.id === currentApp.id ? { ...app, remarks: editedRemarks } : app
    );
    
    setRejected(updatedApps);
    localStorage.setItem("rejectedApps", JSON.stringify(updatedApps));
    setShowModal(false);
  };

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
                  <th>Action</th>
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
                      <td>
                        <button 
                          className="edit-btn"
                          onClick={() => handleEditClick(app)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">No Rejected Applications</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Edit Remarks Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Remarks for {currentApp?.name}</h3>
            <textarea
              value={editedRemarks}
              onChange={(e) => setEditedRemarks(e.target.value)}
              className="remarks-textarea"
              rows="5"
              placeholder="Enter remarks..."
            />
            <div className="modal-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button 
                className="save-btn"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacRejectedApplications;