import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import "./login.css";
import logo from "../assets/somaiya-logo.png";
import logo1 from "../assets/trust.png";
import googleIcon from "../assets/google-logo.jpg";

const GOOGLE_CLIENT_ID = "653938123906-1qpf6dbs0u51auibm3lrmu3sg7a0gamh.apps.googleusercontent.com";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentError, setStudentError] = useState("");
  const [validatorError, setValidatorError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStudentError("");

    const hardcodedUsers = {
      "devanshu.d": "Devanshu123",
      "sohamgore": "12345678",
    };

    if (hardcodedUsers[username] === password) {
      localStorage.setItem("svvNetId", username);
      localStorage.setItem("user", JSON.stringify({ svvNetId: username, role: "Student" }));
      navigate("/home");
    } else {
      setStudentError("Invalid credentials!");
      alert("Invalid credentials!");
    }
  };

  
  const VALIDATOR_EMAILS=[
    "devanshu.d@somaiya.edu",
    "smitasankhe@somaiya.edu",
    "vaibhav.vasani@somaiya.edu",
    "swapnil.cp@somaiya.edu",
  ];
  // Handles Google OAuth for both Student and Validator
  const handleGoogleSuccess = (credentialResponse, role = "Student") => {
    const setError = role === "Validator" ? setValidatorError : setStudentError;
    setError("");
    try {
      if (!credentialResponse.credential) {
        setError("Google login failed: No credential received.");
        alert("Google login failed: No credential received.");
        return;
      }
      let decoded;
      try {
        decoded = jwtDecode(credentialResponse.credential);
        console.log("Decoded Google JWT:", decoded);
      } catch (decodeErr) {
        setError("Google login failed: Unable to decode token.");
        alert("Google login failed: Unable to decode token.");
        console.error("JWT decode error:", decodeErr);
        return;
      }

      if (!decoded.email) {
        setError("Google login failed: Email not found in token.");
        alert("Google login failed: Email not found in token.");
        console.error("Decoded JWT missing email:", decoded);
        return;
      }

      if (!decoded.email.endsWith("@somaiya.edu")) {
        setError("Access denied: Only somaiya.edu emails are allowed.");
        alert("Access denied: Only somaiya.edu emails are allowed.");
        return;
      }

      let userRole = role;
      if(decoded.email=="sdc-kjsce@somaiya.edu"){
        userRole = "Admin";
      }
      else if ( role === "Validator" ) {
        if (!VALIDATOR_EMAILS.includes(decoded.email)) {
          setError("Access denied: You are not authorized as a Validator.");
          alert("Access denied: You are not authorized as a Validator.");
          return;
        }
        userRole = "Validator";
      }

      localStorage.setItem("svvNetId", decoded.email);
      localStorage.setItem("user", JSON.stringify({ svvNetId: decoded.email, role: userRole }));

      // Redirect based on role
      if (userRole === "Admin") {
        navigate("/facHome");
      }
     else  if (userRole === "Validator") {
        navigate("/facHome");
      } else {
        navigate("/home");
      }
    } catch (err) {
      console.error("Google login error:", err);
      setError("Google login failed: Invalid token.");
      alert("Google login failed: Invalid token.");
    }
  };

  const handleGoogleError = (role = "UG (AI&DS)") => {
    const setError = role === "Validator" ? setValidatorError : setStudentError;
    setError("Google login failed. Please try again.");
    alert("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="login-page">
        {/* Navbar */}
        <div className="navbar">
          <img src={logo} alt="Somaiya Logo" className="navbar-logo" />
          <h1 className="navbar-title">Welcome to Student Development Cell</h1>
          <img src={logo1} alt="Somaiya Trust Logo" className="navbar-logo1" />
        </div>

        {/* Login Container */}
        <div className="login-container">
          {/* Validator Box */}
          <div className="validator-box">
            <h1 className="validator-title">
              <span className="highlight">Student</span> <br />
              <span className="highlight">Development Cell</span>
            </h1>
            <p className="description">
              The Student Development Policy at K. J. Somaiya College of Engineering reflects our 
              commitment to fostering a dynamic and enriching academic environment for students across all levels of study.
            </p>
            <h2 className="validator-question">Validator ?</h2>
            <p className="validator-login-text">Login to go on Dashboard</p>
            {validatorError && <p className="error-message">{validatorError}</p>}
            <GoogleLogin
              onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse, "Validator")}
              onError={() => handleGoogleError("Validator")}
              width="100%"
              text="signin_with"
              shape="pill"
              logo_alignment="left"
              useOneTap
            />
          </div>

          {/* Student Login Box */}
          <div className="student-login-box">
            <h2 className="form-title">Please enter your SVV Net ID & password to Login.</h2>
            <form className="login-form" onSubmit={handleLogin}>
              <label>SVV Net ID *</label>
              <input
                type="text"
                placeholder="Enter your SVV Net ID"
                className="login-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="login-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>

              {studentError && <p className="error-message">{studentError}</p>}

              <button type="submit" className="login-button">Login</button>
            </form>
            <h1 className="or">OR</h1>
            <GoogleLogin
              onSuccess={(credentialResponse) => handleGoogleSuccess(credentialResponse, "Student")}
              onError={() => handleGoogleError("Student")}
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