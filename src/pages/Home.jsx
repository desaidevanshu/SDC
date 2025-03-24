import React, { useState } from "react";
import "../style.css";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; 
import UG_1 from "../components/FormComponent/UG_1";
const forms = [
  { id: "UG_1",component:UG_1, category: "UG1 In-House Student project", title: "Under Graduate Form 1" },
  { id: "UG_2", category: "UG2 In-House Interdisciplinary projects", title: "Under Graduate Form 2" },
  { id: "UG_3_A", category: "UG3 Participation in Project Competition", title: "Under Graduate Form 3A" },
  { id: "UG_3_B", category: "UG3 Participation in Reputed Conference", title: "Under Graduate Form 3B" },
  { id: "PG_1", category: "Professional Development Through Workshops/STTPs", title: "Post Graduate Form 1" },
  { id: "PG_2_A", category: "PG2 Participation in Project Competition", title: "Post Graduate Form 2A" },
  { id: "PG_2_B", category: "PG2 Participation in Reputed Conference", title: "Post Graduate Form 2B" },
  { id: "R1", category: "Publication in Reputed Journals/Papers", title: "Research Form 1" }
];

const Home = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <div className="home-container">
      <Navbar /> 
      <div className="container">
        <Sidebar setSelectedForm={setSelectedForm} />
        <main className="content">
          {selectedForm ? (
            <>
            <selectedForm.component setSelectedForm={setSelectedForm} />
          </>
          ) : (
            <div className="application-forms">
              <h1>Application Forms</h1>
              <div className="form-grid">
                {forms.map((form) => (
                  <div key={form.id} className="form-card" onClick={() => setSelectedForm(form)}>
                    <h3>{form.id}</h3>
                    <p>Category: {form.category}</p>
                    <button className="fill-form-btn">Fill Form</button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;
