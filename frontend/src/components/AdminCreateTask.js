// AdminCreateTask.js
import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';

export default function AdminCreateTask() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [designation, setDesignation] = useState('Python developer');
  const [projectId, setProjectId] = useState('');

  useEffect(() => {
    api.get('/projects/').then(res => setProjects(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/tasks/', {
      title,
      description: desc,
      designation,
      project: projectId
    });
    alert('Task Created');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
      <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} maxLength="300" required />
      <select value={designation} onChange={e => setDesignation(e.target.value)}>
        <option>Python developer</option>
        <option>Data Scientist</option>
        <option>Sr Data Scientist</option>
        <option>Full Stack Developer</option>
        <option>Team Lead</option>
      </select>
      <select value={projectId} onChange={e => setProjectId(e.target.value)}>
        {projects.map(proj => <option key={proj.id} value={proj.id}>{proj.name}</option>)}
      </select>
      <button type="submit">Create Task</button>
    </form>
  );
}