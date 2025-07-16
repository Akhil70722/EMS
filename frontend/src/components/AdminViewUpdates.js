
import React, { useEffect, useState } from 'react';
import api from '../api/axiosConfig';
import '../styles/AdminViewUpdates.css';

const AdminViewUpdates = () => {
  const [updates, setUpdates] = useState([]);
  const [filters, setFilters] = useState({ date: '', employee: '', project: '' });
  const [threadInputs, setThreadInputs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(user);
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchUpdates();
    }
  }, [filters, currentUser]);

  const fetchUpdates = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.get('/project-updates/', { params: filters });
      setUpdates(res.data);
    } catch (err) {
      console.error('❌ Error fetching updates:', err);
      setError('Failed to load updates. Please try again later.');
    }
    setLoading(false);
  };

  const handleCommentSubmit = async (projectName) => {
    const text = threadInputs[projectName]?.trim();
    if (!text) return;
    const latestUpdate = updates.filter((u) => u.project_name === projectName).slice(-1)[0];
    if (!latestUpdate || !currentUser?.id) return;

    const payload = {
      update: latestUpdate.id,
      comment: text,
      sender: currentUser.id
    };

    try {
      const response = await api.post('/project-comments/', payload);
      setUpdates((prev) =>
        prev.map((u) =>
          u.project_name === projectName
            ? { ...u, comments: [...(u.comments || []), response.data] }
            : u
        )
      );
      setThreadInputs((prev) => ({ ...prev, [projectName]: '' }));
    } catch (err) {
      console.error('❌ Error submitting comment:', err);
      alert('Failed to post comment. Please try again.');
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const groupedUpdates = updates.reduce((acc, update) => {
    const project = update.project_name;
    if (!acc[project]) acc[project] = [];
    acc[project].push(update);
    return acc;
  }, {});

  return (
    <div className="admin-chat-container">
      <div className="admin-chat-header">📊 Daily Project Updates</div>
      <div className="admin-chat-filters">
        <input type="date" name="date" value={filters.date} onChange={handleFilterChange} />
        <input type="text" name="employee" placeholder="Employee Name" value={filters.employee} onChange={handleFilterChange} />
        <input type="text" name="project" placeholder="Project Name" value={filters.project} onChange={handleFilterChange} />
      </div>

      {loading ? (
        <p className="loading">⏳ Loading updates...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : Object.keys(groupedUpdates).length === 0 ? (
        <p className="no-updates">⚠️ No updates found for the selected filters.</p>
      ) : (
        Object.entries(groupedUpdates).map(([projectName, updates]) => (
          <div key={projectName} className="chat-project-card">
            <div className="project-title">💬 {projectName}</div>
            <div className="chat-thread">
              {updates.map((update) => (
                <React.Fragment key={update.id}>
                  <div className="chat-message left">
                    <div><strong>{update.employee_name}:</strong> {update.update_text}</div>
                    <div className="chat-meta">📅 {update.date}</div>
                  </div>
                  {(update.comments || []).map((comment, idx) => (
                    <div key={idx} className="chat-message right">
                      <div><strong>{comment.sender_name}:</strong> {comment.comment}</div>
                      <div className="chat-meta">🕒 {comment.timestamp?.split('T').join(' ').slice(0, 16)}</div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div className="reply-input-container">
              <textarea
                placeholder="Reply..."
                value={threadInputs[projectName] || ''}
                onChange={(e) => setThreadInputs({ ...threadInputs, [projectName]: e.target.value })}
              />
              <button onClick={() => handleCommentSubmit(projectName)}>Send</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminViewUpdates;
