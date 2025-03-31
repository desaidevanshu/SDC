import React, { useState } from "react";
import "../styles/UG2.css";

const UG3AForm = () => {
  const [students, setStudents] = useState([
    { name: "", class: "", div: "", branch: "", rollNo: "", mobileNo: "" }
  ]);
  const [expenses, setExpenses] = useState([
    { srNo: "", description: "", amount: "" }
  ]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  // File Validation Function
  const handleFileUpload = (event, type) => {
    const file = event.target.files[0];

    if (!file) return;

    if (type === "image") {
      if (!file.type.startsWith("image/jpeg")) {
        setErrorMessage("Only JPEG format is allowed for images.");
        return;
      }
      setUploadedImage(file);
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

  // Add a new expense row
  const addExpenseRow = () => {
    setExpenses([...expenses, { srNo: "", description: "", amount: "" }]);
  };

  // Remove an expense row
  const removeExpenseRow = (index) => {
    if (expenses.length > 1) {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    }
  };

  const addStudentRow = () => {
    setStudents([...students, { srNo: "", name: "", class: "", div: "", branch: "", rollNo: "", mobileNo: "" }]);
  };

  // Remove a student row
  const removeStudentRow = (index) => {
    if (students.length > 1) {
      const updatedStudents = students.filter((_, i) => i !== index);
      setStudents(updatedStudents);
    }
  };


  return (
    <div className="form-container">
      <h2>Under Graduate Form 3A - Project Competition</h2>
      <label>Name and Address of Organizing Institute:</label>
      <input type="text" />
      
      <label>Title of Project:</label>
      <input type="text" />

      <h3>Student Details</h3>
      <table className="student-table">
        <thead>
          <tr>
            <th>Name of Student</th>
            <th>Class</th>
            <th>Div</th>
            <th>Branch</th>
            <th>Roll No.</th>
            <th>Mobile No.</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td><input type="text" value={student.name} /></td>
              <td><input type="text" value={student.class} /></td>
              <td><input type="text" value={student.div} /></td>
              <td><input type="text" value={student.branch} /></td>
              <td><input type="text" value={student.rollNo} /></td>
              <td><input type="text" value={student.mobileNo} /></td>
              <td><button type="button" className="remove-btn" onClick={() => removeStudentRow(index)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="add-btn" onClick={addStudentRow}>➕ Add More Student</button>

      <h3>Details of Expenses</h3>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Description of components / parts / heads of expenses</th>
            <th>Amount (Rs.)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td><input type="text" value={expense.srNo} /></td>
              <td><input type="text" value={expense.description} /></td>
              <td><input type="text" value={expense.amount} /></td>
              <td><button type="button" className="remove-btn" onClick={() => removeExpenseRow(index)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="add-btn" onClick={addExpenseRow}>➕ Add More Expense</button>

      <h3>Bank Details for RTGS/NEFT</h3>
      <label>Beneficiary name, brief address and mobile no.:</label>
      <input type="text" />
      
      <label>Bank Name:</label>
      <input type="text" />
      
      <label>Branch:</label>
      <input type="text" />
      
      <label>IFSC Code:</label>
      <input type="text" />
      
      <label>Account Number:</label>
      <input type="text" />
      
      <div className="file-upload-section">
        <label>Upload Image (JPEG Only):</label>
        <input type="file" accept="image/jpeg" onChange={(e) => handleFileUpload(e, "image")} />
        {uploadedImage && <p className="file-name">{uploadedImage.name}</p>}
      </div>
      
      <div className="file-upload-section">
        <label>Upload Additional Documents (PDF Only, Max 5MB):</label>
        <input type="file" accept="application/pdf" onChange={(e) => handleFileUpload(e, "document")} />
        {uploadedFile && <p className="file-name">{uploadedFile.name}</p>}
      </div>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      <div className="form-actions">
        <button className="back-btn">Back</button>
        <button className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default UG3AForm;
