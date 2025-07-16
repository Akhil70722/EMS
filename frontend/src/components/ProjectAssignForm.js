import React, { useState, useEffect } from 'react';
import api from '../api/axiosConfig';
import '../styles/ProjectAssignForm.css';

const TaskForm = () => {
  const [projects, setProjects] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({
    project: '',
    description: '',
    employee: '',
    due_date: '',
  });

  // Fetch projects and employees on mount
  useEffect(() => {
    api.get('/projects/')
      .then(res => setProjects(res.data))
      .catch(() => alert('❌ Failed to load projects.'));

    api.get('/employees/')
      .then(res => setEmployees(res.data))
      .catch(() => alert('❌ Failed to load employees.'));
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Validation (no more title field)
    if (!form.project || !form.description || !form.employee) {
      alert('⚠️ Please fill all required fields.');
      return;
    }

    const projectId = parseInt(form.project);
    const employeeId = parseInt(form.employee);

    if (isNaN(projectId)) {
      alert("❌ Invalid Project selected.");
      return;
    }

    if (isNaN(employeeId)) {
      alert("❌ Invalid Employee selected.");
      return;
    }

    const payload = {
      project: projectId,
      description: form.description.trim(),
      employee: employeeId,
      due_date: form.due_date || null,
    };

    console.log("🔼 Sending payload:", payload);

    try {
      const response = await api.post('/tasks/', payload);
      alert('✅ Project Assigned Successfully');
      console.log("✅ Server response:", response.data);
      setForm({
        description: '',
        project: '',
        employee: '',
        due_date: '',
      });
    } catch (err) {
      console.error("❌ Error:", err);
      console.log("🔎 Server response:", err.response?.data);
      alert(
        '❌ ' +
        (err.response?.data?.detail ||
          JSON.stringify(err.response?.data) ||
          'Error assigning project.')
      );
    }
  };

  return (
    <div className="task-form-container">
      <h2 className="form-title">📁 Assign Project</h2>
      <form onSubmit={handleSubmit} className="task-form">

        {/* Project Dropdown */}
        <div className="form-group">
          <label htmlFor="project">Project</label>
          <select
            id="project"
            name="project"
            value={form.project}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Project --</option>
            {projects.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Project Description */}
        <div className="form-group">
          <label htmlFor="description">Project Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={500}
            placeholder="Enter project description (max 500 characters)"
            required
          />
        </div>

        {/* Employee Dropdown */}
        <div className="form-group">
          <label htmlFor="employee">Assign to Employee</label>
          <select
            id="employee"
            name="employee"
            value={form.employee}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Employee --</option>
            {employees.map(emp => (
              <option key={emp.id} value={emp.id}>
                {emp.name} ({emp.user?.email})
              </option>
            ))}
          </select>
        </div>

        {/* Due Date */}
        <div className="form-group">
          <label htmlFor="due_date">Due Date</label>
          <input
            type="date"
            id="due_date"
            name="due_date"
            value={form.due_date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Assign Project</button>
      </form>
    </div>
  );
};

export default TaskForm;
