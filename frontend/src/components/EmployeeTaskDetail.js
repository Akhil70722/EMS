import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosConfig';
import '../styles/EmployeeTaskDetail.css';

export default function EmployeeTaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}/`)
      .then(res => setTask(res.data))
      .catch(err => {
        console.error("❌ Failed to fetch task", err);
        alert("Could not load task details.");
      });
  }, [id]);

  if (!task) return <p className="loading-msg">Loading task...</p>;

  return (
    <div className="task-detail-container">
      <h1 className="page-header">📋 Project Details</h1>

      {task.project_name && (
        <div className="task-section">
          <h3 className="task-label">📁 Project</h3>
          <p className="task-value">{task.project_name}</p>
        </div>
      )}

      <div className="task-section">
        <h3 className="task-label">📄 Description</h3>
        <p className="task-value">{task.description}</p>
      </div>

      {task.due_date && (
        <div className="task-section">
          <h3 className="task-label">📅 Due Date</h3>
          <p className="task-value">{task.due_date}</p>
        </div>
      )}
    </div>
  );
}

