// EmployeeTaskPage.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

export default function EmployeeTaskPage() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [projectId, setProjectId] = useState('');
  const [taskId, setTaskId] = useState('');
  const [desc, setDesc] = useState('');
  const [attendance, setAttendance] = useState(false);

  useEffect(() => {
    api.get('/projects/').then(res => setProjects(res.data));
    api.get('/tasks/').then(res => setTasks(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/employeetasks/', {
      task: taskId,
      project: projectId,
      description: desc,
      marked_attendance: attendance
    });
    alert('Task Submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input type="checkbox" checked={attendance} onChange={e => setAttendance(e.target.checked)} /> Mark Attendance
      </label>
      <select value={projectId} onChange={e => setProjectId(e.target.value)}>
        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select value={taskId} onChange={e => setTaskId(e.target.value)}>
        {tasks.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
      </select>
      <textarea maxLength={500} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe your work..." required />
      <button type="submit">Submit Task</button>
    </form>
  );
}