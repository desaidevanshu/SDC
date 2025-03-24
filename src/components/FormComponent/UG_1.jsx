import React, { useState } from "react";
import "../styles/UG1.css";

const UG1Form = () => {
 
  const [groupLeaderSignature, setGroupLeaderSignature] = useState(null);
  const [guideSignature, setGuideSignature] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // File Validation Function
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];

    if (!file) return; 

    if (type === "signature") {
      if (!file.type.startsWith("image/jpeg")) {
        setErrorMessage("Only JPEG format is allowed for signatures.");
        return;
      }
      if (event.target.name === "groupLeaderSignature") {
        setGroupLeaderSignature(file);
      } else {
        setGuideSignature(file);
      }
    } else if (type === "document") {
      if (file.type !== "application/pdf") {
        setErrorMessage("Only PDF format is allowed for document upload.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB.");
        return;
      }
      setUploadedFile(file);
    }

    setErrorMessage(""); 
  };

  return (
    <div className="form-container">
      <h2>Under Graduate Form 1</h2>
      <p className="form-category">In-house Student Project within Department</p>

     
      <label>Title of the Project:</label>
      <input type="text" />

      <label>Utility of the Project:</label>
      <input type="text" />

      <label>Description:</label>
      <textarea />

   
      <label>Whether received finance from any other agency:</label>
      <div className="checkbox-group">
        <input type="checkbox" id="yes" />
        <label htmlFor="yes">Yes</label>
        <input type="checkbox" id="no" />
        <label htmlFor="no">No</label>
      </div>

    
      <div className="guide-details">
        <div>
          <label>Name of the Guide/Co-Guide:</label>
          <input type="text" />
        </div>
        <div>
          <label>Employee Code:</label>
          <input type="text" />
        </div>
      </div>

      
      <table className="student-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Branch</th>
            <th>Year of Study</th>
            <th>Student Name</th>
            <th>Roll Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
            <td><input type="text" /></td>
          </tr>
        </tbody>
      </table>

      
      <div className="signatures">
        <div>
          <label>Signature of Group Leader (JPEG Only)</label>
          <input type="file" accept="image/jpeg" name="groupLeaderSignature" onChange={(e) => handleFileUpload(e, "signature")} />
          {groupLeaderSignature && <p className="file-name">{groupLeaderSignature.name}</p>}
        </div>

        <div>
          <label>Signature of Guide (JPEG Only)</label>
          <input type="file" accept="image/jpeg" name="guideSignature" onChange={(e) => handleFileUpload(e, "signature")} />
          {guideSignature && <p className="file-name">{guideSignature.name}</p>}
        </div>
      </div>

    
      <label>Upload list of parts with price (PDF Only, Max 5MB)</label>
      <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "document")} />
      {uploadedFile && <p className="file-name">{uploadedFile.name}</p>}

    
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <div className="form-actions">
        <button className="back-btn">Back</button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default UG1Form;
