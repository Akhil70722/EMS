import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/ProjectList.css'; // <-- Make sure path is correct

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get('/projects/');
      setProjects(res.data);
    };
    fetch();
  }, []);

  return (
    <div className="project-list-container">
      <h2>📃 All Projects</h2>
      {projects.length === 0 ? (
        <p className="project-empty">No projects found.</p>
      ) : (
        <div className="project-grid">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <h3>{p.name}</h3>
              <p><strong>Description:</strong> {p.description}</p>
              <p><strong>Start:</strong> {p.start_date}</p>
              <p><strong>End:</strong> {p.end_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectList;
