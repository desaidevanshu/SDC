import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./login.css";
import logo from "../assets/somaiya-logo.png";
import logo1 from "../assets/trust.png";

const GOOGLE_CLIENT_ID = "653938123906-1qpf6dbs0u51auibm3lrmu3sg7a0gamh.apps.googleusercontent.com";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Hardcoded users for demo purposes
  const hardcodedUsers = {
    // Students
    "devanshu.d@somaiya.edu": { password: "Devanshu123", role: "Student" },
    "sohamgore@somaiya.edu": { password: "12345678", role: "Student" },
    // Admin
    "sdc-kjsce@somaiya.edu": { password: "admin123", role: "Admin" },
    "devanshu.dee@somaiya.edu": { password: "admin123", role: "Admin" },
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // Check hardcoded users first
    if (hardcodedUsers[email] && hardcodedUsers[email].password === password) {
      const user = hardcodedUsers[email];
      completeLogin(email, user.role);
      return;
    }

    // Check stored users
    const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];
    const foundUser = storedUsers.find(u => u.email === email && u.password === password);

    if (foundUser) {
      completeLogin(email, foundUser.role);
    } else {
      setError("Invalid credentials!");
      alert("Invalid credentials!");
    }
  };

  const completeLogin = (email, role) => {
    localStorage.setItem("svvNetId", email);
    localStorage.setItem("user", JSON.stringify({ svvNetId: email, role }));

    // Navigate based on role
    switch (role) {
      case "Admin": navigate("/AdHome"); break;
      case "Validator": navigate("/facHome"); break;
      case "Department Coordinator": navigate("/deptcoordHome"); break;
      case "Institute Coordinator": navigate("/insticoordHome"); break;
      case "HOD": navigate("/hodHome"); break;
      case "Principal": navigate("/principalHome"); break;
      case "Student": navigate("/home"); break;
      default: navigate("/home");
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    setError("");

    try {
      if (!credentialResponse.credential) {
        setError("Google login failed: No credential received.");
        alert("Google login failed: No credential received.");
        return;
      }

      const decoded = jwtDecode(credentialResponse.credential);

      if (!decoded.email || !decoded.email.endsWith("@somaiya.edu")) {
        setError("Access denied: Only somaiya.edu emails are allowed.");
        alert("Access denied: Only somaiya.edu emails are allowed.");
        return;
      }

      // Check if user exists in hardcoded or stored users
      let userRole = "Student"; // Default role

      if (hardcodedUsers[decoded.email]) {
        userRole = hardcodedUsers[decoded.email].role;
      } else {
        const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];
        const matchedUser = storedUsers.find((u) => u.email === decoded.email);
        if (matchedUser && matchedUser.role) {
          userRole = matchedUser.role;
        }
      }

      // Special cases for admin
      if (decoded.email === "sdc-kjsce@somaiya.edu" || decoded.email === "devanshu.d@somaiya.edu") {
        userRole = "Admin";
      }

      completeLogin(decoded.email, userRole);
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed: Invalid token.");
      alert("Google login failed: Invalid token.");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-page">
        <div className="navbar">
          <img src={logo} alt="Somaiya Logo" className="navbar-logo" />
          <h1 className="navbar-title">Welcome to Student Development Cell</h1>
          <img src={logo1} alt="Somaiya Trust Logo" className="navbar-logo1" />
        </div>

        <div className="login-container">
          <div className="login-box">
            <h1 className="login-title">
              <span className="highlight">Student</span>
              <span className="highlight">Development Cell</span>
            </h1>
            <p className="description">
              The Student Development Policy at K. J. Somaiya School of Engineering reflects our
              commitment to fostering a dynamic and enriching academic environment for students across all levels of study.
            </p>

            <h2 className="login-question">Login to your account</h2>

            <form onSubmit={handleLogin} className="login-form">
              <label>Email *</label>
              <input
                type="email"
                className="login-input"
                placeholder="Enter your somaiya.edu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label>Password *</label>
              <input
                type="password"
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              {error && <p className="error-message">{error}</p>}

              <button type="submit" className="login-button">Login</button>
            </form>

            <div className="or">
              <span className="or-text">OR</span>
            </div>

            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              width="100%"
              text="signin_with"
              shape="pill"
              logo_alignment="left"
              useOneTap
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;