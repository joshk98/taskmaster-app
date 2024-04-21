import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Overview from "./Overview";
import Projects from "./Projects";
import AddProject from "./AddProject";

import "../styles/app.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/add-project" element={<AddProject />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
