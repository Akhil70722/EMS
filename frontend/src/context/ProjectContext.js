import { createContext, useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects/');
      setProjects(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch projects:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, setProjects, fetchProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};
