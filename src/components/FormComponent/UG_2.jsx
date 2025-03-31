import React, { useState } from "react";
import "../styles/UG2.css";

const UG2Form = () => {
  const [groupLeaderSignature, setGroupLeaderSignature] = useState(null);
  const [guideSignature, setGuideSignature] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [students, setStudents] = useState([
    { srNo: "", name: "", class: "", div: "", branch: "", rollNo: "", mobileNo: "" }
  ]);
  const [expenses, setExpenses] = useState([
    { category: "", amount: "", details: "" }
  ]);

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

  // Add a new student row
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

  // Add a new expense row
  const addExpenseRow = () => {
    setExpenses([...expenses, { category: "", amount: "", details: "" }]);
  };

  // Remove an expense row
  const removeExpenseRow = (index) => {
    if (expenses.length > 1) {
      const updatedExpenses = expenses.filter((_, i) => i !== index);
      setExpenses(updatedExpenses);
    }
  };

  return (
    <div className="form-container">
      <h2>Under Graduate Form 2</h2>
      <p className="form-category">Interdisciplinary Projects (FY to LY Students)</p>

      <label>Title of Proposed Project:</label>
      <input type="text" />

      <label>Brief Description of Proposed Work:</label>
      <textarea placeholder="Attach a separate sheet if required" />

      <label>Utility:</label>
      <input type="text" />

      <label>Whether received finance from any other agency:</label>
      <div className="checkbox-group">
        <input type="checkbox" id="yes" />
        <label htmlFor="yes">Yes</label>
        <input type="checkbox" id="no" />
        <label htmlFor="no">No</label>
      </div>

      <label>Details if Yes:</label>
      <textarea />

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
            <th>Name of Student</th>
            <th>Class</th>
            <th>Div</th>
            <th>Branch</th>
            <th>Roll No.</th>
            <th>Mobile No.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td><input type="text" value={student.srNo} /></td>
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

      <table className="budget-table">
        <thead>
          <tr>
            <th>Expense Category</th>
            <th>Amount</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td><input type="text" value={expense.category} /></td>
              <td><input type="number" value={expense.amount} /></td>
              <td><textarea value={expense.details} /></td>
              <td><button type="button" className="remove-btn" onClick={() => removeExpenseRow(index)}>❌</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" className="add-btn" onClick={addExpenseRow}>➕ Add More Expense</button>

      <label>Total Budget (Including Contingency Amount):</label>
      <input type="text" />

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

      <label>Upload Additional Documents (PDF Only, Max 5MB)</label>
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

export default UG2Form;
