import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UG_1 from "./components/FormComponent/UG_1";
import UG_2 from "./components/FormComponent/UG_2";
import UG_3_A from "./components/FormComponent/UG_3_A";
import Policy from "./pages/Policy";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import "./style.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/ug1" element={<UG_1 />} />
        <Route path="/home/ug2" element={<UG_2 />} />
        <Route path="/home/ug3a" element={<UG_3_A />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        </Routes>
    </Router>
  );
};

export default App;
