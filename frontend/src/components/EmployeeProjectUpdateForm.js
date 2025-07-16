
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/EmployeeProjectUpdateForm.css';

const EmployeeProjectUpdateForm = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Fetch the employee's assigned projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get('/my-projects/');
        setProjects(res.data);
      } catch (err) {
        console.error('❌ Error loading projects:', err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    if (!selectedProject || !updateText.trim()) {
      setError('Please select a project and write an update.');
      setSubmitting(false);
      return;
    }

    try {
      const payload = {
        project: selectedProject,
        update_text: updateText.trim(),
      };

      console.log('📤 Submitting project update:', payload);

      const res = await api.post('/project-updates/', payload);

      setMessage('✅ Update submitted successfully!');
      setUpdateText('');
      setSelectedProject('');
    } catch (err) {
      console.error('❌ Error submitting update:', err.response || err);
      setError('Failed to submit update. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="employee-project-update-form">
      <h2>📌 Submit Daily Project Update</h2>

      {loading ? (
        <p>⏳ Loading projects...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Project:</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              required
            >
              <option value="">-- Select Project --</option>
              {projects.map((proj) => (
                <option key={proj.id} value={proj.id}>
                  {proj.title || proj.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Update (max 500 characters):</label>
            <textarea
              rows="5"
              maxLength="500"
              value={updateText}
              onChange={(e) => setUpdateText(e.target.value)}
              placeholder="Write your daily update here..."
              required
            ></textarea>
          </div>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Update'}
          </button>

          {message && <p className="success">{message}</p>}
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default EmployeeProjectUpdateForm;
