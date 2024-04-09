import React, { useState } from "react";
import "../styles/projects.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const projectsData = [
  {
    name: "Gourmet Guide",
  },
  {
    name: "Surreal Estate",
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
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="projects-container-cards-group">
        {filteredProjects.map((project) => (
          <div key={project.id} className="projects-container-card">
              {project.name} 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
