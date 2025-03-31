import React, { useState, useRef, useEffect } from "react";
import "./UG1Form.css";
import axios from "axios";

const UG1Form = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectUtility: "",
    projectDescription: "",
    finance: "",
    guideName: "",
    employeeCode: "",
    svvNetId: "",  
    studentDetails: Array(4).fill({
      branch: "",
      yearOfStudy: "",
      studentName: "",
      rollNumber: "",
    }),
  });

  const [pdfFiles, setPdfFiles] = useState([]); // Store multiple files
  const [error, setError] = useState("");
  const [formId, setFormId] = useState(null);
  const fileInputRef = useRef(null);
  const svvNetIdRef = useRef(""); 

  useEffect(() => {
    const storedSvvNetId = localStorage.getItem("svvNetId");
    if (storedSvvNetId) {
      svvNetIdRef.current = storedSvvNetId;
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleStudentDetailsChange = (index, field, value) => {
    setFormData((prev) => {
      const newStudentDetails = [...prev.studentDetails];
      newStudentDetails[index] = { ...newStudentDetails[index], [field]: value };
      return { ...prev, studentDetails: newStudentDetails };
    });
  };

  // ✅ Handle multiple file selection and validation
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = [];

    files.forEach((file) => {
      if (file.type !== "application/pdf") {
        setError("Only PDF files are allowed.");
      } else if (file.size > 5 * 1024 * 1024) {
        alert("File must be less than 5MB.");
      } else {
        validFiles.push(file);
      }
    });

    if (validFiles.length) {
      setPdfFiles((prev) => [...prev, ...validFiles]);
      setError("");
    }
  };

  // ✅ Remove a selected file
  const removeFile = (index) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Save form data and get formId
  const handleSaveFormData = async () => {
    setError("");

    if (!formData.projectTitle || !formData.projectUtility || !formData.projectDescription || !formData.guideName) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const dataToSend = { ...formData, svvNetId: svvNetIdRef.current };
      const response = await axios.post("http://localhost:5000/api/ug1form/saveFormData", dataToSend);
      
      if (response.data.formId) {
        setFormId(response.data.formId);
        alert("Form data saved successfully!");
        console.log("Saved Form ID:", response.data.formId);

        // Upload multiple PDFs if selected
        if (pdfFiles.length > 0) {
          await handleUploadPDF(response.data.formId);
        }
      } else {
        setError("Failed to get form ID. Try again.");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      setError("Error saving form data. Try again.");
    }
  };

  // ✅ Upload multiple PDF files
  const handleUploadPDF = async (formId) => {
    try {
      if (!formId || pdfFiles.length === 0) return;

      for (const file of pdfFiles) {
        const formData = new FormData();
        formData.append("pdfFile", file);

        await axios.post(`http://localhost:5000/api/ug1form/uploadPDF/${formId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(`PDF ${file.name} uploaded successfully!`);
      }
    } catch (error) {
      console.error("PDF Upload error:", error);
    }
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSaveFormData();
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Under Graduate Form 1</h1>
      <p className="form-subtitle">In-house Student Project within Department</p>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {/* Project Details */}
        <div className="form-field">
          <label>Title of the Project:</label>
          <input type="text" value={formData.projectTitle} onChange={(e) => handleInputChange("projectTitle", e.target.value)} />
        </div>

        <div className="form-field">
          <label>Utility of the Project:</label>
          <input type="text" value={formData.projectUtility} onChange={(e) => handleInputChange("projectUtility", e.target.value)} />
        </div>

        <div className="form-field">
          <label>Description:</label>
          <textarea value={formData.projectDescription} onChange={(e) => handleInputChange("projectDescription", e.target.value)} />
        </div>

        {/* Guide Details */}
        <div className="form-field">
          <label>Guide Name:</label>
          <input type="text" value={formData.guideName} onChange={(e) => handleInputChange("guideName", e.target.value)} />
        </div>

        <div className="form-field">
          <label>Employee Code:</label>
          <input type="text" value={formData.employeeCode} onChange={(e) => handleInputChange("employeeCode", e.target.value)} />
        </div>

        {/* Student Details Table */}
        <div className="student-details">
          <h3>Student Details</h3>
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
                  <td>{index + 1}</td>
                  <td>
                    <input type="text" value={student.branch} onChange={(e) => handleStudentDetailsChange(index, "branch", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" value={student.yearOfStudy} onChange={(e) => handleStudentDetailsChange(index, "yearOfStudy", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" value={student.studentName} onChange={(e) => handleStudentDetailsChange(index, "studentName", e.target.value)} />
                  </td>
                  <td>
                    <input type="text" value={student.rollNumber} onChange={(e) => handleStudentDetailsChange(index, "rollNumber", e.target.value)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Upload Multiple PDFs */}
        <div className="form-field">
          <label>Upload Supporting Documents (PDF):</label>
          <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".pdf" multiple />
        </div>

        {/* Display Selected Files */}
        <ul className="file-list">
          {pdfFiles.map((file, index) => (
            <li key={index}>
              {file.name} <button type="button" onClick={() => removeFile(index)}>❌ Remove</button>
            </li>
          ))}
        </ul>

        {/* Submit Button */}
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  );
};

export default UG1Form;
