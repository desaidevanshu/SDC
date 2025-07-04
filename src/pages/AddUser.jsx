import React, { useState, useEffect } from "react";
import "../components/styles/AddUser.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const AddUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Validator");
  const [users, setUsers] = useState([]);

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
      alert("Only somaiya.edu emails allowed");
      return;
    }

    const newUser = { email, password, role };
    const updatedUsers = [...users, newUser];
    saveUsers(updatedUsers);
    setEmail("");
    setPassword("");
    setRole("Student");
    alert("User added successfully!");
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    saveUsers(updated);
  };

  const handleEdit = (index) => {
    const newEmail = prompt("Enter new email", users[index].email);
    const newPassword = prompt("Enter new password", users[index].password);
    const newRole = prompt("Enter new role", users[index].role);
    if (newEmail && newPassword && newRole) {
      const updated = [...users];
      updated[index] = { email: newEmail, password: newPassword, role: newRole };
      saveUsers(updated);
    }
  };

  return (
    <div className="layout-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="add-user-page" style={{ paddingTop: "5rem" }}>
          <h2>Add New User</h2>
          <div className="add-user-form">
            <input
              type="email"
              placeholder="Enter somaiya email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              
              <option>Validator</option>
              <option>Department Coordinator</option>
              <option>Institute Coordinator</option>
              <option>HOD</option>
              <option>Principal</option>
              <option>Admin</option>
            </select>
            <button onClick={handleAddUser}>Add User</button>
          </div>

          <h3>Current Users</h3>
          <table>
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
                  <td>{u.email}</td>
                  <td>{u.password}</td>
                  <td>{u.role}</td>
                  <td>
                    <button onClick={() => handleEdit(i)}>Edit</button>
                    <button onClick={() => handleDelete(i)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
