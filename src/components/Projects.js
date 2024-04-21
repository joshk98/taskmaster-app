import React, { useState } from 'react';
import '../styles/projects.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faAnglesUp, faAnglesDown, faTrash, faFilter } from '@fortawesome/free-solid-svg-icons';

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
    due: '01/01/2024',
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
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [showFilterOptions, setShowFilterOptions] = useState(false);

  const [projects, setProjects] = useState(() => {
    return mappedProjectsData.map((project) => ({
      ...project,
      id: project.id,
      showTasks: false,
      status: calculateProjectStatus(project),
    }));
  });

  const filteredProjects = projects.filter((project) => {
    const nameMatch = project.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    const statusMatch = filter ? project.status === filter : true;
    return nameMatch && statusMatch;
  });

  const sortedProjects = sortBy
    ? [...filteredProjects].sort((a, b) => {
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        } else if (sortBy === 'date') {
          return new Date(a.due) - new Date(b.due);
        }
        return 0;
      })
    : filteredProjects;

  const toggleTasksVisibility = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, showTasks: !project.showTasks } : project
      )
    );
  };

  const handleFilter = (status) => {
    setFilter(status === filter ? '' : status);
  };

  const handleSortBy = (criteria) => {
    setSortBy(criteria);
  };

  const handleShowAll = () => {
    setFilter('');
    setSortBy('');
  };

  const toggleFilterOptions = () => {
    setShowFilterOptions(!showFilterOptions)
  };

  return (
    <div className='projects-container'>
      <div className='projects-container-search-c1'>
        <div className='search-filter'>
          <div className='projects-container-search-c2'>
            <FontAwesomeIcon icon={faSearch} className='search-icon' />
            <input
              type='text'
              placeholder='Search by name'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <FontAwesomeIcon icon={faFilter} className='filter-icon' onClick={toggleFilterOptions} />
        </div>
        {showFilterOptions && (
          <div className='filter-options'>
            <button
              className={filter === 'Late' ? 'active' : ''}
              onClick={() => handleFilter('Late')}
            >
              Late
            </button>
            <button
              className={filter === 'Complete' ? 'active' : ''}
              onClick={() => handleFilter('Complete')}
            >
              Complete
            </button>
            <button
              className={filter === 'In Progress' ? 'active' : ''}
              onClick={() => handleFilter('In Progress')}
            >
              In Progress
            </button>
            <button
              className={sortBy === 'name' ? 'active' : ''}
              onClick={() => handleSortBy('name')}
            >
              Sort by Name
            </button>
            <button
              className={sortBy === 'date' ? 'active' : ''}
              onClick={() => handleSortBy('date')}
            >
              Sort by Date
            </button>
            <button id='show-all' onClick={handleShowAll}>Show All</button>
          </div>
        )}
      </div>
      <div className='projects-container-cards-group'>
        {sortedProjects.map((project) => (
          <div key={project.id} className='projects-container-card-c1'>
            <div className='projects-container-card-c2'>
              <h1>{project.name}</h1>
            </div>
            <div className={`projects-container-card-c3 ${!project.showTasks && 'hidden'}`}>
              {project.showTasks && (
                <ul>
                  {project.tasks.map((task, index) => (
                    <li key={index}>
                      <div className="task-description" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                        {task.description}
                      </div>
                      <div className='checkbox'>
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
                                  status: calculateProjectStatus({ ...p, tasks: updatedTasks }),
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
              <h2 className='projects-container-card-c4-due' style={{ color: project.status === 'Complete' ? 'green' : project.status === 'Late' ? 'red' : 'inherit' }}>
                {project.status === 'Complete' ? 'Complete!' : project.status === 'Late' ? `Due: ${project.due} - LATE!` : `Due: ${project.due}`}
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
