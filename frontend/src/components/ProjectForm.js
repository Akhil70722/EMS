// src/components/ProjectForm.js
import React, { useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/ProjectForm.css'; // Optional: style it separately

const ProjectForm = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.description || !form.start_date) {
      alert('⚠️ All fields except end date are required.');
      return;
    }

    try {
      await api.post('/projects/', form);
      alert('✅ Project created successfully!');
      setForm({
        name: '',
        description: '',
        start_date: '',
        end_date: '',
      });
    } catch (err) {
      alert('❌ Failed to create project');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>Create New Project</h2>
      <form onSubmit={handleSubmit} className="project-form">
        <div className="form-group">
          <label>Project Name *</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            rows={5}
            placeholder="Enter detailed project description"
            required
          />
        </div>

        <div className="form-group">
          <label>Start Date *</label>
          <input
            type="date"
            name="start_date"
            value={form.start_date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>End Date</label>
          <input
            type="date"
            name="end_date"
            value={form.end_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Create Project</button>
      </form>
    </div>
  );
};

export default ProjectForm;
