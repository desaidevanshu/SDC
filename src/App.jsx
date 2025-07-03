import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Fachome from "./pages/Fachome";
import UG_1 from "./components/FormComponent/UG_1";
import UG_2 from "./components/FormComponent/UG_2";
import UG_3_A from "./components/FormComponent/UG_3_A";
import UG_3_B from "./components/FormComponent/UG_3_B";
import PG_1 from "./components/FormComponent/PG_1";
import PG_2_A from "./components/FormComponent/PG_2_A";
import PG_2_B from "./components/FormComponent/PG_2_B";
import R1 from "./components/FormComponent/R1";
import Policy from "./pages/Policy";
import FAQ from "./pages/FAQ"
import Contact from "./pages/Contact";
import PendingApplications from "./pages/PendingApplications";
import FacPendingApplications from "./pages/facPendingApplications";
import ApplicationDetails from "./pages/ApplicationDetails";
import FacRejectedApplications from "./pages/facRejectedApplication";
import FacAcceptedApplications from "./pages/facApproveApplication";
import AcceptedApplications from "./pages/AcceptedApplications";
import RejectedApplications from "./pages/RejectedApplications";
import HodDashboard from "./pages/Hod";
import DeptCoordDashboard from "./pages/DepartmentCoordinator";
import PrincipalDash from "./pages/Principal";
import InstCoordDash from "./pages/InstituteCoordinator";
import AdminDashboard from "./pages/Admin";
import AddUser from "./pages/AddUser";

import "./style.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fachome" element={<Fachome />} />
        <Route path="/home/ug1" element={<UG_1 />} />
        <Route path="/home/ug2" element={<UG_2 />} />
        <Route path="/home/ug3a" element={<UG_3_A />} />
        <Route path="/home/ug3b" element={<UG_3_B />} />
        <Route path="/home/pg1" element={<PG_1 />} />
        <Route path="/home/pg2a" element={<PG_2_A />} />
        <Route path="/home/pg2b" element={<PG_2_B />} />
        <Route path="/home/r1" element={<R1 />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pending" element={<PendingApplications />} />
        <Route path="/application/:id" element={<ApplicationDetails />} />
        <Route path="/facPending" element={<FacPendingApplications />} />
        <Route path="/facRejected" element={<FacRejectedApplications />} />
        <Route path="/facaccepted" element={<FacAcceptedApplications />} />
        <Route path="/accepted" element={<AcceptedApplications />} />
        <Route path="/rejected" element={<RejectedApplications />} />
        <Route path="/hodHome" element={<HodDashboard />} />
        <Route path="/deptcoordHome" element={<DeptCoordDashboard />} />
        <Route path="/principalHome" element={<PrincipalDash />} />
        <Route path="/insticoordHome" element={<InstCoordDash />} />
        <Route path="/AdHome" element={<AdminDashboard />} />
        <Route path="/adduser" element={<AddUser />} />
        </Routes>
    </Router>
  );
};

export default App;
