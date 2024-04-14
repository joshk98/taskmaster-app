import React, { useState } from 'react';
import '../styles/projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFilter, faPlus, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

const projectsData = [
  {
    name: 'Gourmet Guide',
    status: '',
    tasks: [
      { description: 'Set up Github repo', completed: false },
      { description: 'Code something', completed: false },
      { description: 'Deploy app', completed: false }
    ],
    due: '01/01/2024',
  },
];

const mappedProjectsData = projectsData.map((project, index) => ({
  ...project,
  id: index + 1,
  showTasks: false,
}));

const currentDate = new Date();

const updatedProjectsData = mappedProjectsData.map((project) => {
  let status = '';

  const dueDate = new Date(project.due);
  const allTasksCompleted = project.tasks.every((task) => task.completed);

  if (dueDate > currentDate && !allTasksCompleted) {
    status = 'In Progress';
  } else if (dueDate < currentDate && !allTasksCompleted) {
    status = 'Late';
  } else {
    status = 'Complete';
  }

  return {
    ...project,
    status: status,
  };
});

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(updatedProjectsData);

  const filteredProjects = projects
    .filter(({ name }) => {
      const nameMatch = name.toLowerCase().includes(searchTerm.toLowerCase());
      return nameMatch;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const toggleTasksVisibility = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, showTasks: !project.showTasks } : project
      )
    );
  };

  return (
    <div className='projects-container'>
      <div className='projects-container-search-c1'>
        <div className='projects-container-search-c2'>
          <FontAwesomeIcon icon={faSearch} className='search-icon' />
          <input
            type='text'
            placeholder='Search by name'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <FontAwesomeIcon icon={faFilter} />
        <FontAwesomeIcon icon={faPlus} />
      </div>
      <div className='projects-container-cards-group'>
        {filteredProjects.map((project) => (
          <div key={project.id} className='projects-container-card-c1'>
            <div className='projects-container-card-c2'>
              <h2>{project.name}</h2>
            </div>
            <div className={`projects-container-card-c3 ${!project.showTasks && 'hidden'}`}>
              {project.showTasks && (
                <ul>
                  {project.tasks.map((task, index) => (
                    <li key={index}>
                      {task.description}
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={(e) => {
                          const updatedProjects = projects.map((p) => {
                            if (p.id === project.id) {
                              const updatedTasks = [...p.tasks];
                              updatedTasks[index].completed = e.target.checked;
                              return {
                                ...p,
                                tasks: updatedTasks,
                              };
                            }
                            return p;
                          });
                          setProjects(updatedProjects);
                        }}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className='projects-container-card-c4'>
              <h3 className='projects-container-card-c4-due'>
                {project.status === 'Complete' ? 'Complete' : `Due: ${project.due}`}
              </h3>
              <button onClick={() => toggleTasksVisibility(project.id)}>
                {project.showTasks ? <FontAwesomeIcon icon={faAnglesLeft} /> : <FontAwesomeIcon icon={faAnglesRight} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
