import React, { useState } from 'react';
import '../styles/projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAnglesUp, faAnglesDown, faTrash } from '@fortawesome/free-solid-svg-icons';

const projectsData = [
  {
    name: 'Gourmet Guide',
    status: 'In Progress',
    tasks: [
      { description: 'Set up Github repo', completed: false },
      { description: 'Code something', completed: false },
      { description: 'Deploy app', completed: false },
      { description: 'Presentation', completed: false }
    ],
    due: '05/01/2024',
  },
  {
    name: 'Project X',
    status: 'In Progress',
    tasks: [
      { description: 'Research', completed: false },
      { description: 'Design prototype', completed: false },
      { description: 'Implement feature A', completed: false },
      { description: 'Test functionality', completed: false }
    ],
    due: '04/30/2024',
  },
  {
    name: 'Marketing Campaign',
    status: 'In Progress',
    tasks: [
      { description: 'Define target audience', completed: false },
      { description: 'Create marketing materials', completed: false },
      { description: 'Launch advertising campaign', completed: false },
      { description: 'Monitor campaign performance', completed: false }
    ],
    due: '05/15/2024',
  },  
];

const mappedProjectsData = projectsData.map((project, index) => ({
  ...project,
  id: index + 1,
  showTasks: false,
}));

function calculateProjectStatus(project) {
  const currentDate = new Date();
  const dueDate = new Date(project.due);
  const allTasksCompleted = project.tasks.every((task) => task.completed);

  if (allTasksCompleted) {
    return 'Complete';
  } else if (dueDate < currentDate) {
    return 'Late';
  } else {
    return 'In Progress';
  }
}

function Projects() {
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState(() => {
    return mappedProjectsData.map((project) => ({
      ...project,
      id: project.id,
      showTasks: false,
      status: calculateProjectStatus(project),
    }));
  });

  const filteredProjects = projects
    .filter(({ name }) => {
      const nameMatch = name.toLowerCase().startsWith(searchTerm.toLowerCase());
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
      </div>
      <div className='projects-container-cards-group'>
        {filteredProjects.map((project) => (
          <div key={project.id} className='projects-container-card-c1'>
            <div className='projects-container-card-c2'>
              <h1>{project.name}</h1>
            </div>
            <div className={`projects-container-card-c3 ${!project.showTasks && 'hidden'}`}>
              {project.showTasks && (
                <ul>
                  {project.tasks.map((task, index) => (
                    <li key={index}>
                      <div className="task-description">{task.description}</div>
                      <div className='checkbox'>
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            const updatedProjects = projects.map((p) => {
                              if (p.id === project.id) {
                                const updatedTasks = [...p.tasks];
                                updatedTasks[index].completed = e.target.checked;

                                let status = '';
                                const currentDate = new Date();
                                const dueDate = new Date(p.due);
                                const allTasksCompleted = updatedTasks.every((task) => task.completed);

                                if (allTasksCompleted) {
                                  status = 'Complete';
                                } else if (dueDate < currentDate) {
                                  status = 'Late';
                                } else {
                                  status = 'In Progress';
                                }

                                return {
                                  ...p,
                                  tasks: updatedTasks,
                                  status: status,
                                };
                              }
                              return p;
                            });
                            setProjects(updatedProjects);
                          }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className='projects-container-card-c4'>
              <h2 className='projects-container-card-c4-due'>
                {project.status === 'Complete' ? 'Complete!' : `Due: ${project.due}`}
              </h2>
              <div>
                <button><FontAwesomeIcon icon={faTrash} /></button>
                <button onClick={() => toggleTasksVisibility(project.id)}>
                  {project.showTasks ? <FontAwesomeIcon icon={faAnglesUp} /> : <FontAwesomeIcon icon={faAnglesDown} />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Projects;
