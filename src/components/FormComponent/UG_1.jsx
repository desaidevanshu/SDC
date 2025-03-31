import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/UG1.css";

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

  const [groupLeaderSignature, setGroupLeaderSignature] = useState(null);
  const [guideSignature, setGuideSignature] = useState(null);
  const [pdfFiles, setPdfFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [formId, setFormId] = useState(null);
  const fileInputRef = useRef(null);
  const svvNetIdRef = useRef("");

  useEffect(() => {
    const storedSvvNetId = localStorage.getItem("svvNetId");
    if (storedSvvNetId) {
      svvNetIdRef.current = storedSvvNetId;
    }
  }, []);

   // Handle radio buttons
   const handleRadioChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      finance: value,
    }));
  };
  
  // ✅ Handle text input change
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // ✅ Handle student details input change
  const handleStudentDetailsChange = (index, field, value) => {
    setFormData((prev) => {
      const updatedStudents = [...prev.studentDetails];
      updatedStudents[index] = { ...updatedStudents[index], [field]: value };
      return { ...prev, studentDetails: updatedStudents };
    });
  };

  // ✅ Handle File Upload (Signatures & PDFs)
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];

    if (!file) return;

    if (type === "signature") {
      if (!file.type.startsWith("image/jpeg")) {
        setErrorMessage("Only JPEG format is allowed for signatures.");
        return;
      }
      event.target.name === "groupLeaderSignature"
        ? setGroupLeaderSignature(file)
        : setGuideSignature(file);
    } else if (type === "document") {
      if (file.type !== "application/pdf") {
        setErrorMessage("Only PDF format is allowed for document upload.");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size must be less than 5MB.");
        return;
      }
      setPdfFiles((prev) => [...prev, file]);
    }
    setErrorMessage("");
  };

  // ✅ Remove a selected PDF file
  const removeFile = (index) => {
    setPdfFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // ✅ Save Form Data & Generate Form ID
  const handleSaveFormData = async () => {
    setErrorMessage("");

    if (!formData.projectTitle || !formData.projectUtility || !formData.projectDescription || !formData.guideName) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    try {
      const dataToSend = { ...formData, svvNetId: svvNetIdRef.current };
      const response = await axios.post("http://localhost:5000/api/ug1form/saveFormData", dataToSend);
      
      if (response.data.formId) {
        setFormId(response.data.formId);
        alert("Form data saved successfully!");

        if (pdfFiles.length > 0) {
          await handleUploadPDF(response.data.formId);
        }
      } else {
        setErrorMessage("Failed to get form ID. Try again.");
      }
    } catch (error) {
      console.error("Error saving form data:", error);
      setErrorMessage("Error saving form data. Try again.");
    }
  };

  // ✅ Upload Multiple PDFs
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

  // ✅ Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSaveFormData();
  };


  return (
    <div className="form-container">
      <h2>Under Graduate Form 1</h2>
      <p className="form-category">In-house Student Project within Department</p>

      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
      <label>Title of the Project:</label>
      <input type="text" value={formData.projectTitle} onChange={(e) => handleInputChange("projectTitle", e.target.value)} />    

      <label>Utility of the Project:</label>
      <input type="text" value={formData.projectUtility} onChange={(e) => handleInputChange("projectUtility", e.target.value)} />

      <label>Description:</label>
      <textarea value={formData.projectDescription} onChange={(e) => handleInputChange("projectDescription", e.target.value)} />

      <label>Whether received finance from any other agency:</label>
      <div className="form-group">
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

      <div className="guide-details">
        <div>
          <label>Name of the Guide/Co-Guide:</label>
          <input type="text" value={formData.guideName} onChange={(e) => handleInputChange("guideName", e.target.value)} />
        </div>
        <div>
          <label>Employee Code:</label>
          <input type="text" value={formData.employeeCode} onChange={(e) => handleInputChange("employeeCode", e.target.value)} />
        </div>
      </div>

      {/* Student Details Table */}
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
                <td><input type="text" value={student.branch} onChange={(e) => handleStudentDetailsChange(index, "branch", e.target.value)} /></td>
                <td><input type="text" value={student.yearOfStudy} onChange={(e) => handleStudentDetailsChange(index, "yearOfStudy", e.target.value)} /></td>
                <td><input type="text" value={student.studentName} onChange={(e) => handleStudentDetailsChange(index, "studentName", e.target.value)} /></td>
                <td><input type="text" value={student.rollNumber} onChange={(e) => handleStudentDetailsChange(index, "rollNumber", e.target.value)} /></td>
              </tr>
            ))}
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
      <div className="form-actions">
        <button className="back-btn">Back</button>
        <button className="submit-btn">Submit</button>
      </div>
      </form>
    </div>
  );
};

export default UG1Form;
