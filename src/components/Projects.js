import React, { useState } from "react";
import "../styles/projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";

const projectsData = [
  {
    name: "Gourmet Guide",
    status: "TASK DUE 19/05"
  },
  {
    name: "Surreal Estate",
    status: "TASK DUE TODAY"
  },
  {
    name: "Portfolio",
    status: "LATE"
  },
  {
    name: "Breakout Game",
    status: "COMPLETE"
  },
];

const mappedProjectsData = projectsData.map((project, index) => ({
  ...project,
  id: index + 1,
}));

function Projects() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProjects = mappedProjectsData
    .filter(({ name }) => {
      const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="projects-container">
      <div className="projects-container-search">
        <div className="projects-container-search-input">
          <FontAwesomeIcon icon={faSearch} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FontAwesomeIcon icon={faFilter} />
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div className="projects-container-cards-group">
        {filteredProjects.map((project) => (
          <div key={project.id} className="projects-container-card">
              {project.name} {project.status} <button>Show</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
