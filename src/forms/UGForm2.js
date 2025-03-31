import React, { useState } from "react";
import "./UGForm2.css";
import axios from "axios";

const UGForm2 = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectUtility: "",
    projectDescription: "",
    finance: "",
    guideName: "",
    employeeCode: "",
    amountClaimed: "",
    studentDetails: Array(4).fill({
      srNo: "",
      branch: "",
      yearOfStudy: "",
      studentName: "",
      rollNumber: "",
    }),
  });

  const [pdfFiles, setPdfFiles] = useState([]); // Store multiple files
  const [error, setError] = useState("");
  const [formId, setFormId] = useState(null);

  // Handle text inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle radio buttons
  const handleRadioChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      finance: value,
    }));
  };

  /// Handle student details input
  const handleStudentDetailsChange = (index, field, value) => {
    setFormData((prevState) => {
      const newStudentDetails = [...prevState.studentDetails];
      newStudentDetails[index] = { ...newStudentDetails[index], [field]: value };
      return { ...prevState, studentDetails: newStudentDetails };
    });
  };

  // Handle multiple file uploads
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];
    let errorMsg = "";

    files.forEach((file) => {
      if (file.type !== "application/pdf") {
        errorMsg = "Only PDF files are allowed.";
      } else if (file.size > 5 * 1024 * 1024) {
        errorMsg = "File must be less than 5MB.";
      } else {
        validFiles.push(file);
      }
    });

    if (errorMsg) {
      setError(errorMsg);
    } else {
      setPdfFiles(validFiles);
      setError("");
    }
  };

  // Save form data and retrieve formId
  const handleSaveFormData = async () => {
    setError("");

    if (!formData.projectTitle || !formData.projectUtility || !formData.projectDescription || !formData.guideName) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/ugform2/saveFormData", formData);

      if (response.data.formId) {
        setFormId(response.data.formId);
        alert("Form data saved successfully!");
        console.log("Saved Form ID:", response.data.formId);

        // If PDF files are selected, upload them
        if (pdfFiles.length > 0) {
          await handleUploadPDF(response.data.formId, pdfFiles);
        }
      } else {
        setError("Failed to get form ID. Try again.");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      setError("Error saving form data. Try again.");
    }
  };

  // Upload multiple PDF files
  const handleUploadPDF = async (formId, files) => {
    try {
      if (!formId) {
        console.error("❌ Missing formId in upload request!");
        return;
      }

      if (files.length === 0) {
        console.error("❌ No files selected!");
        return;
      }

      console.log("📤 Uploading PDFs for Form ID:", formId);

      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append("pdfFiles", file); // Use the same field name for backend processing
      });

      const response = await axios.post(
        `http://localhost:5000/api/ugform2/uploadPDF/${formId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("✅ Upload success:", response.data);
    } catch (error) {
      console.error("❌ Upload error:", error.response ? error.response.data : error.message);
    }
  };

  // Handle form submission
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    await handleSaveFormData();
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Under Graduate Form 2</h1>
      <h2 className="form-subtitle">In-House (FY to LY Students) Interdisciplinary Projects</h2>

      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmitForm}>
        <div className="form-group">
          <label className="form-label">Title of the Project:</label>
          <input type="text" name="projectTitle" value={formData.projectTitle} onChange={handleInputChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Utility of the Project:</label>
          <input type="text" name="projectUtility" value={formData.projectUtility} onChange={handleInputChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea name="projectDescription" value={formData.projectDescription} onChange={handleInputChange} className="form-textarea" required />
        </div>

        <div className="form-group">
          <label className="form-label">Received finance from another agency?</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="finance" value="Yes" checked={formData.finance === "Yes"} onChange={() => handleRadioChange("Yes")} />
              Yes
            </label>
            <label>
              <input type="radio" name="finance" value="No" checked={formData.finance === "No"} onChange={() => handleRadioChange("No")} />
              No
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Guide Name:</label>
          <input type="text" name="guideName" value={formData.guideName} onChange={handleInputChange} className="form-input" required />
        </div>

        <div className="form-group">
          <label className="form-label">Employee Code:</label>
          <input type="text" name="employeeCode" value={formData.employeeCode} onChange={handleInputChange} className="form-input" />
        </div>

        <div className="student-details">
          <h3 className="student-title">Student Details</h3>
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
              {formData.studentDetails.map((student, index) => (
                <tr key={index}>
                  {Object.keys(student).map((field) => (
                    <td key={field}>
                      <input type="text" value={student[field]} onChange={(e) => handleStudentDetailsChange(index, field, e.target.value)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label className="form-label">Upload Supporting Documents:</label>
          <input type="file" accept=".pdf" multiple onChange={handleFileUpload} className="form-file-input" />
          {pdfFiles.length > 0 && (
            <ul>
              {pdfFiles.map((file, index) => (
                <li key={index}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
              ))}
            </ul>
          )}
        </div>

        <div className="form-footer">
          <label className="form-label">Amount Claimed (INR):</label>
          <input type="number" name="amountClaimed" value={formData.amountClaimed} onChange={handleInputChange} className="form-input" />
        </div>

        <button type="button" className="upload-btn"  onClick={() => handleUploadPDF(formId, pdfFiles)}>
          Upload PDF File
        </button>

        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UGForm2;