import React, { useState, useEffect } from "react";
import "../components/styles/AddUser.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Validator");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];
    setUsers(storedUsers);
  }, []);

  const saveUsers = (newUsers) => {
    localStorage.setItem("userList", JSON.stringify(newUsers));
    setUsers(newUsers);
  };

  const handleAddUser = () => {
    if (!email.endsWith("@somaiya.edu")) {
      setError("Only somaiya.edu emails allowed");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    const newUser = { email, password, role };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setEmail("");
    setPassword("");
    setRole("Validator");
    setError("");
  };

  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const updated = users.filter((_, i) => i !== index);
      saveUsers(updated);
    }
  };

  const handleEdit = (index) => {
    const newEmail = prompt("Enter new email", users[index].email);
    if (newEmail && !newEmail.endsWith("@somaiya.edu")) {
      alert("Only somaiya.edu emails allowed");
      return;
    }
    
    const newPassword = prompt("Enter new password", users[index].password);
    if (newPassword && newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }
    
    const newRole = prompt("Enter new role", users[index].role);
    
    if (newEmail && newPassword && newRole) {
      const updated = [...users];
      updated[index] = { 
        email: newEmail, 
        password: newPassword, 
        role: newRole 
      };
      saveUsers(updated);
    }
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="add-user-container">
          <div className="add-user-card">
            <h2 className="add-user-title">Add New User</h2>
            
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="user@somaiya.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Role</label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className="form-select"
              >
                <option value="Validator">Validator</option>
                <option value="Department Coordinator">Department Coordinator</option>
                <option value="Institute Coordinator">Institute Coordinator</option>
                <option value="HOD">HOD</option>
                <option value="Principal">Principal</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            
            <button 
              className="submit-button"
              onClick={handleAddUser}
            >
              Add User
            </button>
          </div>

          <div className="users-table-container">
            <h3 className="users-title">Current Users</h3>
            {users.length > 0 ? (
              <div className="table-wrapper">
                <table className="users-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Password</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u, i) => (
                      <tr key={i}>
                        <td className="email-cell">{u.email}</td>
                        <td className="password-cell">{"•".repeat(u.password.length)}</td>
                        <td>
                          <span className={`role-badge ${u.role.toLowerCase().replace(/\s+/g, '-')}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="actions-cell">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleEdit(i)}
                          >
                            Edit
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDelete(i)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-users">No users added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;